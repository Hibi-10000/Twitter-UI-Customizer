import type { SidebarButtonDefinition } from "../types";
import { topics } from "./topics";
import { lists } from "./lists";
import { drafts } from "./drafts";
import { connect } from "./connect";
import { display } from "./display";
import { muteAndBlock } from "./muteAndBlock";
import { bookmarks } from "./bookmarks";
import { settings } from "./settings";
import { jobs } from "./jobs";
import { spaces } from "./spaces";
// import { chat } from "./chat";
// import { communities } from "./communities";

export const sidebarButtonsData = {
    topics,
    lists,
    /*communities,*/
    drafts,
    connect,
    display,
    muteAndBlock,
    bookmarks,
    settings,
    jobs,
    spaces,
    /*chat,*/
} satisfies Record<string, SidebarButtonDefinition>;
