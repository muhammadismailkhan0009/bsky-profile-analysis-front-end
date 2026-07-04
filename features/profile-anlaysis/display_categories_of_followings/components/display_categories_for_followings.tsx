"use client";

import type { OutputHandle } from "@myriadcodelabs/uiflow";
import type {
  ProfileCategoryId,
  ProfileCategoryStat,
} from "../../_server_actions/profile_categories";

export type DisplayCategoriesState = {
  categoryStats: ProfileCategoryStat[];
  selectedCategoryId: ProfileCategoryId | null;
  loadedProfilesCount: number;
  status: "idle" | "processing" | "complete" | "error";
};

export type DisplayCategoriesOutput =
  | { action: "selectCategory"; categoryId: ProfileCategoryId }
  | { action: "clearCategory" };

type Props = {
  input: DisplayCategoriesState;
  output: OutputHandle<DisplayCategoriesOutput>;
};

export function DisplayCategoriesForFollowings({ input, output }: Props) {
  const hasProfiles = input.loadedProfilesCount > 0;
  const visibleStats = input.categoryStats.filter(
    (category) => hasProfiles || category.count > 0,
  );

  return (
    <section className="border border-zinc-200 bg-white">
      <div className="flex flex-col gap-2 border-b border-zinc-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-950">Categories</h2>
          <p className="text-sm text-zinc-500">
            {hasProfiles
              ? `${input.loadedProfilesCount} loaded profiles categorized from descriptions`
              : "Categories appear after followings load."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {input.status === "processing" ? (
            <p className="text-sm font-medium text-cyan-800">Updating</p>
          ) : null}
          {input.selectedCategoryId ? (
            <button
              type="button"
              className="h-9 border border-zinc-300 px-3 text-sm font-medium text-zinc-700 hover:border-zinc-500"
              onClick={() => output.emit({ action: "clearCategory" })}
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      {visibleStats.length > 0 ? (
        <div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleStats.map((category) => {
            const selected = input.selectedCategoryId === category.id;
            const percentage =
              input.loadedProfilesCount > 0
                ? Math.round((category.count / input.loadedProfilesCount) * 100)
                : 0;

            return (
              <button
                key={category.id}
                type="button"
                className={`min-h-20 border px-3 py-2 text-left transition ${
                  selected
                    ? "border-cyan-700 bg-cyan-50"
                    : "border-zinc-200 bg-white hover:border-zinc-400"
                }`}
                onClick={() =>
                  output.emit({
                    action: "selectCategory",
                    categoryId: category.id,
                  })
                }
              >
                <span className="block text-sm font-semibold text-zinc-950">
                  {category.label}
                </span>
                <span className="mt-2 flex items-center justify-between text-sm text-zinc-600">
                  <span>{category.count} profiles</span>
                  <span>{percentage}%</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-sm text-zinc-500">
          No category statistics yet.
        </div>
      )}
    </section>
  );
}
