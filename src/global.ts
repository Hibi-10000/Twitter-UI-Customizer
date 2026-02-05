type I18n = Record<string, string>;

interface I18nAndAllContent {
    all: string[];
    i18n: I18n;
    [key: string]: unknown;
}

interface ArticleInfomation {
    elements: {
        buttonBarBase: HTMLDivElement;
        articleBase: HTMLElement;
        /** ツイート要素の日付リンク（例: 最終更新 12:34:56 20XX年X月X日） */
        statusButton: HTMLAnchorElement;
    };
    option: {
        isLockedAccount: boolean;
        cannotRT: boolean;
        cannotShare: boolean;
        isMe: boolean;
        isBigArticle: boolean;
    };
}
