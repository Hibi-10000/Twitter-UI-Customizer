import type { SidebarButtonDefinition } from "../types";
import { createSidebarButton } from "../components";
import { SIDEBAR_BUTTON_ICON } from "@content/icons";
import { buttonClickInMoreMenu } from "../utils";

export const bookmarks: SidebarButtonDefinition = () => createSidebarButton({
    id: "bookmarks",
    svg: () => <path d={SIDEBAR_BUTTON_ICON.bookmarks.unselected}></path>,
    url: "/i/bookmarks",
    onclick: (e: Event) => {
        e?.preventDefault?.();
        buttonClickInMoreMenu(`[href="/i/bookmarks"]`);
    },
});
