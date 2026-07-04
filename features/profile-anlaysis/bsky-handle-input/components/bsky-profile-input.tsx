"use client";

import type { OutputHandle } from "@myriadcodelabs/uiflow";

export type BskyProfileInputState = {
  actor: string;
  status: "idle" | "processing" | "complete" | "error";
};

export type BskyProfileInputOutput =
  | { action: "changeActor"; actor: string }
  | { action: "submit" };

type Props = {
  input: BskyProfileInputState;
  output: OutputHandle<BskyProfileInputOutput>;
};

export function BskyProfileInput({ input, output }: Props) {
  const isProcessing = input.status === "processing";

  return (
    <form
      className="grid gap-3 border border-zinc-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        output.emit({ action: "submit" });
      }}
    >
      <label className="min-w-0">
        <span className="mb-1 block text-sm font-medium text-zinc-700">
          Bluesky handle
        </span>
        <input
          value={input.actor}
          disabled={isProcessing}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="alice.bsky.social"
          className="h-11 w-full border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none focus:border-cyan-700 disabled:bg-zinc-100 disabled:text-zinc-500"
          onChange={(event) =>
            output.emit({ action: "changeActor", actor: event.target.value })
          }
        />
      </label>

      <div className="flex items-end">
        <button
          type="submit"
          disabled={isProcessing || !input.actor.trim()}
          className="h-11 min-w-28 bg-cyan-700 px-4 text-sm font-semibold text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          {isProcessing ? "Processing" : "Submit"}
        </button>
      </div>
    </form>
  );
}
