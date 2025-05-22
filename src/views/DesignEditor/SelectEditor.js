import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import Video from "~/components/Icons/Video";
import Images from "~/components/Icons/Images";
import Presentation from "~/components/Icons/Presentation";
const SelectEditor = () => {
    const [selectedEditor, setSelectedEditor] = React.useState("GRAPHIC");
    const { setEditorType } = useDesignEditorContext();
    return (_jsx(Block, { "$style": {
            height: "100vh",
            width: "100vw",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }, children: _jsxs(Block, { children: [_jsxs(Block, { "$style": {
                        display: "flex",
                        gap: "2rem",
                    }, children: [_jsxs(Block, { onClick: () => setSelectedEditor("GRAPHIC"), "$style": {
                                height: "180px",
                                width: "180px",
                                background: selectedEditor === "GRAPHIC" ? "#000000" : "rgb(231, 236, 239)",
                                color: selectedEditor === "GRAPHIC" ? "#ffffff" : "#333333",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }, children: [_jsx(Images, { size: 34 }), _jsx(Block, { children: "Graphic" })] }), _jsxs(Block, { onClick: () => setSelectedEditor("PRESENTATION"), "$style": {
                                height: "180px",
                                width: "180px",
                                background: selectedEditor === "PRESENTATION" ? "#000000" : "rgb(231, 236, 239)",
                                color: selectedEditor === "PRESENTATION" ? "#ffffff" : "#333333",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }, children: [_jsx(Presentation, { size: 36 }), _jsx(Block, { children: "Presentation" })] }), _jsxs(Block, { onClick: () => setSelectedEditor("VIDEO"), "$style": {
                                height: "180px",
                                width: "180px",
                                background: selectedEditor === "VIDEO" ? "#000000" : "rgb(231, 236, 239)",
                                color: selectedEditor === "VIDEO" ? "#ffffff" : "#333333",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }, children: [_jsx(Video, { size: 36 }), _jsx(Block, { children: "Video" })] })] }), _jsx(Block, { "$style": { display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }, children: _jsx(Button, { style: { width: "180px" }, onClick: () => setEditorType(selectedEditor), children: "Continue" }) })] }) }));
};
export default SelectEditor;
