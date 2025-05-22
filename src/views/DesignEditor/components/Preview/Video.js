import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Block } from "baseui/block";
import ReactPlayer from "react-player";
import { useEditor } from "@layerhub-io/react";
import Loading from "~/components/Loading";
import useDesignEditorPages from "~/hooks/useDesignEditorScenes";
const Video = () => {
    const editor = useEditor();
    const pages = useDesignEditorPages();
    const [loading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({
        video: "",
    });
    const makePreview = React.useCallback(async () => {
        const template = editor.scene.exportToJSON();
        const clips = pages.map((page) => {
            const currentTemplate = editor.scene.exportToJSON();
            if (page.id === currentTemplate.id) {
                return {
                    duration: page.duration / 1000,
                    layers: currentTemplate.layers,
                };
            }
            return {
                duration: 5,
                layers: page.layers,
            };
        });
        const options = {
            outPath: "./position.mp4",
            verbose: false,
            duration: 5,
            fps: 25,
            dimension: template.frame,
            clips: clips,
        };
        fetch("https://render.layerhub.io/render", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(options),
        })
            .then((res) => {
            return res.json();
        })
            .then((res) => {
            setState({ video: res.url });
            setLoading(false);
        })
            .catch((err) => console.error(err));
    }, [editor]);
    React.useEffect(() => {
        makePreview();
    }, [editor]);
    return (_jsx(Block, { "$style": { flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem" }, children: loading ? (_jsx(Loading, { text: "Generating preview" })) : (_jsx(ReactPlayer, { muted: false, className: "react-player", width: "100%", height: "100%", controls: true, autoPlay: true, url: state.video })) }));
};
export default Video;
