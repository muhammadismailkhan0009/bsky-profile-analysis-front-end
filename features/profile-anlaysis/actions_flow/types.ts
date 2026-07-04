import type { OutputHandle } from "@myriadcodelabs/uiflow";
import type { FollowingProfile } from "../_server_actions/fetch_followings_list";
import type {
  CategorizedFollowingProfile,
  ProfileCategoryId,
  ProfileCategoryStat,
} from "../_server_actions/profile_categories";
import type { BskyProfileInputOutput } from "../bsky-handle-input/components/bsky-profile-input";
import type { DisplayCategoriesOutput } from "../display_categories_of_followings/components/display_categories_for_followings";

export type ProfileAnalysisStatus = "idle" | "processing" | "complete" | "error";

export type ProfileAnalysisDomainData = Record<string, never>;

export type ProfileAnalysisInternalData = {
  actorDraft: string;
  actor: string;
  requestId: string;
  followings: FollowingProfile[];
  categorizedFollowings: CategorizedFollowingProfile[];
  categoryStats: ProfileCategoryStat[];
  selectedCategoryId: ProfileCategoryId | null;
  status: ProfileAnalysisStatus;
  error: string | null;
  lastChunkDone: boolean;
};

export type ProfileAnalysisPageOutput =
  | BskyProfileInputOutput
  | DisplayCategoriesOutput;

export type ProfileAnalysisPageInput = {
  actorDraft: string;
  actor: string;
  followings: FollowingProfile[];
  displayedFollowings: FollowingProfile[];
  categorizedFollowings: CategorizedFollowingProfile[];
  categoryStats: ProfileCategoryStat[];
  selectedCategoryId: ProfileCategoryId | null;
  selectedCategoryLabel: string | null;
  status: ProfileAnalysisStatus;
  error: string | null;
};

export type ProfileAnalysisPageProps = {
  input: ProfileAnalysisPageInput;
  output: OutputHandle<ProfileAnalysisPageOutput>;
};
