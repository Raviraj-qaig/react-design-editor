import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Block } from "baseui/block";
import { useEditor } from "@layerhub-io/react";
const Graphic = () => {
    const editor = useEditor();
    const [loading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({
        image: "",
    });
    const makePreview = React.useCallback(async () => {
        if (editor) {
            const template = editor.scene.exportToJSON();
            const image = (await editor.renderer.render(template));
            setState({ image });
            setLoading(false);
        }
    }, [editor]);
    React.useEffect(() => {
        makePreview();
    }, [editor]);
    return (_jsx(Block, { "$style": { flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem" }, children: !loading && _jsx("img", { width: "auto", height: "100%", src: state.image }) }));
};
export default Graphic;
