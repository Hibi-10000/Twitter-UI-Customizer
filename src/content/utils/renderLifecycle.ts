import { createRoot, type JSX } from "solid-js";
import { insert, type MountableElement } from "solid-js/web";

const renderedElements = new Map<Node, () => void>();

export function checkConnected() {
    renderedElements.forEach((dispose, element) => {
        //const elements = Array.isArray(element) ? element : [element];
        //if (elements.every((e) => !e.isConnected)) {
        if (!element.isConnected) {
            //console.log("Element is not connected, disposing:", element, dispose);
            dispose();
            renderedElements.delete(element);
        }
    });
}

export function renderSolid(code: () => JSX.Element, parent: MountableElement, child?: Node) {
    const { element, dispose } = createRoot((dispose) => {
        const element = code();
        insert(parent, element, child ?? parent.firstChild ? null : undefined);
        //console.log("Rendered element:", element);
        return { element, dispose };
    });
    if (!(element instanceof Element
    //|| (Array.isArray(element) && element.every((e) => e instanceof Element))
    )) {
        dispose();
        throw new TypeError("Rendered content is not an Element");
    }

    checkConnected();
    renderedElements.set(element, dispose);
}
