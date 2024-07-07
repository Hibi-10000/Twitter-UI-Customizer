import { TUICLibrary } from "@content/library";
import { getPref, getSettingIDs } from "@modules/pref";

const _data = {
    all: getSettingIDs("sidebarSetting.moreMenuItems"),
    selectors: {
        bookmarks: `[data-testid="Dropdown"] [href="/i/bookmarks"]`,
        monetization: `[data-testid="Dropdown"] [href="/settings/monetization"]`,
        separator: `[data-testid="Dropdown"] [role="separator"]`,
        creatorStudio: `[data-testid="Dropdown"] [aria-controls$="_0_content"]`,
        professionalTool: `[data-testid="Dropdown"] [aria-controls$="_1_content"]`,
        settingsAndSupport: `[data-testid="Dropdown"] [aria-controls$="_2_content"][data-testid="settingsAndSupport"]`,
        communities: `[data-testid="Dropdown"] [href$="/communities"]`,
        settings: `[data-testid="Dropdown"] [href="/settings"]`,
        pro: `[data-testid="Dropdown"] [href="https://tweetdeck.twitter.com"]`,
        ads: `[data-testid="Dropdown"] :is([href*="ads.twitter.com"],[href*="ads.x.com"])`,
        premium: `[data-testid="Dropdown"] :is([href="/i/verified-choose"],[href="/i/premium_sign_up"])`,
        jobs: `[data-testid="Dropdown"] [href="/jobs"]`,
        spaces: `[data-testid="Dropdown"] [href="/i/spaces/start"]`,
        followerRequests: `[data-testid="Dropdown"] [href="/follower_requests"]`,
    },
    type: {
        bookmarks: "menuitem",
        monetization: "menuitem",
        separator: "separator",
        creatorStudio: "menu",
        professionalTool: "menu",
        settingsAndSupport: "menu",
        communities: "menuitem",
        settings: "menuitem",
        pro: "menuitem",
        ads: "menuitem",
        premium: "menuitem",
        jobs: "menuitem",
        spaces: "menuitem",
        followerRequests: "menuitem",
    },
};

export async function moreMenuContent() {
    await TUICLibrary.waitForElement(`[data-testid="Dropdown"]`);
    let menuTopPx = parseFloat(document.querySelector<HTMLDivElement>(`[role="menu"]`).style.top);
    const upPx = {
        menu: TUICLibrary.fontSizeClass(46, 49, 52, 58, 62),
        menuitem: TUICLibrary.fontSizeClass(50, 53, 56, 62, 67),
        separator: 5,
    };
    for (const pref of _data.all) {
        if (getPref(`sidebarSetting.moreMenuItems.${pref}`)) {
            const elem = document.querySelector(_data.selectors[pref]);
            if (elem) {
                elem.parentElement.hide();
                menuTopPx += upPx[_data.type[pref]];
            }
        }
    }
    document.querySelector<HTMLDivElement>(`[role="menu"]`).style.top = menuTopPx + "px";
}
