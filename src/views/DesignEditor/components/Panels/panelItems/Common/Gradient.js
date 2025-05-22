import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Checkbox } from "baseui/checkbox";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { HexColorPicker } from "react-colorful";
import { Slider } from "baseui/slider";
import { Input } from "baseui/input";
import { useActiveObject, useEditor } from "@layerhub-io/react";
const Gradient = () => {
    const editor = useEditor();
    const activeObject = useActiveObject();
    const [options, setOptions] = React.useState({
        angle: 0,
        colors: ["#24C6DC", "#514A9D"],
        enabled: false,
    });
    const handleChange = (key, value) => {
        setOptions({ ...options, [key]: value });
        if (key === "enabled") {
            if (value) {
                editor.objects.setGradient({ ...options, [key]: value });
            }
            else {
                editor.objects.update({
                    fill: "#000000",
                });
            }
        }
        else {
            if (options.enabled) {
                editor.objects.setGradient({ ...options, [key]: value });
            }
        }
    };
    const initialOptions = {
        angle: 0,
        colors: ["#24C6DC", "#514A9D"],
        enabled: false,
    };
    const getGradientOptions = (object) => {
        const isNotGradient = typeof object?.fill === "string" || object?.fill instanceof String;
        if (!isNotGradient) {
            const colorStops = object.fill.colorStops;
            const colors = [colorStops[0].color, colorStops[1].color];
            return {
                angle: 0,
                colors: colors,
                enabled: true,
            };
        }
        else {
            return initialOptions;
        }
    };
    React.useEffect(() => {
        if (activeObject) {
            const initialOptions = getGradientOptions(activeObject);
            setOptions({ ...options, ...initialOptions });
        }
    }, [activeObject]);
    const handleGradientColorChange = (index, color) => {
        const updatedColors = [...options.colors];
        updatedColors[index] = color;
        handleChange("colors", updatedColors);
    };
    return (_jsxs("div", { style: { padding: "2rem 2rem 0" }, children: [_jsx("div", { children: _jsxs("div", { style: {
                        margin: "0 0 0.5rem",
                        fontSize: "14px",
                        background: "rgba(0,0,0,0.05)",
                        padding: "10px 8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx(Checkbox, { checked: options.enabled, onChange: (e) => handleChange("enabled", e.target.checked) }), "Gradient"] }), _jsx("div", { children: _jsx("div", { style: {
                                    height: "28px",
                                    width: "28px",
                                    backgroundSize: "100% 100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    background: `linear-gradient(${options.angle + 90}deg, ${options.colors[0]}, ${options.colors[1]})`,
                                } }) })] }) }), _jsx("div", { style: { height: "10px" } }), _jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }, children: [_jsx("div", { style: { fontSize: "14px" }, children: "Colors" }), _jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [_jsx(StatefulPopover, { placement: PLACEMENT.bottomLeft, content: _jsxs("div", { style: {
                                        padding: "1rem",
                                        background: "#ffffff",
                                        width: "200px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                        textAlign: "center",
                                    }, children: [_jsx(HexColorPicker, { onChange: (color) => handleGradientColorChange(0, color) }), _jsx(Input, { overrides: { Input: { style: { textAlign: "center" } } }, value: options.colors[0], onChange: (e) => handleGradientColorChange(0, e.target.value), placeholder: "#000000", clearOnEscape: true })] }), accessibilityType: "tooltip", children: _jsx("div", { children: _jsx("div", { style: {
                                            height: "28px",
                                            width: "28px",
                                            backgroundSize: "100% 100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            backgroundColor: options.colors[0],
                                        } }) }) }), _jsx(StatefulPopover, { placement: PLACEMENT.bottomLeft, content: _jsxs("div", { style: {
                                        padding: "1rem",
                                        background: "#ffffff",
                                        width: "200px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                        textAlign: "center",
                                    }, children: [_jsx(HexColorPicker, { onChange: (color) => handleGradientColorChange(1, color) }), _jsx(Input, { overrides: { Input: { style: { textAlign: "center" } } }, value: options.colors[1], onChange: (e) => handleGradientColorChange(1, e.target.value), placeholder: "#000000", clearOnEscape: true })] }), accessibilityType: "tooltip", children: _jsx("div", { children: _jsx("div", { style: {
                                            height: "28px",
                                            width: "28px",
                                            backgroundSize: "100% 100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            backgroundColor: options.colors[1],
                                        } }) }) })] })] }), _jsx("div", { style: { height: "10px" } }), _jsx("div", { style: { padding: "0 8px" }, children: _jsxs("div", { children: [_jsx("div", { style: { fontSize: "14px" }, children: "Direction" }), _jsx(Slider, { overrides: {
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
                            }, max: 360, value: [options.angle], onChange: ({ value }) => handleChange("angle", value[0]) })] }) })] }));
};
export default Gradient;
