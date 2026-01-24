import { translate } from "@content/i18n";
import { isSafemode } from "@content/settings/ui/safemode";
import { getPref } from "@content/settings";

const notificationsRegexp = /^(\([0-9]+\))[0-9() ]+([^0-9() ])/;

const headObserver: MutationObserver = new MutationObserver(titleObserverFunction);
export function titleObserverFunction() {
    let stoppedObserver = false;
    if (isSafemode) {
        headObserver.disconnect();
        stoppedObserver = true;
        document.title = translate("safemode-title");
    } else if (getPref("XToTwitter.XToTwitter")) {
        const locPath = window.location.pathname;
        if (!document.title.endsWith("Twitter")) {
            headObserver.disconnect();
            stoppedObserver = true;

            const replaceI18NRes = (regexp: string | RegExp, i18nRes: string) => {
                const titleInfo = document.title.match(new RegExp(regexp)); /*/Xユーザーの(.*)さん: 「(.*)」/*/
                if (!titleInfo || titleInfo.length <= 1) {
                    document.title = document.title.replace(/(.*)\/ X/, "$1/ Twitter");
                } else {
                    document.title
                        = (
                            (document.title.startsWith("(") ? document.title.match(/\(\d*\)/) + " " : "")
                            + i18nRes
                                .replaceAll("&quot;", '"')
                                .replace("{fullName}", titleInfo[1])
                                .replace("{screenName}", titleInfo[2])
                                .replace("{tweetText}", titleInfo[2]) //locPath.includes("/status/")
                                .replace(/(.*)\/ X(」|")/, "$1 / Twitter")
                        );
                }
            };

            if (document.title == "X") {
                document.title = "Twitter";
            } else if (locPath.includes("/i/timeline") || locPath.includes("/compose/tweet")) {
                document.title = (document.title.startsWith("(") ? document.title.match(/\(\d*\)/) + " " : "") + translate("XtoTwitter-PostToTweet-tweetNotificationsTitle") + " / Twitter";
            } else if (locPath.endsWith("/with_replies") && !locPath.includes("/status/")) {
                const postsWithRepliesLatest = translate("XtoTwitter-PostToTweet-profile-postsWithReplies-latest");
                const postsWithRepliesOld = translate("XtoTwitter-PostToTweet-profile-postsWithReplies-old");

                const regexp = postsWithRepliesLatest.replaceAll("&quot;", '"').replaceAll("(", "\\(").replaceAll(")", "\\)").replace("{fullName}", "(.*)").replace("{screenName}", "(.*)");

                replaceI18NRes(regexp, postsWithRepliesOld);
            } else if (locPath.endsWith("/media") && !locPath.includes("/status/")) {
                const mediaLatest = translate("XtoTwitter-PostToTweet-profile-media-latest");
                const mediaOld = translate("XtoTwitter-PostToTweet-profile-media-old");

                /* /Xユーザーの(.*)さん: 「(.*)」/ */
                const regexp = new RegExp(mediaLatest.replaceAll("&quot;", '"').replaceAll("(", "\\(").replaceAll(")", "\\)").replace("{fullName}", "(.*)").replace("{screenName}", "(.*)"));

                replaceI18NRes(regexp, mediaOld);
            } else if (locPath.endsWith("/likes") && !locPath.includes("/status/")) {
                const likesLatest = translate("XtoTwitter-PostToTweet-profile-likes-latest");
                const likesOld = translate("XtoTwitter-PostToTweet-profile-likes-old");

                /*/Xユーザーの(.*)さん: 「(.*)」/*/
                const regexp = new RegExp(likesLatest.replaceAll("&quot;", '"').replaceAll("(", "\\(").replaceAll(")", "\\)").replace("{fullName}", "(.*)").replace("{screenName}", "(.*)"));

                replaceI18NRes(regexp, likesOld);
            } else if (locPath.includes("/status/")) {
                const titlePeopleTweetedUser = translate("XtoTwitter-PostToTweet-titlePeopleTweetedUser");
                const titlePeopleTweeted = translate("XtoTwitter-PostToTweet-titlePeopleTweeted");

                /*/Xユーザーの(.*)さん: 「(.*)」/*/
                const regexp = new RegExp(titlePeopleTweetedUser.replaceAll("&quot;", '"').replace("{fullName}", "(.*)").replace("{tweetText}", "(.*)"));

                replaceI18NRes(regexp, titlePeopleTweeted);
            } else if (document.title.endsWith(" / X")) {
                document.title = document.title.replace(/(.*)\/ X/, "$1/ Twitter");
            }
        }
        if (notificationsRegexp.test(document.title)) {
            headObserver.disconnect();
            stoppedObserver = true;
            document.title = document.title.replace(notificationsRegexp, "$1 $2");
        }
    } /* else if (document.title.endsWith(" / Twitter")) {
        headObserver.disconnect();
        stoppedObserver = true;
        document.title = document.title.replace(" / Twitter", " / X");
    }*/

    if (stoppedObserver) {
        headObserver.observe(document.querySelector("title"), {
            characterData: true,
            childList: true,
        });
    }
}
