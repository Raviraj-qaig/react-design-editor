import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Block } from "baseui/block";
import { Input } from "baseui/input";
import { Slider } from "baseui/slider";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import { Button, SIZE, KIND } from "baseui/button";
import OpacityIcon from "~/components/Icons/Opacity.";
const Opacity = () => {
    const editor = useEditor();
    const [state, setState] = React.useState({ opacity: 1 });
    const activeObject = useActiveObject();
    React.useEffect(() => {
        if (activeObject) {
            setState({ opacity: activeObject.opacity * 100 });
        }
    }, [activeObject]);
    const onChange = React.useCallback((value) => {
        setState({ opacity: value });
        editor.objects.update({ opacity: value / 100 });
    }, [editor]);
    return (_jsx(StatefulPopover, { placement: PLACEMENT.bottomLeft, content: () => (_jsxs(Block, { width: "200px", backgroundColor: "#ffffff", padding: "20px", children: [_jsxs(Block, { "$style": { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [_jsx(Block, { "$style": { fontSize: "14px" }, children: "Opacity" }), _jsx(Block, { width: "52px", children: _jsx(Input, { overrides: {
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
                                }, size: SIZE.mini, onChange: () => { }, value: Math.round(state.opacity) }) })] }), _jsx(Block, { children: _jsx(Slider, { overrides: {
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
                        }, min: 0, max: 100, marks: false, value: [state.opacity], 
                        // @ts-ignore
                        onChange: ({ value }) => onChange(value) }) })] })), children: _jsx(Button, { kind: KIND.tertiary, size: SIZE.mini, children: _jsx(OpacityIcon, { size: 24 }) }) }));
};
export default Opacity;
