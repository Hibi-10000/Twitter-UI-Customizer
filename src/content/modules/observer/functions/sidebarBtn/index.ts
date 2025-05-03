import { waitForElement, parseHtml, hideElement } from "@modules/utils/controlElements";
import { getPref } from "@modules/pref";
import { moreMenuContent } from "./moreMenuContent";
import { TUICI18N } from "@modules/i18n";
import { SIDEBAR_BUTTON_ICON } from "@content/icons";
import { backgroundColorCheck } from "@modules/utils/color";
import { getPrimitiveOrFunction } from "@modules/utils/getValues";
import { fontSizeClass } from "@modules/utils/fontSize";
import { Dialog } from "@shared/tlui/components/Dialog";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { DivBoxComponent } from "@shared/tlui/components/DivBox";

let sidebarButtonsCount = -1;

export const SidebarButtonSelectors = {
    home: '[href="/home"]',
    explore: '[href="/explore"]',
    communities: '[href$="/communities"],#TUICSidebar_communities',
    notifications: '[href*="/notifications"]',
    messages: '[href^="/messages"]',
    bookmarks: '[href="/i/bookmarks"],#TUICSidebar_bookmarks',
    profile: '[data-testid="AppTabBar_Profile_Link"]',
    moremenu: '[data-testid="AppTabBar_More_Menu"]',
    topics: "#TUICSidebar_topics",
    lists: '#TUICSidebar_lists,[href$="/lists"]',
    drafts: "#TUICSidebar_drafts",
    connect: "#TUICSidebar_connect",
    communitynotes: '[href="/i/communitynotes"]',
    "verified-choose": '[href="/i/verified-choose"],[href="/i/verified-orgs-signup"],[href="/i/premium_sign_up"]',
    display: "#TUICSidebar_display",
    muteAndBlock: "#TUICSidebar_muteAndBlock",
    settings: "#TUICSidebar_settings",
    premiumTierSwitch: '[href="/i/premium_tier_switch"]',
    jobs: "#TUICSidebar_jobs",
    spaces: "#TUICSidebar_spaces",
    grok: '[href="/i/grok"]',
};

