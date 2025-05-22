import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useEditor } from "@layerhub-io/react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import { graphics } from "~/constants/mock-data";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
const Elements = () => {
    const editor = useEditor();
    const setIsSidebarOpen = useSetIsSidebarOpen();
    const addObject = React.useCallback((item) => {
        if (editor) {
            editor.objects.add(item);
        }
    }, [editor]);
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsx(Block, { children: "Elements" }), _jsx(Block, { onClick: () => setIsSidebarOpen(false), "$style": { cursor: "pointer", display: "flex" }, children: _jsx(AngleDoubleLeft, { size: 18 }) })] }), _jsx(Scrollable, { children: _jsx(Block, { children: _jsx(Block, { "$style": { display: "grid", gap: "8px", padding: "1.5rem", gridTemplateColumns: "1fr 1fr 1fr 1fr" }, children: graphics.map((graphic, index) => (_jsx(ImageItem, { onClick: () => addObject(graphic), preview: graphic.preview }, index))) }) }) })] }));
};
const ImageItem = ({ preview, onClick }) => {
    const [css] = useStyletron();
    return (_jsx("div", { onClick: onClick, className: css({
            position: "relative",
            background: "#f8f8fb",
            cursor: "pointer",
            borderRadius: "8px",
            overflow: "hidden",
            ":hover": {
                opacity: 1,
                background: "rgb(233,233,233)",
            },
        }), children: _jsx("img", { src: preview, className: css({
                width: "100%",
                height: "100%",
                objectFit: "contain",
                pointerEvents: "none",
                verticalAlign: "middle",
            }) }) }));
};
export default Elements;
