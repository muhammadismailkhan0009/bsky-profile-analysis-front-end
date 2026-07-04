"use client";

import { defineFlow } from "@myriadcodelabs/uiflow";
import { fetchFollowingsList } from "../../_server_actions/fetch_followings_list";
import {
  ALL_PROFILE_CATEGORY_STATS,
  type ProfileCategoryId,
  type ProfileCategoryStat,
} from "../../_server_actions/profile_categories";
import { ProfileAnalysisPageView } from "../components/profile_analysis_page_view";
import type {
  ProfileAnalysisDomainData,
  ProfileAnalysisInternalData,
  ProfileAnalysisPageOutput,
} from "../types";

function normalizeActor(actor: string) {
  return actor.trim().replace(/^@/, "");
}

function createRequestId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function createEmptyCategoryStats() {
  return ALL_PROFILE_CATEGORY_STATS.map((category) => ({ ...category }));
}

function mergeCategoryStats(
  currentStats: ProfileCategoryStat[],
  deltaStats: ProfileCategoryStat[],
) {
  return currentStats.map((stat) => {
    const delta = deltaStats.find((item) => item.id === stat.id);
    return {
      ...stat,
      count: stat.count + (delta?.count ?? 0),
    };
  });
}

function getSelectedCategoryLabel(
  categoryStats: ProfileCategoryStat[],
  selectedCategoryId: ProfileCategoryId | null,
) {
  if (!selectedCategoryId) {
    return null;
  }

  return categoryStats.find((category) => category.id === selectedCategoryId)
    ?.label ?? null;
}

function getDisplayedFollowings(internal: ProfileAnalysisInternalData) {
  if (!internal.selectedCategoryId) {
    return [];
  }

  return internal.categorizedFollowings.filter((profile) =>
    profile.categoryIds.includes(internal.selectedCategoryId as ProfileCategoryId),
  );
}

async function fetchNextChunk(
  internal: ProfileAnalysisInternalData,
  reset = false,
) {
  const result = await fetchFollowingsList({
    actor: internal.actor,
    requestId: internal.requestId,
    reset,
  });

  internal.followings = [...internal.followings, ...result.follows];
  internal.categorizedFollowings = [
    ...internal.categorizedFollowings,
    ...result.categorizedFollows,
  ];
  internal.categoryStats = mergeCategoryStats(
    internal.categoryStats,
    result.categoryStatsDelta,
  );
  internal.lastChunkDone = result.done;
  internal.error = result.error;
  internal.status = result.error ? "error" : result.done ? "complete" : "processing";
}

export const actionsOnPageFlow = defineFlow<
  ProfileAnalysisDomainData,
  ProfileAnalysisInternalData
>(
  {
    inputHandle: {
      input: (_domain, internal) => ({
        actorDraft: internal.actorDraft,
        actor: internal.actor,
        followings: internal.followings,
        displayedFollowings: getDisplayedFollowings(internal),
        categorizedFollowings: internal.categorizedFollowings,
        categoryStats: internal.categoryStats,
        selectedCategoryId: internal.selectedCategoryId,
        selectedCategoryLabel: getSelectedCategoryLabel(
          internal.categoryStats,
          internal.selectedCategoryId,
        ),
        status: internal.status,
        error: internal.error,
      }),
      view: ProfileAnalysisPageView,
      onOutput: (_domain, internal, output: ProfileAnalysisPageOutput) => {
        if (output.action === "changeActor") {
          internal.actorDraft = output.actor;
          return "inputHandle";
        }

        if (output.action === "selectCategory") {
          internal.selectedCategoryId = output.categoryId;
          return "inputHandle";
        }

        if (output.action === "clearCategory") {
          internal.selectedCategoryId = null;
          return "inputHandle";
        }

        const actor = normalizeActor(internal.actorDraft);
        internal.actorDraft = actor;
        internal.actor = actor;
        internal.requestId = createRequestId();
        internal.followings = [];
        internal.categorizedFollowings = [];
        internal.categoryStats = createEmptyCategoryStats();
        internal.selectedCategoryId = null;
        internal.status = "processing";
        internal.error = null;
        internal.lastChunkDone = false;

        return "fetchChunkA";
      },
    },

    fetchChunkA: {
      input: () => ({}),
      action: async (_input, _domain, internal) => {
        await fetchNextChunk(internal, internal.followings.length === 0);
        return { action: "chunkFetched" as const };
      },
      onOutput: (_domain, internal) => {
        if (internal.error || internal.lastChunkDone) {
          return "inputHandle";
        }

        return "fetchChunkB";
      },
      render: {
        mode: "preserve-previous",
      },
    },

    fetchChunkB: {
      input: () => ({}),
      action: async (_input, _domain, internal) => {
        await fetchNextChunk(internal);
        return { action: "chunkFetched" as const };
      },
      onOutput: (_domain, internal) => {
        if (internal.error || internal.lastChunkDone) {
          return "inputHandle";
        }

        return "fetchChunkA";
      },
      render: {
        mode: "preserve-previous",
      },
    },
  },
  {
    start: "inputHandle",
    createInternalData: () => ({
      actorDraft: "",
      actor: "",
      requestId: "",
      followings: [],
      categorizedFollowings: [],
      categoryStats: createEmptyCategoryStats(),
      selectedCategoryId: null,
      status: "idle",
      error: null,
      lastChunkDone: false,
    }),
  },
);
