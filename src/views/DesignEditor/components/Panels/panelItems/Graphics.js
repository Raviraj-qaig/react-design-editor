import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button, SIZE } from "baseui/button";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import { vectors } from "~/constants/mock-data";
import { useEditor } from "@layerhub-io/react";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
const Graphics = () => {
    const inputFileRef = React.useRef(null);
    const editor = useEditor();
    const setIsSidebarOpen = useSetIsSidebarOpen();
    const addObject = React.useCallback((url) => {
        if (editor) {
            const options = {
                type: "StaticVector",
                src: url,
            };
            editor.objects.add(options);
        }
    }, [editor]);
    const handleDropFiles = (files) => {
        const file = files[0];
        const url = URL.createObjectURL(file);
        editor.objects.add({
            src: url,
            type: "StaticVector",
        });
    };
    const handleFileInput = (e) => {
        handleDropFiles(e.target.files);
    };
    const handleInputFileRefClick = () => {
        inputFileRef.current?.click();
    };
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsx(Block, { children: "Graphics" }), _jsx(Block, { onClick: () => setIsSidebarOpen(false), "$style": { cursor: "pointer", display: "flex" }, children: _jsx(AngleDoubleLeft, { size: 18 }) })] }), _jsx(Block, { padding: "0 1.5rem", children: _jsx(Button, { onClick: handleInputFileRefClick, size: SIZE.compact, overrides: {
                        Root: {
                            style: {
                                width: "100%",
                            },
                        },
                    }, children: "Computer" }) }), _jsxs(Scrollable, { children: [_jsx("input", { onChange: handleFileInput, type: "file", id: "file", ref: inputFileRef, style: { display: "none" } }), _jsx(Block, { children: _jsx(Block, { "$style": { display: "grid", gap: "8px", padding: "1.5rem", gridTemplateColumns: "1fr 1fr" }, children: vectors.map((vector, index) => (_jsx(GraphicItem, { onClick: () => addObject(vector), preview: vector }, index))) }) })] })] }));
};
const GraphicItem = ({ preview, onClick }) => {
    const [css] = useStyletron();
    return (_jsxs("div", { onClick: onClick, 
        // onClick={() => onClick(component.layers[0])}
        className: css({
            position: "relative",
            height: "84px",
            background: "#f8f8fb",
            cursor: "pointer",
            padding: "12px",
            borderRadius: "8px",
            overflow: "hidden",
            "::before:hover": {
                opacity: 1,
            },
        }), children: [_jsx("div", { className: css({
                    backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    height: "100%",
                    width: "100%",
                    ":hover": {
                        opacity: 1,
                    },
                }) }), _jsx("img", { src: preview, className: css({
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    pointerEvents: "none",
                    verticalAlign: "middle",
                }) })] }));
};
export default Graphics;
