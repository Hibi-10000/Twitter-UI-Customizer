import { render } from "solid-js/web";
import { hideElement } from "@content/utils/element";
import { getPref } from "@modules/pref";
import { moreMenuContent } from "./moreMenuContent";
import { sidebarButtonsData } from "./buttons";

let sidebarButtonsCount = -1;

export const SidebarButtonSelectors = {
    home: '[href="/home"]',
    explore: '[href="/explore"]',
    communities: '[href$="/communities"],#TUICSidebar_communities',
    notifications: '[href*="/notifications"]',
    messages: '[href^="/messages"], #TUICSidebar_chat, [href="/i/chat"]',
    bookmarks: '[href="/i/bookmarks"],#TUICSidebar_bookmarks',
    profile: '[data-testid="AppTabBar_Profile_Link"]',
    moremenu: '[data-testid="AppTabBar_More_Menu"]',
    topics: "#TUICSidebar_topics",
    lists: '#TUICSidebar_lists,[href$="/lists"]',
    drafts: "#TUICSidebar_drafts",
    connect: "#TUICSidebar_connect",
    communitynotes: '[href="/i/communitynotes"]',
    "verified-choose": '[href="/i/verified-choose"],[href="/i/premium_sign_up"],[href^="/i/premium"]',
    display: "#TUICSidebar_display",
    muteAndBlock: "#TUICSidebar_muteAndBlock",
    settings: "#TUICSidebar_settings",
    premiumTierSwitch: '[href="/i/premium_tier_switch"],[href="/i/verified-orgs-signup"]',
    jobs: '[href="/jobs"],#TUICSidebar_jobs',
    spaces: "#TUICSidebar_spaces",
    grok: '[href="/i/grok"]',
    //chat: `#TUICSidebar_chat, [href="/i/chat"]`,
};

export function sidebarButtons() {
    if (location.pathname == "/i/delegate/switch" && getPref("sidebarSetting.buttonConfig.autoDelegate")) {
        document.querySelector<HTMLButtonElement>(`[role="dialog"] button[type="button"]:not([data-testid="app-bar-close"]):not(button+button)`)?.click();
    }

    const bannerRoot = document.querySelector<HTMLElement>(`[role=banner] > ${"div >".repeat(5)} nav`);
    if (bannerRoot) {
        const vanillaBookmark = document.querySelector(`[href="/i/bookmarks"]:not(#TUICSidebar_bookmarks)`);
        const tuicBookmark = document.querySelector(`#TUICSidebar_bookmarks`);
        if (vanillaBookmark && tuicBookmark) {
            tuicBookmark.remove();
            sidebarButtonProcess(bannerRoot);
        } else if (getPref("sidebarButtons").includes("bookmarks") && !(vanillaBookmark || tuicBookmark)) {
            sidebarButtonProcess(bannerRoot);
        } else if (bannerRoot.querySelector(`a:not([data-tuic-hide])`)) {
            sidebarButtonProcess(bannerRoot);
        } else if (sidebarButtonsCount != bannerRoot.querySelectorAll(`a:not([data-tuic-hide="false"])`).length) {
            let changeElem = false;
            for (const selector of getPref("sidebarButtons")) {
                const elems = bannerRoot.querySelectorAll(SidebarButtonSelectors[selector]);
                if (elems.length > 1) {
                    const elems = [...bannerRoot.querySelectorAll(SidebarButtonSelectors[selector])];
                    for (const elem of elems) {
                        if (elem.id.includes("TUIC")) {
                            elem.remove();
                        }
                    }
                    changeElem = true;
                } else if (elems.length == 0 && selector in sidebarButtonsData) {
                    changeElem = true;
                }
            }
            if (changeElem) sidebarButtonProcess(bannerRoot);
        }
    }
}

function sidebarButtonProcess(bannerRoot: HTMLElement) {
    if (!window.location.pathname.startsWith("/i/communitynotes") && !window.location.pathname.startsWith("/i/birdwatch")) {
        sidebarButtonsCount = 0;
        for (const i of getPref("sidebarButtons") as string[]) {
            let moveElem = bannerRoot.querySelector<HTMLElement>(SidebarButtonSelectors[i]);
            if (moveElem != null) {
                bannerRoot.appendChild(moveElem);
                moveElem.dataset.tuicHide = "false";
                if (i == "moremenu") {
                    moveElem.onclick = moreMenuContent;
                    moveElem.addEventListener("keydown", (e: KeyboardEvent) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            moreMenuContent();
                        }
                    });
                }
                sidebarButtonsCount += 1;
            } else if (i in sidebarButtonsData) {
                render(sidebarButtonsData[i](), bannerRoot);
                moveElem = bannerRoot.querySelector<HTMLAnchorElement>(`#TUICSidebar_${i}`);
                sidebarButtonsCount += 1;
            }
        }
        for (const i of bannerRoot.querySelectorAll<HTMLElement>(`:is(a,div[role="button"],button,[type="button"]):not([data-tuic-hide="false"])`)) {
            hideElement(i);
        }
    }
}
