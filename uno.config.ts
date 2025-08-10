import { defineConfig, presetWind4 } from "unocss";

export default defineConfig({
    content: {
        filesystem: [
            "src/{content,shared}/**/*.{ts,tsx,vue}",
        ],
    },
    presets: [
        presetWind4({
            preflights: {
                reset: false,
            },
        }),
    ],
    rules: [
        ["twcss-text-explicit", {
            "background-color": "rgba(0,0,0,0.00)",
            border: "0 solid black",
            "box-sizing": "border-box",
            color: "rgba(0,0,0,1.00)",
            display: "inline",
            font: '14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
            "list-style": "none",
            margin: "0px",
            padding: "0px",
            position: "relative",
            "text-align": "start",
            "text-decoration": "none",
            "white-space": "pre-wrap",
            "word-wrap": "break-word",
        }],
        ["twcss-flex", {
            "align-items": "stretch",
            "background-color": "rgba(0,0,0,0.00)",
            border: "0 solid black",
            "box-sizing": "border-box",
            display: "flex",
            "flex-basis": "auto",
            "flex-direction": "column",
            "flex-shrink": 0,
            "list-style": "none",
            margin: "0px",
            "min-height": "0px",
            "min-width": "0px",
            padding: "0px",
            position: "relative",
            "text-decoration": "none",
            "z-index": 0,
        }],
        ["font-tw", { "font-family": '"Segoe UI",Meiryo,system-ui,-apple-system,BlinkMacSystemFont,sans-serif' }],
        ["font-tw2", { "font-family": '"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif' }],
        ["transition-bgcolor-shadow", { "transition-property": "background-color, box-shadow" }],
        ["translate-negativehalf", { transform: "translateX(-50%) translateY(-50%)" }],
        ["webkit-box", { display: "-webkit-box" }],
        ["box-orient-vertical", { "-webkit-box-orient": "vertical" }],
        ["inset-shadow-light-tw", { "box-shadow": "0 0 2px rgba(0,0,0,0.03) inset" }],
        ["inset-shadow-dark-tw", { "box-shadow": "rgba(255,255,255,0.03) 0px 0px 2px inset" }],
    ],
    theme: {
        colors: {
            tw: {
                light: {
                    text: "rgba(15,20,25,1.00)",
                    text2: "rgba(83,100,113,1.00)",
                    border: "rgba(239,243,244,1.00)",
                },
                darkblue: {
                    text: "rgba(247,249,249,1.00)",
                    text2: "rgba(139,152,165,1.00)",
                    border: "rgba(56,68,77,1.00)",
                },
                dark: {
                    text: "rgba(231,233,234,1.00)",
                    text2: "rgba(113,118,123,1.00)",
                    border: "rgba(47,51,54,1.00)",
                },
                accsent: {
                    blue: "rgba(29,155,240,1.00)",
                },
                red: "rgba(244,33,46,1.00)",
            },
        },
    },
});
