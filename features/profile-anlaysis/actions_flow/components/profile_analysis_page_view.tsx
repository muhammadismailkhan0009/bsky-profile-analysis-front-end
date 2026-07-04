"use client";

import { BskyProfileInput } from "../../bsky-handle-input/components/bsky-profile-input";
import { DisplayCategoriesForFollowings } from "../../display_categories_of_followings/components/display_categories_for_followings";
import { DisplayFollowingList } from "../../display_followings/components/display_following_list";
import type { ProfileAnalysisPageProps } from "../types";

export function ProfileAnalysisPageView({
  input,
  output,
}: ProfileAnalysisPageProps) {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-zinc-950">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="border-b border-zinc-200 pb-5">
          <p className="text-sm font-medium text-cyan-800">
            Bluesky profile analysis
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-normal">
            Following categories
          </h1>
        </header>

        <BskyProfileInput
          input={{
            actor: input.actorDraft,
            status: input.status,
          }}
          output={output}
        />

        <DisplayCategoriesForFollowings
          input={{
            categoryStats: input.categoryStats,
            selectedCategoryId: input.selectedCategoryId,
            loadedProfilesCount: input.followings.length,
            status: input.status,
          }}
          output={output}
        />

        {input.selectedCategoryId ? (
          <DisplayFollowingList
            input={{
              actor: input.actor,
              followings: input.displayedFollowings,
              loadedFollowingsCount: input.followings.length,
              selectedCategoryLabel: input.selectedCategoryLabel,
              status: input.status,
              error: input.error,
            }}
          />
        ) : null}
      </section>
    </main>
  );
}
