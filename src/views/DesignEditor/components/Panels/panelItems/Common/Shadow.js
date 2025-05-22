import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Checkbox } from "baseui/checkbox";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { HexColorPicker } from "react-colorful";
import { Slider } from "baseui/slider";
import { Input } from "baseui/input";
import { useActiveObject, useEditor } from "@layerhub-io/react";
const Shadow = () => {
    const editor = useEditor();
    const [options, setOptions] = React.useState({
        enabled: false,
        offsetX: 15,
        offsetY: 15,
        blur: 25,
        color: "rgba(0,0,0,0.45)",
    });
    const activeObject = useActiveObject();
    React.useEffect(() => {
        if (activeObject) {
            updateOptions(activeObject);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeObject]);
    const updateOptions = (object) => {
        if (object.shadow) {
            const { blur, color, enabled, offsetX, offsetY } = object.shadow;
            setOptions({ ...options, blur, color, enabled, offsetX, offsetY });
            //   if (enabled) {
            //     setOpenItems([0])
            //   }
        }
    };
    const handleChange = (key, value) => {
        setOptions({ ...options, [key]: value });
        if (editor) {
            console.log({ ...options, [key]: value });
            editor.objects.setShadow({ ...options, [key]: value });
        }
    };
    return (_jsxs("div", { style: { padding: "0 1.5rem" }, children: [_jsxs("div", { style: {
                    margin: "1rem 0 0.5rem",
                    fontSize: "14px",
                    background: "rgba(0,0,0,0.05)",
                    padding: "10px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.2rem" }, children: [_jsx(Checkbox, { checked: options.enabled, 
                                // @ts-ignore
                                onChange: (e) => handleChange("enabled", e.target.checked) }), "Shadow"] }), _jsx(StatefulPopover, { placement: PLACEMENT.bottomLeft, content: _jsxs("div", { style: {
                                padding: "1rem",
                                background: "#ffffff",
                                width: "200px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                textAlign: "center",
                            }, children: [_jsx(HexColorPicker, { onChange: (color) => handleChange("color", color) }), _jsx(Input, { overrides: { Input: { style: { textAlign: "center" } } }, value: options.color, onChange: (e) => handleChange("color", e.target.value), placeholder: "#000000", clearOnEscape: true })] }), accessibilityType: "tooltip", children: _jsx("div", { children: _jsx("div", { style: {
                                    height: "28px",
                                    width: "28px",
                                    backgroundSize: "100% 100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    backgroundColor: options.color,
                                } }) }) })] }), _jsx("div", { style: { height: "10px" } }), _jsx("div", { style: { padding: "0 8px" }, children: _jsxs("div", { children: [_jsx("div", { style: { fontSize: "14px" }, children: "Blur" }), _jsx(Slider, { overrides: {
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
                            }, value: [options.blur], onChange: ({ value }) => handleChange("blur", value) })] }) }), _jsxs("div", { children: [_jsx("div", { style: { height: "10px" } }), _jsxs("div", { style: { padding: "0 8px" }, children: [_jsx("div", { style: { fontSize: "14px" }, children: "Offset Y" }), _jsx(Slider, { overrides: {
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
                                }, value: [options.offsetY], onChange: ({ value }) => handleChange("offsetY", value) })] }), _jsx("div", { style: { padding: "0 8px" }, children: _jsxs("div", { children: [_jsx("div", { style: { fontSize: "14px" }, children: "Offset X" }), _jsx(Slider, { overrides: {
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
                                    }, value: [options.offsetX], onChange: ({ value }) => handleChange("offsetX", value) })] }) })] })] }));
};
export default Shadow;
