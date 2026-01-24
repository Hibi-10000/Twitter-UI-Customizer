import { isSafemode } from "@content/settings/ui/safemode";
import { getPref, setPref, savePref, mergePref } from "@content/settings";
import { titleObserverFunction } from "@modules/observer/titleObserver";
import { updateClasses } from "@modules/htmlClass/classManager";

export const XToTwitterRestoreIcon = () => {
    const importPref = {
        sidebarSetting: { buttonConfig: { birdGoBack: true } },
        twitterIcon: {
            options: {
                faviconSet: true,
            },
            icon: "twitter",
        },
    };
    setPref("", mergePref(getPref(""), importPref));
    savePref();
    updateClasses();
    titleObserverFunction();
    if (!isSafemode) {
        document.querySelector("#TUIC_setting").remove();
    }
    if (!getPref("XToTwitter.XToTwitter") && document.title.endsWith(" / Twitter")) {
        document.title = document.title.replace(" / Twitter", " / X");
    }
};
