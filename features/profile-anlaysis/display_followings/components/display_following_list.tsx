"use client";

import Image from "next/image";
import type { FollowingProfile } from "../../_server_actions/fetch_followings_list";

export type DisplayFollowingListState = {
  actor: string;
  followings: FollowingProfile[];
  loadedFollowingsCount: number;
  selectedCategoryLabel: string | null;
  status: "idle" | "processing" | "complete" | "error";
  error: string | null;
};

type Props = {
  input: DisplayFollowingListState;
};

function Avatar({ profile }: { profile: FollowingProfile }) {
  if (profile.avatar) {
    return (
      <Image
        src={profile.avatar}
        alt=""
        width={40}
        height={40}
        unoptimized
        className="h-10 w-10 shrink-0 rounded object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-zinc-200 text-sm font-semibold text-zinc-700">
      {profile.handle.slice(0, 1).toUpperCase()}
    </div>
  );
}

export function DisplayFollowingList({ input }: Props) {
  const title = input.selectedCategoryLabel
    ? `${input.selectedCategoryLabel} profiles`
    : "Followings";
  const subtitle = input.actor
    ? input.selectedCategoryLabel
      ? `${input.followings.length} of ${input.loadedFollowingsCount} loaded profiles match this category`
      : `Loaded ${input.loadedFollowingsCount} profiles for @${input.actor}`
    : "Submit a handle to load followings.";

  return (
    <section className="min-h-[360px] border border-zinc-200 bg-white">
      <div className="flex flex-col gap-2 border-b border-zinc-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
          <p className="text-sm text-zinc-500">{subtitle}</p>
        </div>
        {input.status === "processing" ? (
          <p className="text-sm font-medium text-cyan-800">Processing</p>
        ) : null}
      </div>

      {input.error ? (
        <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {input.error}
        </div>
      ) : null}

      {input.followings.length > 0 ? (
        <ul>
          {input.followings.map((profile) => (
            <li
              key={profile.did}
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-zinc-200 px-4 py-3 last:border-b-0"
            >
              <Avatar profile={profile} />
              <div className="min-w-0">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                  <p className="max-w-full truncate text-sm font-semibold text-zinc-950">
                    {profile.displayName || profile.handle}
                  </p>
                  <p className="max-w-full truncate text-xs text-zinc-500">
                    @{profile.handle}
                  </p>
                </div>
                {profile.description ? (
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-600">
                    {profile.description}
                  </p>
                ) : (
                  <p className="mt-1 text-sm leading-5 text-zinc-400">
                    No description
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex min-h-[280px] items-center justify-center px-4 text-center text-sm text-zinc-500">
          {input.status === "processing"
            ? "Waiting for the first chunk..."
            : input.selectedCategoryLabel
              ? "No loaded profiles match this category."
              : "No followings loaded."}
        </div>
      )}
    </section>
  );
}
