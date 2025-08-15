import type { JSX } from "solid-js";
import { For } from "solid-js";
import { render } from "solid-js/web";
import { TUICI18N } from "@modules/i18n";
import { waitForElement, hasClosest } from "@modules/utils/controlElements";
import { getPref } from "@modules/pref";
import { backgroundColorClass } from "@content/modules/utils/color";
import { fontSizeClass } from "@modules/utils/fontSize";

const _data = {
    engagementsBox: (ids: string[], article: Element, isShort: boolean): () => JSX.Element => {
        return () => (
            <div
                class={`TUICEngagementsBox css-175oi2r items-center r-1efd50x r-5kkj8d flex-row ${
                    backgroundColorClass("r-2sztyj", "r-1kfrmmb", "r-1dgieki")
                }`}
            >
                <For each={ids}>{(id) => _data.links(id, article, isShort)}</For>
            </div>
        );
    },
    links: (id: string, article: Element, isShort: boolean): JSX.Element => {
        return (
            <div
                dir="ltr"
                class={`css-901oao r-1tl8opc text-[15px] font-normal leading-[20px] min-w-[0px] wrap-break-word ${
                    fontSizeClass("r-1ml3abn", "r-1d7mnkm", "r-w7s2jr", "r-1la3zjv", "r-lgtrmy")
                }`}
                style={{ cursor: "pointer", "margin-right": "1em" }}
                onClick={async () => {
                    article.querySelector<HTMLInputElement>(`[data-testid="caret"]`).click();
                    await waitForElement(`[data-testid="tweetEngagements"]`);
                    document.querySelector<HTMLButtonElement>(`[data-testid="tweetEngagements"]`).click();
                    await waitForElement(`[role="tab"][href$="/${id}"]`);
                    document.querySelector<HTMLAnchorElement>(`[role="tab"][href$="/${id}"]`).click();
                }}
            >
                <span
                    class={`css-901oao css-16my406 r-1tl8opc leading-[16px] min-w-[0px] wrap-break-word ${
                        fontSizeClass("text-[14px]", "text-[14px]", "text-[15px]", "text-[17px]", "r-1i10wst")
                    } ${backgroundColorClass("r-1bwzh9t", "r-115tad6", "r-14j79pv")}`}
                >
                    <span class="css-901oao css-16my406 r-1tl8opc min-w-[0px] wrap-break-word">
                        {TUICI18N.get("bottomTweetButtons-setting-placeEngagementsLink-" + id + (isShort ? "-short" : ""))}
                    </span>
                </span>
            </div>
        );
    },
};

export function placeEngagementsLink(articleInfo: ArticleInfomation) {
    const articleBase = articleInfo.elements.articleBase;
    const buttonBarBase = articleInfo.elements.buttonBarBase;
    for (const boxElem of Array.from(articleBase.querySelectorAll(`.TUICEngagementsBox`))) {
        boxElem.remove();
    }

    if (getPref("engagementsLink.option.placeEngagementsLink")) {
        const engageentsTypeList: string[] = getPref("fixEngagements");
        const shortName = getPref("engagementsLink.option.placeEngagementsLinkShort");

        const engagementsFixList: string[][] = [];
        const engageFixListFunc = (count: number) => {
            let tempArr: string[] = [];
            for (const engageentsType of engageentsTypeList) {
                tempArr.push(engageentsType);
                if (tempArr.length == count) {
                    engagementsFixList.push(tempArr);
                    tempArr = [];
                }
            }
            if (tempArr.length != 0) {
                engagementsFixList.push(tempArr);
            }
        };
        const isPhotoPage = location.pathname.includes("/photo/") || location.pathname.includes("/video/");
        if (shortName && !isPhotoPage) {
            engageFixListFunc(3);
        } else if ((shortName && isPhotoPage) || (!shortName && !isPhotoPage)) {
            engageFixListFunc(2);
        } else {
            engageFixListFunc(1);
        }
        for (const engageList of engagementsFixList) {
            const engagementsBox = _data.engagementsBox(engageList, articleBase, shortName);
            const engagementsBoxBase = document.createElement("div");
            engagementsBoxBase.className = "css-175oi2r TUICEngagementsBoxBase";
            hasClosest(buttonBarBase, `:scope > .TUICTweetButtomBarBase`).insertBefore(engagementsBoxBase, buttonBarBase.closest(`.TUICTweetButtomBarBase`));
            render(engagementsBox, engagementsBoxBase);
        }
    }
}
