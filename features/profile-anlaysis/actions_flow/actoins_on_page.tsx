"use client";

import { FlowRunner } from "@myriadcodelabs/uiflow";
import { actionsOnPageFlow } from "./flows/actions_on_page_flow";

export function ActionsOnPage() {
  return <FlowRunner flow={actionsOnPageFlow} initialData={{}} />;
}
