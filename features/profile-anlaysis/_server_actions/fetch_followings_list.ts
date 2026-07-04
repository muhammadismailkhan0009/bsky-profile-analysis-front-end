"use server";

import { AtpAgent } from "@atproto/api";
import {
  categorizeFollowings,
  type CategorizedFollowingProfile,
  type ProfileCategoryStat,
} from "./profile_categories";

const FOLLOWINGS_LIMIT = 100;
const agent = new AtpAgent({
  service: "https://public.api.bsky.app",
});

type CursorCacheEntry = {
  actor: string;
  cursor: string;
};

const cursorCache = new Map<string, CursorCacheEntry>();

type BskyProfile = {
  did?: string;
  handle?: string;
  displayName?: string;
  description?: string;
  avatar?: string;
};

export type FollowingProfile = {
  did: string;
  handle: string;
  displayName: string;
  description: string;
  avatar: string | null;
};

export type FetchFollowingsInput = {
  actor: string;
  requestId: string;
  reset?: boolean;
};

export type FetchFollowingsResult = {
  follows: FollowingProfile[];
  categorizedFollows: CategorizedFollowingProfile[];
  categoryStatsDelta: ProfileCategoryStat[];
  done: boolean;
  cursor: string;
  error: string | null;
};

function normalizeActor(actor: string) {
  return actor.trim().replace(/^@/, "");
}

function cacheKey(actor: string, requestId: string) {
  return `${requestId}:${actor}`;
}

function toFollowingProfile(profile: BskyProfile): FollowingProfile | null {
  if (!profile.did || !profile.handle) {
    return null;
  }

  return {
    did: profile.did,
    handle: profile.handle,
    displayName: profile.displayName ?? "",
    description: profile.description ?? "",
    avatar: profile.avatar ?? null,
  };
}

export async function fetchFollowingsList({
  actor,
  requestId,
  reset = false,
}: FetchFollowingsInput): Promise<FetchFollowingsResult> {
  const normalizedActor = normalizeActor(actor);

  if (!normalizedActor) {
    return {
      follows: [],
      categorizedFollows: [],
      categoryStatsDelta: [],
      done: true,
      cursor: "",
      error: "A Bluesky handle is required.",
    };
  }

  const key = cacheKey(normalizedActor, requestId);

  if (reset) {
    cursorCache.delete(key);
  }

  const cursor = cursorCache.get(key)?.cursor ?? "";

  try {
    const result = await agent.getFollows({
      actor: normalizedActor,
      limit: FOLLOWINGS_LIMIT,
      cursor,
    });
    const nextCursor = result.data.cursor ?? "";
    const follows = (result.data.follows ?? [])
      .map(toFollowingProfile)
      .filter((profile): profile is FollowingProfile => profile !== null);
    const { categorizedFollows, categoryStatsDelta } = categorizeFollowings(follows);

    if (nextCursor) {
      cursorCache.set(key, {
        actor: normalizedActor,
        cursor: nextCursor,
      });
    } else {
      cursorCache.delete(key);
    }

    return {
      follows,
      categorizedFollows,
      categoryStatsDelta,
      done: !nextCursor,
      cursor: nextCursor,
      error: null,
    };
  } catch (error) {
    cursorCache.delete(key);

    return {
      follows: [],
      categorizedFollows: [],
      categoryStatsDelta: [],
      done: true,
      cursor: "",
      error: error instanceof Error ? error.message : "Unable to fetch followings.",
    };
  }
}
