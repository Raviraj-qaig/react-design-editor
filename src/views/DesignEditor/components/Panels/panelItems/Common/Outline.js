import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Checkbox } from "baseui/checkbox";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { HexColorPicker } from "react-colorful";
import { Slider } from "baseui/slider";
import { Input } from "baseui/input";
import { useActiveObject, useEditor } from "@layerhub-io/react";
const Outline = () => {
    const editor = useEditor();
    const activeObject = useActiveObject();
    const [options, setOptions] = React.useState({
        enabled: true,
        stroke: "#000000",
        strokeWidth: 1,
    });
    React.useEffect(() => {
        if (activeObject) {
            updateOptions(activeObject);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeObject]);
    const updateOptions = (object) => {
        const { stroke, strokeWidth } = object;
        setOptions({ ...options, stroke, strokeWidth, enabled: !!strokeWidth });
    };
    const handleChange = (type, value) => {
        setOptions({ ...options, [type]: value });
        if (type === "enabled") {
            if (value) {
                editor.objects.update(options);
            }
            else {
                editor.objects.update({ strokeWidth: 0 });
            }
        }
        else {
            if (editor && options.enabled) {
                editor.objects.update({ [type]: value });
            }
        }
    };
    return (_jsxs("div", { style: { padding: "2rem 2rem 0" }, children: [_jsx("div", { children: _jsxs("div", { style: {
                        margin: "0 0 0.5rem",
                        fontSize: "14px",
                        background: "rgba(0,0,0,0.05)",
                        padding: "10px 8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx(Checkbox, { checked: options.enabled, onChange: (e) => handleChange("enabled", e.target.checked) }), "Outline"] }), _jsx(StatefulPopover, { placement: PLACEMENT.bottomLeft, content: _jsxs("div", { style: {
                                    padding: "1rem",
                                    background: "#ffffff",
                                    width: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    textAlign: "center",
                                }, children: [_jsx(HexColorPicker, { onChange: (color) => handleChange("stroke", color) }), _jsx(Input, { overrides: { Input: { style: { textAlign: "center" } } }, value: options.stroke, onChange: (e) => handleChange("color", e.target.value), placeholder: "#000000", clearOnEscape: true })] }), accessibilityType: "tooltip", children: _jsx("div", { children: _jsx("div", { style: {
                                        height: "28px",
                                        width: "28px",
                                        backgroundSize: "100% 100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        backgroundColor: options.stroke,
                                    } }) }) })] }) }), _jsx("div", { style: { height: "10px" } }), _jsx("div", { style: { padding: "0 8px" }, children: _jsxs("div", { children: [_jsx("div", { style: { fontSize: "14px" }, children: "Size" }), _jsx(Slider, { overrides: {
                                InnerThumb: () => null,
                                ThumbValue: () => null,
                                TickBar: () => null,
                                Thumb: {
                                    style: {
                                        height: "12px",
                                        width: "12px",
                                        paddingLeft: 0,
                                    },
                                },
                                Track: {
                                    style: {
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                    },
                                },
                            }, value: [options.strokeWidth], onChange: ({ value }) => handleChange("strokeWidth", value[0]) })] }) })] }));
};
export default Outline;
