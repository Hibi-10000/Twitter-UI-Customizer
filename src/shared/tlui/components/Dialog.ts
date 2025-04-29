import { Component } from "./Component";

export interface DialogInit {
    /**
     * パディングをつけるかどうか（初期値: `true`）
     */
    hasPadding?: boolean;
    /**
     * ダイアログの幅をコンテンツの幅に合わせるかどうか（初期値: `false`）
     */
    fitContentWidth?: boolean;
    /**
     * ダイアログの幅（初期値: `380px`）
     */
    contentWidth?: string;
}

/**
 * Twitterのダイアログ風要素
 */
export class Dialog {
    /**
     * ダイアログ要素
     */
    public element: HTMLElement;

    /**
     * 要素を追加するためのコンテナ
     */
    public container: Element;

    /**
     * @param title ダイアログのタイトル
     * @param options オプション
     */
    constructor(title: string, options: DialogInit = {}) {
        this.element = new DOMParser().parseFromString(
            `
            <div class="tlui tlui-dialog has-padding">
                <div class="tlui-container">
                    <h1>${title}</h1>
                </div>
            </div>
            `,
            "text/html",
        ).body.children[0] as HTMLElement;
        this.container = this.element.querySelector("div");

        for (const [key, value] of Object.entries(Object.assign({}, options))) {
            this[key] = value;
        }
    }

    #refresh() {
        if (document.querySelector("#layers .tlui-dialog")) {
            document.documentElement.classList.add("tlui-has-dialog");
        } else {
            document.documentElement.classList.remove("tlui-has-dialog");
        }
    }

    /**
     * ダイアログの幅をコンテンツの幅に合わせるかどうか（初期値: `false`）
     */
    public get contentWidth(): boolean {
        return this.element.classList.contains("fit-content-width");
    }
    public set contentWidth(value: string) {
        if (value) {
            this.element.style.setProperty("--tuic-dialog-width", value);
        } else {
            this.element.style.removeProperty("--tuic-dialog-width");
        }
    }

    /**
     * ダイアログの幅をコンテンツの幅に合わせるかどうか（初期値: `false`）
     */
    public get fitContentWidth(): boolean {
        return this.element.classList.contains("fit-content-width");
    }
    public set fitContentWidth(value: boolean) {
        if (value) {
            this.element.classList.add("fit-content-width");
        } else {
            this.element.classList.remove("fit-content-width");
        }
    }

    /**
     * パディングをつけるかどうか（初期値: `true`）
     */
    public get hasPadding(): boolean {
        return this.element.classList.contains("has-padding");
    }
    public set hasPadding(value: boolean) {
        if (value) {
            this.element.classList.add("has-padding");
        } else {
            this.element.classList.remove("has-padding");
        }
    }

    /**
     * コンポーネントを追加します。
     * @param components コンポーネント
     */
    public addComponents(components: (string | Component)[]): Dialog {
        for (const component of components) {
            if (typeof component === "string") {
                if (component) {
                    const p = document.createElement("p");
                    p.textContent = component;
                    this.container.appendChild(p);
                } else {
                    const br = document.createElement("br");
                    this.container.appendChild(br);
                }
            } else {
                this.container.appendChild(component.element);
            }
        }
        return this;
    }

    /**
     * ダイアログを開きます。
     */
    public open(): Dialog {
        document.querySelector("#layers").appendChild(this.element);
        this.#refresh();
        return this;
    }

    /**
     * ダイアログを閉じます。
     */
    public close(): Dialog {
        this.element.remove();
        this.#refresh();
        return this;
    }
}
