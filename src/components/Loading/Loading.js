import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Loading({ text }) {
    return (_jsxs("div", { style: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        }, children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100px", height: "100px", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "30", cy: "50", fill: "#000", children: _jsx("animate", { attributeName: "r", values: "0;5;0", dur: "1.2s", repeatCount: "indefinite" }) }), _jsx("circle", { cx: "50", cy: "50", fill: "#000", children: _jsx("animate", { attributeName: "r", values: "0;5;0", dur: "1.2s", begin: "0.4s", repeatCount: "indefinite" }) }), _jsx("circle", { cx: "70", cy: "50", fill: "#000", children: _jsx("animate", { attributeName: "r", values: "0;5;0", dur: "1.2s", begin: "0.8s", repeatCount: "indefinite" }) })] }), text && text] }));
}
export default Loading;
