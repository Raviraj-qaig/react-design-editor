import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useActiveObject, useEditor } from "@layerhub-io/react";
// import getSelectionType from "~/utils/get-selection-type"
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import { ChevronDown } from "baseui/icon";
import Common from "./Common";
import TextColor from "~/components/Icons/TextColor";
import Bold from "~/components/Icons/Bold";
import Italic from "~/components/Icons/Italic";
import Underline from "~/components/Icons/Underline";
import TextAlignCenter from "~/components/Icons/TextAlignCenter";
import { Button, SIZE, KIND } from "baseui/button";
import { StatefulTooltip, PLACEMENT } from "baseui/tooltip";
import LetterCase from "~/components/Icons/LetterCase";
import Spacing from "~/components/Icons/Spacing";
import { StatefulPopover } from "baseui/popover";
import TextAlignJustify from "~/components/Icons/TextAlignJustify";
import TextAlignLeft from "~/components/Icons/TextAlignLeft";
import TextAlignRight from "~/components/Icons/TextAlignRight";
import { Slider } from "baseui/slider";
import useAppContext from "~/hooks/useAppContext";
import { FONT_SIZES, SAMPLE_FONTS } from "~/constants/editor";
import { getTextProperties } from "../../utils/text";
import { loadFonts } from "~/utils/fonts";
import Scrollbar from "@layerhub-io/react-custom-scrollbar";
const initialOptions = {
    family: "CoreLang",
    bold: false,
    italic: false,
    underline: false,
    color: "#00000",
    styleOptions: {
        hasBold: true,
        hasItalic: true,
        options: [],
    },
};
const Text = () => {
    const [state, setState] = React.useState(initialOptions);
    const activeObject = useActiveObject();
    const { setActiveSubMenu } = useAppContext();
    const editor = useEditor();
    React.useEffect(() => {
        if (activeObject && activeObject.type === "StaticText") {
            const textProperties = getTextProperties(activeObject, SAMPLE_FONTS);
            setState({ ...state, ...textProperties });
        }
    }, [activeObject]);
    React.useEffect(() => {
        let watcher = async () => {
            if (activeObject && activeObject.type === "StaticText") {
                const textProperties = getTextProperties(activeObject, SAMPLE_FONTS);
                setState({ ...state, ...textProperties });
            }
        };
        if (editor) {
            editor.on("history:changed", watcher);
        }
        return () => {
            if (editor) {
                editor.off("history:changed", watcher);
            }
        };
    }, [editor, activeObject]);
    const makeBold = React.useCallback(async () => {
        if (state.bold) {
            let desiredFont;
            if (state.italic) {
                // look for regular italic
                desiredFont = state.styleOptions.options.find((option) => {
                    const postscript_names = option.postscript_name.split("-");
                    return postscript_names[postscript_names.length - 1].match(/^Italic$/);
                });
            }
            else {
                // look for  regular
                desiredFont = state.styleOptions.options.find((option) => {
                    const postscript_names = option.postscript_name.split("-");
                    return postscript_names[postscript_names.length - 1].match(/^Regular$/);
                });
            }
            const font = {
                name: desiredFont.postscript_name,
                url: desiredFont.url,
            };
            await loadFonts([font]);
            editor.objects.update({
                fontFamily: desiredFont.postscript_name,
                fontURL: font.url,
            });
            setState({ ...state, bold: false });
        }
        else {
            let desiredFont;
            if (state.italic) {
                // look for bold italic
                desiredFont = state.styleOptions.options.find((option) => {
                    const postscript_names = option.postscript_name.split("-");
                    return postscript_names[postscript_names.length - 1].match(/^BoldItalic$/);
                });
            }
            else {
                // look for bold
                desiredFont = state.styleOptions.options.find((option) => {
                    const postscript_names = option.postscript_name.split("-");
                    return postscript_names[postscript_names.length - 1].match(/^Bold$/);
                });
            }
            const font = {
                name: desiredFont.postscript_name,
                url: desiredFont.url,
            };
            await loadFonts([font]);
            editor.objects.update({
                fontFamily: desiredFont.postscript_name,
                fontURL: font.url,
            });
            setState({ ...state, bold: true });
        }
    }, [editor, state]);
    const makeItalic = React.useCallback(async () => {
        if (state.italic) {
            let desiredFont;
            if (state.bold) {
                // Search bold regular
                desiredFont = state.styleOptions.options.find((option) => {
                    const postscript_names = option.postscript_name.split("-");
                    return postscript_names[postscript_names.length - 1].match(/^Bold$/);
                });
            }
            else {
                // Search regular
                desiredFont = state.styleOptions.options.find((option) => {
                    const postscript_names = option.postscript_name.split("-");
                    return postscript_names[postscript_names.length - 1].match(/^Regular$/);
                });
            }
            const font = {
                name: desiredFont.postscript_name,
                url: desiredFont.url,
            };
            await loadFonts([font]);
            editor.objects.update({
                fontFamily: desiredFont.postscript_name,
                fontURL: font.url,
            });
            setState({ ...state, italic: false });
        }
        else {
            let desiredFont;
            if (state.bold) {
                // search italic bold
                desiredFont = state.styleOptions.options.find((option) => {
                    const postscript_names = option.postscript_name.split("-");
                    return postscript_names[postscript_names.length - 1].match(/^BoldItalic$/);
                });
            }
            else {
                // search regular italic
                desiredFont = state.styleOptions.options.find((option) => {
                    const postscript_names = option.postscript_name.split("-");
                    return postscript_names[postscript_names.length - 1].match(/^Italic$/);
                });
            }
            const font = {
                name: desiredFont.postscript_name,
                url: desiredFont.url,
            };
            await loadFonts([font]);
            editor.objects.update({
                fontFamily: desiredFont.postscript_name,
                fontURL: font.url,
            });
            setState({ ...state, italic: true });
        }
    }, [editor, state]);
    const makeUnderline = React.useCallback(() => {
        editor.objects.update({
            underline: !state.underline,
        });
        setState({ ...state, underline: !state.underline });
    }, [editor, state]);
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", alignItems: "center", padding: "0 12px", justifyContent: "space-between" }, children: [_jsxs(Block, { display: "flex", gridGap: "0.5rem", alignItems: "center", children: [_jsxs(Block, { onClick: () => setActiveSubMenu("FontSelector"), "$style": {
                            border: "1px solid rgb(185,185,185)",
                            borderRadius: "4px",
                            padding: "0.2rem 0.45rem",
                            cursor: "pointer",
                            fontWeight: 500,
                            fontSize: "14px",
                            gap: "0.5rem",
                        }, height: "24px", display: "flex", alignItems: "center", children: [_jsx(Block, { children: state.family }), _jsx(Block, { display: "flex", children: _jsx(ChevronDown, { size: 22 }) })] }), _jsx(TextFontSize, {}), _jsxs(Block, { display: "flex", alignItems: "center", children: [_jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Text color", children: _jsx(Button, { onClick: () => setActiveSubMenu("TextFill"), size: SIZE.mini, kind: KIND.tertiary, children: _jsx(TextColor, { color: state.color, size: 22 }) }) }), _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Bold", children: _jsx(Button, { style: { ...(!state.bold && { color: "rgb(169,169,169)" }) }, disabled: !state.styleOptions.hasBold, onClick: makeBold, size: SIZE.mini, kind: KIND.tertiary, children: _jsx(Bold, { size: 20 }) }) }), _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Italic", children: _jsx(Button, { style: { ...(!state.italic && { color: "rgb(169,169,169)" }) }, disabled: !state.styleOptions.hasItalic, onClick: makeItalic, size: SIZE.mini, kind: KIND.tertiary, children: _jsx(Italic, { size: 20 }) }) }), _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Underline", children: _jsx(Button, { style: { ...(!state.underline && { color: "rgb(169,169,169)" }) }, onClick: makeUnderline, size: SIZE.mini, kind: KIND.tertiary, children: _jsx(Underline, { size: 24 }) }) }), _jsx(TextLetterCase, {}), _jsx(Block, { width: "1px", height: "24px", backgroundColor: "rgb(213,213,213)", margin: "0 4px" }), _jsx(TextAlign, {}), _jsx(Block, { width: "1px", height: "24px", backgroundColor: "rgb(213,213,213)", margin: "0 4px" }), _jsx(TextSpacing, {}), _jsx(Block, { width: "1px", height: "24px", backgroundColor: "rgb(213,213,213)", margin: "0 4px" }), _jsx(Button, { onClick: () => setActiveSubMenu("TextEffects"), size: SIZE.compact, kind: KIND.tertiary, children: "Effects" }), _jsx(Block, { width: "1px", height: "24px", backgroundColor: "rgb(213,213,213)", margin: "0 4px" }), _jsx(Button, { size: SIZE.compact, kind: KIND.tertiary, children: "Animate" })] })] }), _jsx(Common, {})] }));
};
const TextFontSize = () => {
    const editor = useEditor();
    const activeObject = useActiveObject();
    const [value, setValue] = React.useState(12);
    React.useEffect(() => {
        // @ts-ignore
        if (activeObject && activeObject.type === "StaticText") {
            // @ts-ignore
            setValue(activeObject.fontSize);
        }
    }, [activeObject]);
    const onChange = (size) => {
        editor.objects.update({ fontSize: size });
        setValue(size);
    };
    return (_jsx(StatefulPopover, { content: ({ close }) => (_jsx(Scrollbar, { style: { height: "320px", width: "90px" }, children: _jsx(Block, { backgroundColor: "#ffffff", padding: "10px 0", children: FONT_SIZES.map((size, index) => (_jsx(Block, { onClick: () => {
                        onChange(size);
                        close();
                    }, "$style": {
                        height: "32px",
                        fontSize: "14px",
                        cursor: "pointer",
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        ":hover": {
                            background: "rgb(243,243,243)",
                        },
                    }, children: size }, index))) }) })), children: _jsx(Block, { width: "80px", children: _jsx(Input, { value: value, onChange: (e) => onChange(e.target.value), endEnhancer: _jsx(ChevronDown, { size: 22 }), overrides: {
                    Input: {
                        style: {
                            backgroundColor: "#ffffff",
                            paddingRight: 0,
                            fontWeight: 500,
                            fontFamily: "Uber Move Text",
                            fontSize: "14px",
                        },
                    },
                    EndEnhancer: {
                        style: {
                            paddingRight: "8px",
                            paddingLeft: 0,
                            backgroundColor: "#ffffff",
                        },
                    },
                    Root: {
                        style: {
                            paddingRight: 0,
                            borderTopWidth: "1px",
                            borderBottomWidth: "1px",
                            borderRightWidth: "1px",
                            borderLeftWidth: "1px",
                            borderBottomColor: "rgb(185,185,185)",
                            borderTopColor: "rgb(185,185,185)",
                            borderRightColor: "rgb(185,185,185)",
                            borderLeftColor: "rgb(185,185,185)",
                            borderEndEndRadius: "4px",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                            borderStartEndRadius: "4px",
                            borderBottomLeftRadius: "4px",
                            backgroundColor: "#ffffff",
                        },
                    },
                }, type: "number", size: SIZE.mini }) }) }));
};
const TextLetterCase = () => {
    const [state, setState] = React.useState({ upper: false });
    const editor = useEditor();
    return (_jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Letter case", children: _jsx(Button, { onClick: () => {
                if (!state.upper) {
                    setState({ upper: true });
                    editor.objects.toUppercase();
                }
                else {
                    setState({ upper: false });
                    editor.objects.toLowerCase();
                }
            }, size: SIZE.mini, kind: KIND.tertiary, children: _jsx(LetterCase, { size: 24 }) }) }));
};
const TextSpacing = () => {
    const editor = useEditor();
    const activeObject = useActiveObject();
    const [state, setState] = React.useState({ charSpacing: 0, lineHeight: 0 });
    React.useEffect(() => {
        if (activeObject) {
            // @ts-ignore
            const { charSpacing, lineHeight } = activeObject;
            setState({ ...state, charSpacing: charSpacing / 10, lineHeight: lineHeight * 10 });
        }
    }, [activeObject]);
    const handleChange = (type, value) => {
        if (editor) {
            if (type === "charSpacing") {
                setState({ ...state, [type]: value[0] });
                // @ts-ignore
                editor.objects.update({
                    [type]: value[0] * 10,
                });
            }
            else {
                setState({ ...state, [type]: value[0] });
                // @ts-ignore
                editor.objects.update({
                    [type]: value[0] / 10,
                });
            }
        }
    };
    return (_jsx(StatefulPopover, { showArrow: true, placement: PLACEMENT.bottom, content: () => (_jsxs(Block, { padding: "12px", width: "200px", backgroundColor: "#ffffff", display: "grid", gridGap: "8px", children: [_jsxs(Block, { children: [_jsxs(Block, { "$style": { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [_jsx(Block, { "$style": { fontSize: "14px" }, children: "Line height" }), _jsx(Block, { width: "52px", children: _jsx(Input, { overrides: {
                                            Input: {
                                                style: {
                                                    backgroundColor: "#ffffff",
                                                    textAlign: "center",
                                                },
                                            },
                                            Root: {
                                                style: {
                                                    borderBottomColor: "rgba(0,0,0,0.15)",
                                                    borderTopColor: "rgba(0,0,0,0.15)",
                                                    borderRightColor: "rgba(0,0,0,0.15)",
                                                    borderLeftColor: "rgba(0,0,0,0.15)",
                                                    borderTopWidth: "1px",
                                                    borderBottomWidth: "1px",
                                                    borderRightWidth: "1px",
                                                    borderLeftWidth: "1px",
                                                    height: "26px",
                                                },
                                            },
                                            InputContainer: {},
                                        }, size: SIZE.mini, onChange: () => { }, value: Math.round(state.lineHeight) }) })] }), _jsx(Block, { children: _jsx(Slider, { overrides: {
                                    InnerThumb: () => null,
                                    ThumbValue: () => null,
                                    TickBar: () => null,
                                    Track: {
                                        style: {
                                            paddingRight: 0,
                                            paddingLeft: 0,
                                        },
                                    },
                                    Thumb: {
                                        style: {
                                            height: "12px",
                                            width: "12px",
                                        },
                                    },
                                }, min: 0, max: 100, 
                                // step
                                marks: false, value: [state.lineHeight], onChange: ({ value }) => handleChange("lineHeight", value) }) })] }), _jsxs(Block, { children: [_jsxs(Block, { "$style": { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [_jsx(Block, { "$style": { fontSize: "14px" }, children: "Char spacing" }), _jsx(Block, { width: "52px", children: _jsx(Input, { overrides: {
                                            Input: {
                                                style: {
                                                    backgroundColor: "#ffffff",
                                                    textAlign: "center",
                                                },
                                            },
                                            Root: {
                                                style: {
                                                    borderBottomColor: "rgba(0,0,0,0.15)",
                                                    borderTopColor: "rgba(0,0,0,0.15)",
                                                    borderRightColor: "rgba(0,0,0,0.15)",
                                                    borderLeftColor: "rgba(0,0,0,0.15)",
                                                    borderTopWidth: "1px",
                                                    borderBottomWidth: "1px",
                                                    borderRightWidth: "1px",
                                                    borderLeftWidth: "1px",
                                                    height: "26px",
                                                },
                                            },
                                            InputContainer: {},
                                        }, size: SIZE.mini, onChange: () => { }, value: Math.round(state.charSpacing) }) })] }), _jsx(Block, { children: _jsx(Slider, { overrides: {
                                    InnerThumb: () => null,
                                    ThumbValue: () => null,
                                    TickBar: () => null,
                                    Track: {
                                        style: {
                                            paddingRight: 0,
                                            paddingLeft: 0,
                                        },
                                    },
                                    Thumb: {
                                        style: {
                                            height: "12px",
                                            width: "12px",
                                        },
                                    },
                                }, min: -20, max: 100, marks: false, value: [state.charSpacing], onChange: ({ value }) => handleChange("charSpacing", value) }) })] })] })), children: _jsx(Block, { children: _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Spacing", children: _jsx(Button, { size: SIZE.mini, kind: KIND.tertiary, children: _jsx(Spacing, { size: 24 }) }) }) }) }));
};
const TEXT_ALIGNS = ["left", "center", "right", "justify"];
const TextAlign = () => {
    const editor = useEditor();
    const activeObject = useActiveObject();
    const [state, setState] = React.useState({ align: "left" });
    React.useEffect(() => {
        if (activeObject) {
            // @ts-ignore
            setState({ align: activeObject.textAlign });
        }
    }, [activeObject]);
    return (_jsx(StatefulPopover, { showArrow: true, placement: PLACEMENT.bottom, content: () => (_jsxs(Block, { padding: "12px", backgroundColor: "#ffffff", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridGap: "8px", children: [_jsx(Button, { isSelected: state.align === TEXT_ALIGNS[0], onClick: () => {
                        // @ts-ignore
                        editor.objects.update({ textAlign: TEXT_ALIGNS[0] });
                        setState({ align: TEXT_ALIGNS[0] });
                    }, kind: KIND.tertiary, size: SIZE.mini, children: _jsx(TextAlignLeft, { size: 24 }) }), _jsx(Button, { isSelected: state.align === TEXT_ALIGNS[1], onClick: () => {
                        // @ts-ignore
                        editor.objects.update({ textAlign: TEXT_ALIGNS[1] });
                        setState({ align: TEXT_ALIGNS[1] });
                    }, kind: KIND.tertiary, size: SIZE.mini, children: _jsx(TextAlignCenter, { size: 24 }) }), _jsx(Button, { isSelected: state.align === TEXT_ALIGNS[2], onClick: () => {
                        // @ts-ignore
                        editor.objects.update({ textAlign: TEXT_ALIGNS[2] });
                        setState({ align: TEXT_ALIGNS[2] });
                    }, kind: KIND.tertiary, size: SIZE.mini, children: _jsx(TextAlignRight, { size: 24 }) }), _jsx(Button, { isSelected: state.align === TEXT_ALIGNS[3], onClick: () => {
                        // @ts-ignore
                        editor.objects.update({ textAlign: TEXT_ALIGNS[3] });
                        setState({ align: TEXT_ALIGNS[3] });
                    }, kind: KIND.tertiary, size: SIZE.mini, children: _jsx(TextAlignJustify, { size: 24 }) })] })), returnFocus: true, autoFocus: true, children: _jsx(Block, { children: _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Align", children: _jsx(Button, { size: SIZE.mini, kind: KIND.tertiary, children: _jsx(TextAlignCenter, { size: 24 }) }) }) }) }));
};
export default Text;
