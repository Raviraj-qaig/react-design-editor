import { jsx as _jsx } from "react/jsx-runtime";
import Scrollbars from "@layerhub-io/react-custom-scrollbar";
export default function ({ children, autoHide }) {
    return (_jsx("div", { style: { flex: 1, position: "relative" }, children: _jsx("div", { style: { height: "100%", width: "100%", position: "absolute", overflow: "hidden" }, children: _jsx(Scrollbars, { autoHide: autoHide, children: children }) }) }));
}
