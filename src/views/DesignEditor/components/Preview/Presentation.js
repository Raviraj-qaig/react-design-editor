import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Block } from "baseui/block";
import useDesignEditorScenes from "~/hooks/useDesignEditorScenes";
import { Carousel } from "react-responsive-carousel";
import { useEditor } from "@layerhub-io/react";
import Loading from "~/components/Loading";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Presentation = () => {
    const [slides, setSlides] = React.useState([]);
    const scenes = useDesignEditorScenes();
    const editor = useEditor();
    const [loading, setLoading] = React.useState(true);
    const loadSlides = React.useCallback(async (scenes) => {
        const slides = [];
        for (const scene of scenes) {
            const preview = (await editor.renderer.render(scene));
            slides.push({
                id: scene.id,
                preview,
            });
        }
        setSlides(slides);
        setLoading(false);
    }, [editor]);
    React.useEffect(() => {
        if (scenes && editor) {
            const currentScene = editor.scene.exportToJSON();
            const updatedScenes = scenes.map((scene) => {
                if (scene.id === currentScene.id) {
                    return currentScene;
                }
                return scene;
            });
            loadSlides(updatedScenes);
        }
    }, [editor, scenes]);
    return (_jsx(Block, { "$style": {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            position: "relative",
        }, children: _jsx(Block, { "$style": { position: "absolute", maxWidth: "840px" }, children: loading ? (_jsx(Loading, {})) : (_jsx(Carousel, { showIndicators: false, showThumbs: false, useKeyboardArrows: true, showStatus: false, children: slides.map((page, index) => (_jsx("img", { width: "auto", height: "100%", src: page.preview }, index))) })) }) }));
};
export default Presentation;
