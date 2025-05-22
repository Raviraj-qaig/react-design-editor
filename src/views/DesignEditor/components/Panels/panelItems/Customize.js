import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { Button, SIZE } from "baseui/button";
import { HexColorPicker } from "react-colorful";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { Plus } from "baseui/icon";
import { Input } from "baseui/input";
import { useEditor, useFrame } from "@layerhub-io/react";
import { Modal, ROLE } from "baseui/modal";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import { sampleFrames } from "~/constants/editor";
import Scrollbar from "@layerhub-io/react-custom-scrollbar";
import SwapHorizontal from "~/components/Icons/SwapHorizontal";
import { Tabs, Tab } from "baseui/tabs";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
const colors = ["#ffffff", "#9B9B9B", "#4A4A4A", "#000000", "#A70C2C", "#DA9A15", "#F8E71D", "#47821A", "#4990E2"];
const Customize = () => {
    const editor = useEditor();
    const setIsSidebarOpen = useSetIsSidebarOpen();
    const [state, setState] = React.useState({
        backgroundColor: "#000000",
    });
    const changeBackgroundColor = (color) => {
        if (editor) {
            editor.frame.setBackgroundColor(color);
        }
    };
    const handleChange = (type, value) => {
        setState({ ...state, [type]: value });
        changeBackgroundColor(value);
    };
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsx(Block, { children: "Customize" }), _jsx(Block, { onClick: () => setIsSidebarOpen(false), "$style": { cursor: "pointer", display: "flex" }, children: _jsx(AngleDoubleLeft, { size: 18 }) })] }), _jsx(Scrollable, { children: _jsxs(Block, { padding: "0 1.5rem", children: [_jsx(Block, {}), _jsx(Block, { paddingTop: "0.5rem", children: _jsxs("div", { style: {
                                    background: "#fafafa",
                                    borderRadius: "8px",
                                    border: "1px solid #ececf5",
                                    padding: "0.45rem 1rem",
                                    fontSize: "14px",
                                }, children: [_jsx("div", { children: "Background color" }), _jsxs("div", { style: {
                                            display: "grid",
                                            gridTemplateColumns: "repeat(5, 1fr)",
                                            gap: "0.5rem",
                                            paddingTop: "0.25rem",
                                        }, children: [_jsx(StatefulPopover, { placement: PLACEMENT.bottomLeft, content: _jsxs("div", { style: {
                                                        padding: "1rem",
                                                        background: "#ffffff",
                                                        width: "200px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "1rem",
                                                        textAlign: "center",
                                                    }, children: [_jsx(HexColorPicker, { onChange: (v) => handleChange("backgroundColor", v) }), _jsx(Input, { overrides: { Input: { style: { textAlign: "center" } } }, value: state.backgroundColor, onChange: (e) => handleChange("backgroundColor", e.target.value), placeholder: "#000000", clearOnEscape: true })] }), accessibilityType: "tooltip", children: _jsx("div", { children: _jsx("div", { style: {
                                                            height: "40px",
                                                            width: "40px",
                                                            backgroundSize: "100% 100%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            cursor: "pointer",
                                                            backgroundImage: 'url("https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png")',
                                                        }, children: _jsx("div", { style: {
                                                                height: "32px",
                                                                width: "32px",
                                                                background: "#ffffff",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "1.3rem",
                                                            }, children: _jsx(Plus, { size: 24 }) }) }) }) }), colors.map((color) => (_jsx("div", { onClick: () => handleChange("backgroundColor", color), style: {
                                                    background: color,
                                                    borderRadius: "4px",
                                                    border: "1px solid #d7d8e3",
                                                    height: "34px",
                                                    cursor: "pointer",
                                                } }, color)))] })] }) })] }) })] }));
};
const ResizeTemplate = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeKey, setActiveKey] = React.useState("0");
    const { currentDesign, setCurrentDesign } = useDesignEditorContext();
    const editor = useEditor();
    const [desiredFrame, setDesiredFrame] = React.useState({
        width: 0,
        height: 0,
    });
    const [selectedFrame, setSelectedFrame] = React.useState({
        id: 0,
        width: 0,
        height: 0,
    });
    const frame = useFrame();
    React.useEffect(() => {
        if (frame) {
            setDesiredFrame({
                width: frame.width,
                height: frame.height,
            });
        }
    }, [frame]);
    const applyResize = () => {
        // @ts-ignore
        const size = activeKey === "0" ? selectedFrame : desiredFrame;
        if (editor) {
            editor.frame.resize({
                width: parseInt(size.width),
                height: parseInt(size.height),
            });
            setCurrentDesign({
                ...currentDesign,
                frame: {
                    width: parseInt(size.width),
                    height: parseInt(size.height),
                },
            });
        }
        setIsOpen(false);
    };
    const isEnabled = 
    // @ts-ignore
    (activeKey === "0" && selectedFrame.id !== 0) ||
        // @ts-ignore
        (activeKey === "1" && !!parseInt(desiredFrame.width) && !!parseInt(desiredFrame.height));
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setIsOpen(true), size: SIZE.compact, overrides: {
                    Root: {
                        style: {
                            width: "100%",
                        },
                    },
                }, children: "Resize template" }), _jsxs(Modal, { onClose: () => setIsOpen(false), closeable: true, isOpen: isOpen, animate: true, autoFocus: true, size: "auto", role: ROLE.dialog, overrides: {
                    Dialog: {
                        style: {
                            borderTopRightRadius: "8px",
                            borderEndStartRadius: "8px",
                            borderEndEndRadius: "8px",
                            borderStartEndRadius: "8px",
                            borderStartStartRadius: "8px",
                        },
                    },
                }, children: [_jsxs(Block, { "$style": { padding: "0 1.5rem", width: "640px" }, children: [_jsx(Block, { "$style": {
                                    padding: "2rem 1rem 1rem",
                                    textAlign: "center",
                                    fontWeight: 500,
                                }, children: "Choose a format and resize your template." }), _jsxs(Tabs, { overrides: {
                                    TabContent: {
                                        style: {
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                        },
                                    },
                                    TabBar: {
                                        style: {
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            backgroundColor: "#ffffff",
                                        },
                                    },
                                }, activeKey: activeKey, onChange: ({ activeKey }) => {
                                    setActiveKey(activeKey);
                                }, children: [_jsx(Tab, { title: "Preset size", children: _jsx(Block, { "$style": { width: "100%", height: "400px" }, children: _jsx(Scrollbar, { children: _jsx(Block, { "$style": { display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }, children: sampleFrames.map((sampleFrame, index) => (_jsxs(Block, { onClick: () => setSelectedFrame(sampleFrame), "$style": {
                                                            padding: "0.5rem",
                                                            backgroundColor: selectedFrame.id === sampleFrame.id ? "rgb(243,244,245)" : "#ffffff",
                                                            ":hover": {
                                                                backgroundColor: "rgb(246,247,248)",
                                                                cursor: "pointer",
                                                            },
                                                        }, children: [_jsx(Block, { "$style": {
                                                                    height: "120px",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }, children: _jsx("img", { src: sampleFrame.preview }) }), _jsxs(Block, { "$style": { fontSize: "13px", textAlign: "center" }, children: [_jsx(Block, { "$style": { fontWeight: 500 }, children: sampleFrame.name }), _jsxs(Block, { "$style": { color: "rgb(119,119,119)" }, children: [sampleFrame.width, " x ", sampleFrame.height, "px"] })] })] }, index))) }) }) }) }), _jsx(Tab, { title: "Custom size", children: _jsx(Block, { "$style": { padding: "2rem 2rem" }, children: _jsxs(Block, { "$style": { display: "grid", gridTemplateColumns: "1fr 50px 1fr", alignItems: "end", fontSize: "14px" }, children: [_jsx(Input, { onChange: (e) => setDesiredFrame({ ...desiredFrame, width: e.target.value }), value: desiredFrame.width, startEnhancer: "W", size: SIZE.compact }), _jsx(Button, { overrides: {
                                                            Root: {
                                                                style: {
                                                                    height: "32px",
                                                                },
                                                            },
                                                        }, size: SIZE.compact, kind: "tertiary", children: _jsx(SwapHorizontal, { size: 24 }) }), _jsx(Input, { onChange: (e) => setDesiredFrame({ ...desiredFrame, height: e.target.value }), value: desiredFrame.height, startEnhancer: "H", size: SIZE.compact })] }) }) })] })] }), _jsx(Block, { "$style": { display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "2rem" }, children: _jsx(Button, { disabled: !isEnabled, onClick: applyResize, style: { width: "190px" }, children: "Resize template" }) })] })] }));
};
export default Customize;
