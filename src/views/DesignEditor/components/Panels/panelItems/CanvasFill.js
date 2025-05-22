import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Block } from "baseui/block";
import Scrollable from "~/components/Scrollable";
import { HexColorPicker } from "react-colorful";
import { Delete } from "baseui/icon";
import { throttle } from "lodash";
import { useEditor } from "@layerhub-io/react";
const PRESET_COLORS = [
    "#f44336",
    "#ff9800",
    "#ffee58",
    "#66bb6a",
    "#26a69a",
    "#03a9f4",
    "#3f51b5",
    "#673ab7",
    "#9c27b0",
    "#ec407a",
    "#8d6e63",
    "#d9d9d9",
];
const CanvasFill = () => {
    const editor = useEditor();
    const updateCanvasBackground = throttle((color) => {
        editor.canvas.setBackgroundColor(color);
    }, 100);
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsx(Block, { children: "Canvas Fill" }), _jsx(Block, { "$style": { cursor: "pointer", display: "flex" }, children: _jsx(Delete, { size: 24 }) })] }), _jsx(Scrollable, { children: _jsxs(Block, { padding: "0 1.5rem", children: [_jsx(HexColorPicker, { onChange: updateCanvasBackground, style: { width: "100%" } }), _jsxs(Block, { children: [_jsx(Block, { "$style": { padding: "0.75rem 0", fontWeight: 500, fontSize: "14px" }, children: "Preset colors" }), _jsx(Block, { "$style": { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: "0.25rem" }, children: PRESET_COLORS.map((color, index) => (_jsx(Block, { "$style": {
                                            cursor: "pointer",
                                        }, onClick: () => updateCanvasBackground(color), backgroundColor: color, height: "38px" }, index))) })] })] }) })] }));
};
export default CanvasFill;
