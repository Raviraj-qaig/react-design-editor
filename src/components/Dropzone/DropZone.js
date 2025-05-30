import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const DropZone = ({ children, handleDropFiles }) => {
    const [isDragging, setIsDragging] = useState(false);
    let dragCounter = 0;
    const dropRef = useRef(null);
    useEffect(() => {
        let div = dropRef.current;
        if (div) {
            div.addEventListener("dragenter", handleDragIn);
            div.addEventListener("dragleave", handleDragOut);
            div.addEventListener("dragover", handleDrag);
            div.addEventListener("drop", handleDrop);
        }
        return () => {
            if (div) {
                div.removeEventListener("dragenter", handleDragIn);
                div.removeEventListener("dragleave", handleDragOut);
                div.removeEventListener("dragover", handleDrag);
                div.removeEventListener("drop", handleDrop);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter++;
        if (e.dataTransfer && e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };
    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter--;
        if (dragCounter > 0)
            return;
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDropFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
            dragCounter = 0;
        }
    };
    return (_jsxs("div", { style: { display: "flex", height: "100%", position: "relative", flex: 1 }, ref: dropRef, children: [isDragging && (_jsx("div", { style: {
                    backgroundColor: "rgb(246, 246, 246)",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }, children: "Drop files here to upload..." })), children] }));
};
export default DropZone;
