import { translate } from "@content/i18n";
import { getSourceMap, NRStack, parseErrorStringFF } from "@shared/sourcemap";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { Dialog } from "@shared/tlui/components/Dialog";
import { TextboxComponent } from "@shared/tlui/components/TextboxComponent";

const errors = [];

/** エラーダイアログを表示します。 */
export async function showErrorDialog(e: Error) {
    // (async () => {
    let tmp: NRStack;
    //currently, the wasm does not work on chrome
    if (!e.stack.includes("chrome-extension://")) {
        tmp = await parseErrorStringFF(e.stack);
        errors.push(await getSourceMap(tmp.sourcemapUrl, tmp.line, tmp.col));
    }
    errors.push(`${e.toString()}\n${e.stack}`);

    // })();

    const dialog = new Dialog(translate("common-error"));
    dialog
        .addComponents([
            ...translate("observerError-message").split("\n"),
            "",
            new TextboxComponent(errors.join("\n\n"), { readonly: true, rows: 5 }),
            new ButtonComponent(translate("common-copy-and-close"), () => {
                dialog.close();
                navigator.clipboard.writeText(errors.join("\n\n"));
            }),
            new ButtonComponent(
                translate("common-close"),
                () => dialog.close(),

                {
                    invertColor: true,
                },
            ),
        ])
        .open();
}