const _data = {
    selectors: SidebarButtonSelectors,
    html: {
        __base: (id: string, svg: string): string => {
            return `
            <a id="TUICSidebar_${id}" href="${getPrimitiveOrFunction<string>(
                _data.tuicButtonGoToUrl[id],
            )}" role="link" tabindex="0" class="css-175oi2r r-1habvwh r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1ny4l3l r-13qz1uu r-cnw61z TUICOriginalContent TUICSidebarButton ${location.pathname.endsWith("/topics") ? "TUICSidebarSelected" : ""}">
                <div class="css-175oi2r r-1awozwy r-sdzlij r-18u37iz r-1777fci r-dnmrzs r-o7ynqc r-6416eg ${fontSizeClass("r-q81ovl", "r-q81ovl", "r-xyw6el", "r-kq9wsh", "r-1slz7xr")}">
                    <div class="css-175oi2r">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e ${backgroundColorCheck() == "light" ? "r-18jsvk2" : "r-vlxjld r-1nao33i"}">
                            <g>${svg}</g>
                        </svg>
                    </div>
                    <div dir="ltr" class="css-146c3p1 r-dnmrzs r-1udh08x r-3s2u2q r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc r-9p5ork ${fontSizeClass(
                        "r-1i10wst r-hbpseb r-16dba41 r-b8s2zf r-1nbxd40 r-fv9tdh",
                        "r-1b6yd1w r-7ptqe7 r-16dba41 r-1b4jfhh r-egpt5t r-1tfrt9a",
                        "r-adyw6z r-135wba7 r-dlybji r-nazi8o",
                        "r-evnaw r-eaezby r-16dba41 r-1fqalh9 r-k1rd3f r-i0ley5 r-19o66xi",
                        "r-1x35g6 r-1h1c4di r-16dba41 r-ikuq2u r-1ck5maq",
                    )} r-bcqeeo r-qvutc0 ${backgroundColorCheck() == "light" ? "r-18jsvk2" : "r-vlxjld r-1nao33i"}" style="margin-right: 15px; text-overflow: unset;" >
                        <span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0" style="text-overflow: unset;">${TUICI18N.get("sidebarButtons-" + id)}</span>
                    </div>
                </div>
            </a>`;
        },
        topics: (): string => {
            return _data.html.__base("topics", `<path d="${SIDEBAR_BUTTON_ICON.topics.unselected}"></path>`);
        },
        lists: () => {
            return _data.html.__base("lists", `<path d="${SIDEBAR_BUTTON_ICON.lists.unselected}"></path>`);
        },
        /*"communities": () => {
            return _data.html.__base("communities",`<path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path>`)
        },*/
        drafts: (): string => {
            return _data.html.__base("drafts", `<path d="${SIDEBAR_BUTTON_ICON.drafts.unselected}">`);
        },
        connect: (): string => {
            return _data.html.__base("connect", `<path d="${SIDEBAR_BUTTON_ICON.connect.unselected}"></path>`);
        },
        display: (): string => {
            return _data.html.__base("display", `<path d="${SIDEBAR_BUTTON_ICON.display.unselected}"></path><path d="M14 12c0-1.1-.9-2-2-2-1.11 0-2 .9-2 2v2h2c1.1 0 2-.9 2-2z" class="r-1cvl2hr"></path>`);
        },
        muteAndBlock: (): string => {
            return _data.html.__base("muteAndBlock", `<path d="${SIDEBAR_BUTTON_ICON.muteAndBlock.unselected}"></path>`);
        },
        bookmarks: (): string => {
            return _data.html.__base("bookmarks", `<path d="${SIDEBAR_BUTTON_ICON.bookmarks.unselected}"></path>`);
        },
        settings: (): string => {
            return _data.html.__base("settings", `<path d="${SIDEBAR_BUTTON_ICON.settings.unselected}"></path>`);
        },
        jobs: (): string => {
            return _data.html.__base("jobs", `<path d="${SIDEBAR_BUTTON_ICON.jobs.unselected}"></path>`);
        },
        spaces: (): string => {
            return _data.html.__base("spaces", `<path d="${SIDEBAR_BUTTON_ICON.spaces.unselected}"></path>`);
        },
    },
    buttonClickInMoreMenu: async (selector: string) => {
        (await waitForElement<HTMLAnchorElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`))[0].click();
        const foundElem = (await waitForElement<HTMLAnchorElement>(`:is([role="group"],[data-testid="Dropdown"]) ${selector}`))[0];
        foundElem.click();
        (await waitForElement<HTMLAnchorElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`))[0].click();
        setTimeout(() => {
            if (document.querySelector(`[role="menu"]`)) document.querySelector<HTMLDivElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`)?.click();
        }, 500);
        if (!foundElem) {
            return false;
        }
        return true;
    },
    buttonFunctions: {
        topics: async (e: Event) => {
            e?.preventDefault?.();
            if (!location.pathname.endsWith("/topics")) {
                const moreMenu = document.querySelector<HTMLDivElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`);
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings/privacy_and_safety"]`))[0].click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings/content_you_see"]`))[0].click();
                    (await waitForElement<HTMLAnchorElement>(`main [href$="/topics"]`))[0].click();
                    setTimeout(() => {
                        if (document.querySelector(`[role="menu"]`)) moreMenu.click();
                    }, 500);
                }, 150);
            }
        },
        lists: (e: Event) => {
            e?.preventDefault?.();
            _data.buttonClickInMoreMenu(`[href$="/lists"]`);
        },
        /*"communities": function (e:Event) {
            _data.buttonClickInMoreMenu( `[href$="/communities"]`)
        },*/
        drafts: async (e: Event) => {
            e?.preventDefault?.();
            //_data.buttonClickInMoreMenu( `[href="/compose/tweet/unsent/drafts"]`);
            document.querySelector<HTMLElement>(`[href="/compose/tweet"]`).click();
            (await waitForElement<HTMLButtonElement>(`[data-testid="unsentButton"]`))[0].click();
        },
        connect: (e: Event) => {
            e?.preventDefault?.();
            _data.buttonClickInMoreMenu(`[href="/i/connect_people"]`);
        },
        display: async (e: Event) => {
            e?.preventDefault?.();
            /*if (_data.buttonClickInMoreMenu( `:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`)) {
                await waitAndClickElement(`[href="/i/display"]`);
            }*/
            if (!location.pathname.endsWith("/settings/display")) {
                const moreMenu = document.querySelector<HTMLElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`);
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    await waitForElement(`[data-testid="accountAccessLink"]`);
                    if (location.href.endsWith("/settings/delegate")) {
                        await waitForElement("#layers");
                        const dialog = new Dialog(TUICI18N.get("common-displaySetting"));
                        dialog.contentWidth = "50vw";
                        //dialog.fitContentWidth = true;
                        dialog
                            .addComponents([
                                new ButtonComponent(TUICI18N.get("common-close"), () => {
                                    dialog.close();
                                }),
                                new DivBoxComponent({ id: "TUICOriginalDisplaySetting" }),
                                new ButtonComponent(TUICI18N.get("common-close"), () => {
                                    dialog.close();
                                }),
                            ]).open();
                    } else {
                        (await waitForElement<HTMLAnchorElement>(`[href="/settings/accessibility_display_and_languages"]`))[0].click();
                        (await waitForElement<HTMLAnchorElement>(`[href="/settings/display"]`))[0].click();
                        setTimeout(() => {
                            if (document.querySelector(`[role="menu"]`)) moreMenu.click();
                        }, 500);
                    }
                }, 150);
            }
        },
        muteAndBlock: async (e: Event) => {
            e?.preventDefault?.();
            if (!location.pathname.endsWith("/settings/privacy_and_safety")) {
                const moreMenu = document.querySelector<HTMLElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`);
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    await waitForElement(`[data-testid="accountAccessLink"]`);
                    if (!location.href.endsWith("/settings/delegate")) {
                        (await waitForElement<HTMLAnchorElement>(`[href="/settings/privacy_and_safety"]`))[0].click();
                        (await waitForElement<HTMLAnchorElement>(`[href="/settings/mute_and_block"]`))[0].click();
                        setTimeout(() => {
                            if (document.querySelector(`[role="menu"]`)) moreMenu.click();
                        }, 500);
                    }
                }, 150);
            }
        },
        bookmarks: (e: Event) => {
            e?.preventDefault?.();
            _data.buttonClickInMoreMenu(`[href="/i/bookmarks"]`);
        },
        settings: (e: Event) => {
            e?.preventDefault?.();
            if (!location.pathname.includes("/settings") || location.pathname.includes("/settings/display")) {
                const moreMenu = document.querySelector<HTMLDivElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`);
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    setTimeout(() => {
                        if (document.querySelector(`[role="menu"]`)) moreMenu.click();
                    }, 500);
                }, 150);
            }
        },
        jobs: (e: Event) => {
            e?.preventDefault?.();
            _data.buttonClickInMoreMenu(`[href="/jobs"]`);
        },
        spaces: (e: Event) => {
            e?.preventDefault?.();
            _data.buttonClickInMoreMenu(`[href="/i/spaces/start"]`);
        },
    },
    tuicButtonGoToUrl: {
        __setURL: (id, selector, setURLWay: (arg0: HTMLElement) => string) => {
            const elem = document.querySelector(selector);
            if (elem) {
                return setURLWay(elem);
            } else {
                _data.tuicButtonGoToUrl.__setURLWait(id, selector, setURLWay);
                return "";
            }
        },
        __setURLWait: async (id: string, selector: string, setURLWay: (arg0: HTMLElement) => string) => {
            await waitForElement(selector);
            const elem = document.querySelector<HTMLLinkElement>(`#TUICSidebar_${id}`);
            if (elem) {
                elem.href = setURLWay(document.querySelector(selector));
            }
        },
        topics: () => {
            return _data.tuicButtonGoToUrl.__setURL("topics", `[data-testid="SideNav_AccountSwitcher_Button"] [data-testid^="UserAvatar-Container-"]`, (elem) => {
                return `/${elem.getAttribute("data-testid").replace("UserAvatar-Container-", "")}/topics`;
            });
        },
        lists: () => {
            return _data.tuicButtonGoToUrl.__setURL("lists", `[data-testid="SideNav_AccountSwitcher_Button"] [data-testid^="UserAvatar-Container-"]`, (elem) => {
                return `/${elem.getAttribute("data-testid").replace("UserAvatar-Container-", "")}/lists`;
            });
        },
        communities: () => {
            return _data.tuicButtonGoToUrl.__setURL("communities", `[data-testid="SideNav_AccountSwitcher_Button"] [data-testid^="UserAvatar-Container-"]`, (elem) => {
                return `/${elem.getAttribute("data-testid").replace("UserAvatar-Container-", "")}/communities`;
            });
        },
        connect: "/i/connect_people",
        drafts: "/compose/tweet/unsent/drafts",
        display: "/i/display",
        muteAndBlock: "/settings/mute_and_block",
        bookmarks: "/i/bookmarks",
        settings: "/settings/",
        jobs: "/jobs/",
        spaces: "/i/spaces/start/",
    },
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
                const elems = bannerRoot.querySelectorAll(_data.selectors[selector]);
                if (elems.length > 1) {
                    const elems = [...bannerRoot.querySelectorAll(_data.selectors[selector])];
                    for (const elem of elems) {
                        if (elem.id.includes("TUIC")) {
                            elem.remove();
                        }
                    }
                    changeElem = true;
                } else if (elems.length == 0 && selector in _data.html) {
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
        for (const i of getPref("sidebarButtons")) {
            let moveElem = bannerRoot.querySelector<HTMLElement>(_data.selectors[i]);
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
            } else if (i in _data.html) {
                moveElem = parseHtml(_data.html[i]()).item(0) as HTMLElement;
                moveElem.dataset.tuicHide = "false";
                moveElem.onclick = _data.buttonFunctions[i];
                moveElem.addEventListener("keydown", (e: KeyboardEvent) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        _data.buttonFunctions[i]();
                    }
                });
                bannerRoot.appendChild(moveElem);
                sidebarButtonsCount += 1;
            }
        }
        for (const i of bannerRoot.querySelectorAll<HTMLElement>(`:is(a,div[role="button"],button,[type="button"]):not([data-tuic-hide="false"])`)) {
            hideElement(i);
        }
    }
}
