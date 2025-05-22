import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { styled } from "baseui";
import Icons from "~/components/Icons";
import { Button, KIND, SIZE } from "baseui/button";
import { Slider } from "baseui/slider";
import { Input } from "baseui/input";
import { useEditor, useZoomRatio } from "@layerhub-io/react";
const Container = styled("div", ({ $theme }) => ({
    height: "50px",
    background: $theme.colors.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));
const Common = () => {
    const zoomMin = 10;
    const zoomMax = 240;
    const [options, setOptions] = React.useState({ zoomRatio: 20 });
    const editor = useEditor();
    const zoomRatio = useZoomRatio();
    React.useEffect(() => {
        if (!editor)
            return;
        setOptions((prev) => ({
            ...prev,
            zoomRatio: Math.round(zoomRatio * 100),
        }));
    }, [zoomRatio, editor]);
    const handleChange = (type, value) => {
        const zoom = Math.max(zoomMin, Math.min(zoomMax, Number(value)));
        editor.zoom.zoomToRatio(zoom / 100);
    };
    const handleUndo = () => {
        if (editor && editor.history) {
            editor.history.undo();
        }
    };
    const handleRedo = () => {
        if (editor && editor.history) {
            editor.history.redo();
        }
    };
    return (_jsxs(Container, { children: [_jsx("div", {}), _jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center" }, children: [_jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, children: _jsx(Icons.Expand, { size: 16 }) }), _jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, children: _jsx(Icons.Compress, { size: 16 }) }), _jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, onClick: () => editor.zoom.zoomOut(), children: _jsx(Icons.RemoveCircleOutline, { size: 24 }) }), _jsx(Slider, { overrides: {
                            InnerThumb: () => null,
                            ThumbValue: () => null,
                            TickBar: () => null,
                            Root: { style: { width: "140px" } },
                            Thumb: { style: { height: "12px", width: "12px", paddingLeft: 0 } },
                            Track: { style: { paddingLeft: 0, paddingRight: 0 } },
                        }, value: [options.zoomRatio], onChange: ({ value }) => handleChange("zoomRatio", value[0]), min: zoomMin, max: zoomMax }), _jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, onClick: () => editor.zoom.zoomIn(), children: _jsx(Icons.AddCircleOutline, { size: 24 }) }), _jsx(Input, { type: "number", value: options.zoomRatio, endEnhancer: "%", overrides: {
                            Root: {
                                style: {
                                    width: "96px",
                                },
                            },
                        }, size: SIZE.mini, max: zoomMax, min: zoomMin, onChange: (e) => handleChange("zoomRatio", e.target.value) })] }), _jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "end" }, children: [_jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, onClick: handleUndo, children: _jsx(Icons.Undo, { size: 22 }) }), _jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, onClick: handleRedo, children: _jsx(Icons.Redo, { size: 22 }) })] })] }));
};
export default Common;
