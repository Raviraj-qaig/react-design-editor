import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import { Button, SIZE } from "baseui/button";
import DropZone from "~/components/Dropzone";
import { useEditor } from "@layerhub-io/react";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
import { nanoid } from "nanoid";
import { captureFrame, loadVideoResource } from "~/utils/video";
import { toBase64 } from "~/utils/data";
export default function () {
    const inputFileRef = React.useRef(null);
    const [uploads, setUploads] = React.useState([]);
    const editor = useEditor();
    const setIsSidebarOpen = useSetIsSidebarOpen();
    const handleDropFiles = async (files) => {
        const file = files[0];
        const isVideo = file.type.includes("video");
        const base64 = (await toBase64(file));
        let preview = base64;
        if (isVideo) {
            const video = await loadVideoResource(base64);
            const frame = await captureFrame(video);
            preview = frame;
        }
        const type = isVideo ? "StaticVideo" : "StaticImage";
        const upload = {
            id: nanoid(),
            src: base64,
            preview: preview,
            type: type,
        };
        setUploads([...uploads, upload]);
    };
    const handleInputFileRefClick = () => {
        inputFileRef.current?.click();
    };
    const handleFileInput = (e) => {
        handleDropFiles(e.target.files);
    };
    const addImageToCanvas = (props) => {
        editor.objects.add(props);
    };
    return (_jsx(DropZone, { handleDropFiles: handleDropFiles, children: _jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 500,
                        justifyContent: "space-between",
                        padding: "1.5rem",
                    }, children: [_jsx(Block, { children: "Uploads" }), _jsx(Block, { onClick: () => setIsSidebarOpen(false), "$style": { cursor: "pointer", display: "flex" }, children: _jsx(AngleDoubleLeft, { size: 18 }) })] }), _jsx(Scrollable, { children: _jsxs(Block, { padding: "0 1.5rem", children: [_jsx(Button, { onClick: handleInputFileRefClick, size: SIZE.compact, overrides: {
                                    Root: {
                                        style: {
                                            width: "100%",
                                        },
                                    },
                                }, children: "Computer" }), _jsx("input", { onChange: handleFileInput, type: "file", id: "file", ref: inputFileRef, style: { display: "none" } }), _jsx("div", { style: {
                                    marginTop: "1rem",
                                    display: "grid",
                                    gap: "0.5rem",
                                    gridTemplateColumns: "1fr 1fr",
                                }, children: uploads.map((upload) => (_jsx("div", { style: {
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }, onClick: () => addImageToCanvas(upload), children: _jsx("div", { children: _jsx("img", { width: "100%", src: upload.preview ? upload.preview : upload.url, alt: "preview" }) }) }, upload.id))) })] }) })] }) }));
}
