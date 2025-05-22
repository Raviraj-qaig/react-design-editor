import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Block } from "baseui/block";
import useAppContext from "~/hooks/useAppContext";
import { useActiveObject, useEditor } from "@layerhub-io/react";
const Canvas = () => {
    const [state, setState] = React.useState({ fill: "#000000" });
    const { setActiveSubMenu } = useAppContext();
    const editor = useEditor();
    const activeObject = useActiveObject();
    React.useEffect(() => {
        if (editor) {
            setState({ fill: editor.canvas.backgroundColor });
        }
    }, [editor]);
    React.useEffect(() => {
        let watcher = async () => {
            setState({ fill: editor.canvas.backgroundColor });
        };
        if (editor) {
            editor.on("canvas:updated", watcher);
        }
        return () => {
            if (editor) {
                editor.off("canvas:updated", watcher);
            }
        };
    }, [editor, activeObject]);
    return (_jsx(Block, { "$style": {
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            justifyContent: "space-between",
        }, children: _jsx(Block, { "$style": {
                flex: 1,
                display: "flex",
                alignItems: "center",
            } }) }));
};
export default Canvas;
