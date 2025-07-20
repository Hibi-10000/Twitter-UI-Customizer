import { fontSizeClass } from "@modules/utils/fontSize";
import { JSX } from "solid-js";

export const IconElement = (): JSX.Element => {
    return (
        <div class="css-175oi2r r-obd0qt flex-row TUICOriginalContent TUICDMIconBox">
            <div class="css-175oi2r" style={{ width: `${fontSizeClass("47", "49", "52", "57", "62")}px` }}></div>
            <div class="css-175oi2r r-u8s1d r-1d2f490">
                <div
                    class="css-175oi2r block r-bztko3"
                    style={{ width: `${fontSizeClass("36", "38", "40", "44", "48")}px`, height: `${fontSizeClass("36", "38", "40", "44", "48")}px` }}
                    data-testid="UserAvatar-Container-unknown"
                >
                    <div class="block r-13qz1uu" style={{ "padding-bottom": "100%" }}></div>
                    <div class="r-1p0dtai r-1pi2tsx r-u8s1d r-1d2f490 r-ipm5af r-13qz1uu">
                        <div class="css-175oi2r block r-1pi2tsx r-13qz1uu r-u8s1d r-1wyvozj r-desppf r-bztko3">
                            <div class="r-1p0dtai r-1pi2tsx r-u8s1d r-1d2f490 r-ipm5af r-13qz1uu">
                                <div class="css-175oi2r r-sdzlij r-1udh08x r-u8s1d r-ggadg3 r-8jfcpp" style={{ width: "calc(100% + 4px)", height: "calc(100% + 4px)" }}>
                                    <a
                                        href={document.querySelector<HTMLAnchorElement>(`[data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *)`)?.href ?? ""}
                                        role="link"
                                        class="css-175oi2r r-1pi2tsx r-13qz1uu r-o7ynqc r-6416eg r-1ny4l3l cursor-pointer"
                                        style={{ "background-color": "rgba(0, 0, 0, 0)" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .querySelector<HTMLElement>(
                                                    `:is([data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *) [data-testid="UserAvatar-Container-unknown"] [role="presentation"] > div+div+div > div > div > div > div,[data-testid="DmScrollerContainer"] [data-testid="UserAvatar-Container-unknown"]:not([href$="/followers_you_follow"] *) [style*="background-image:"])`,
                                                )
                                                .click();
                                        }}
                                    >
                                        <div
                                            class="css-175oi2r r-sdzlij r-1udh08x pointer-events-none! r-u8s1d r-1wyvozj r-desppf"
                                            style={{ "background-color": "rgb(21, 32, 43)", width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
                                        >
                                            <div class="css-175oi2r block r-1udh08x">
                                                <div class="block r-13qz1uu" style={{ "padding-bottom": "100%" }}></div>
                                                <div class="r-1p0dtai r-1pi2tsx r-u8s1d r-1d2f490 r-ipm5af r-13qz1uu">
                                                    <div aria-label="julieta ferreri" class="css-175oi2r basis-auto r-1udh08x r-417010" style={{ position: "absolute", inset: "0px" }}>
                                                        <div
                                                            class="css-175oi2r r-1niwhzg r-vvn4in r-u6sd8q r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw r-4gszlv TUICDMIconDisplay"
                                                            style={{
                                                                "background-image": document.querySelector<HTMLElement>(
                                                                    `:is([data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *) [data-testid="UserAvatar-Container-unknown"] [role="presentation"] > div+div+div > div > div > div > div,[data-testid="DmScrollerContainer"] [data-testid="UserAvatar-Container-unknown"]:not([href$="/followers_you_follow"] *) [style*="background-image:"])`,
                                                                ).style.backgroundImage,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
