import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useStyletron } from "baseui";
import Add from "~/components/Icons/Add";
import { DesignEditorContext } from "~/contexts/DesignEditor";
import { nanoid } from "nanoid";
import { getDefaultTemplate } from "~/constants/design-editor";
import { useEditor } from "@layerhub-io/react";
import { Block } from "baseui/block";
import { useTimer } from "@layerhub-io/use-timer";
import TimelineItems from "./TimelineItems";
import TimeMarker from "./TimeMarker";
import TimelineControl from "./TimelineControl";
import TimelineContextMenu from "./TimelineContextMenu";
import useContextMenuTimelineRequest from "~/hooks/useContextMenuTimelineRequest";
import { findSceneIndexByTime } from "~/views/DesignEditor/utils/scenes";
const Timeline = () => {
    const { time, setTime, status } = useTimer();
    const { setScenes, setCurrentScene, currentScene, scenes, setCurrentPreview, setCurrentDesign, currentDesign } = React.useContext(DesignEditorContext);
    const contextMenuTimelineRequest = useContextMenuTimelineRequest();
    const editor = useEditor();
    const [css] = useStyletron();
    React.useEffect(() => {
        let watcher = async () => {
            const updatedTemplate = editor.scene.exportToJSON();
            const updatedPreview = (await editor.renderer.render(updatedTemplate));
            setCurrentPreview(updatedPreview);
        };
        if (editor) {
            editor.on("history:changed", watcher);
        }
        return () => {
            if (editor) {
                editor.off("history:changed", watcher);
            }
        };
    }, [editor]);
    React.useEffect(() => {
        if (editor) {
            if (currentScene) {
                updateCurrentScene(currentScene);
            }
            else {
                const defaultTemplate = getDefaultTemplate({
                    width: 1920,
                    height: 1080,
                });
                editor.scene
                    .importFromJSON(defaultTemplate)
                    .then(() => {
                    // SET INITIAL DURATION
                    setCurrentDesign({
                        id: nanoid(),
                        frame: defaultTemplate.frame,
                        metadata: {},
                        name: "Untitled Design",
                        preview: "",
                        scenes: [],
                        type: "VIDEO",
                    });
                    const initialDesign = editor.scene.exportToJSON();
                    editor.renderer.render(initialDesign).then((data) => {
                        setCurrentScene({ ...initialDesign, preview: data, duration: 5000 });
                        setScenes([{ ...initialDesign, preview: data, duration: 5000 }]);
                    });
                })
                    .catch(console.log);
            }
        }
    }, [editor, currentScene]);
    const updateCurrentScene = React.useCallback(async (design) => {
        await editor.scene.importFromJSON(design);
        const updatedPreview = (await editor.renderer.render(design));
        setCurrentPreview(updatedPreview);
    }, [editor, currentScene]);
    const addScene = React.useCallback(async () => {
        setCurrentPreview("");
        const updatedTemplate = editor.scene.exportToJSON();
        const updatedPreview = await editor.renderer.render(updatedTemplate);
        const updatedPages = scenes.map((p) => {
            if (p.id === updatedTemplate.id) {
                return { ...updatedTemplate, preview: updatedPreview, duration: p.duration };
            }
            return p;
        });
        const maxTime = scenes.reduce(function (previousVal, currentValue) {
            return previousVal + currentValue.duration;
        }, 0);
        const defaultTemplate = getDefaultTemplate(currentDesign.frame);
        const newPreview = await editor.renderer.render(defaultTemplate);
        const newPage = {
            ...defaultTemplate,
            id: nanoid(),
            preview: newPreview,
            duration: 5000,
        };
        const newPages = [...updatedPages, newPage];
        setScenes(newPages);
        setTime(maxTime);
    }, [scenes, currentDesign]);
    const changePage = React.useCallback(async (page) => {
        setCurrentPreview("");
        if (editor) {
            const updatedTemplate = editor.scene.exportToJSON();
            const updatedPreview = await editor.renderer.render(updatedTemplate);
            const updatedPages = scenes.map((p) => {
                if (p.id === updatedTemplate.id) {
                    return { ...updatedTemplate, preview: updatedPreview, duration: p.duration };
                }
                return p;
            });
            setScenes(updatedPages);
            setCurrentScene(page);
        }
    }, [editor, scenes, currentScene]);
    React.useEffect(() => {
        if (editor && scenes && currentScene && status !== "RUNNING") {
            const currentSceneIndex = findSceneIndexByTime(scenes, time);
            const currentIndex = scenes.findIndex((page) => page.id === currentScene.id);
            if (currentSceneIndex !== currentIndex && scenes[currentSceneIndex]) {
                changePage(scenes[currentSceneIndex]);
            }
        }
    }, [editor, scenes, time, currentScene, status]);
    return (_jsxs(Block, { "$style": { display: "flex", alignItems: "center" }, children: [_jsx(TimelineControl, {}), _jsx(Block, { "$style": { background: "#ffffff" }, children: _jsxs("div", { className: css({ display: "flex", alignItems: "center" }), children: [_jsxs(Block, { id: "TimelineItemsContainer", "$style": { display: "flex", alignItems: "center", position: "relative", padding: "1rem 0", flex: 1 }, children: [contextMenuTimelineRequest.visible && _jsx(TimelineContextMenu, {}), _jsx(TimeMarker, {}), _jsx(TimelineItems, {})] }), _jsx(Block, { onClick: addScene, "$style": {
                                width: "100px",
                                height: "56px",
                                background: "rgb(243,244,246)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }, children: _jsx(Add, { size: 20 }) })] }) })] }));
};
export default Timeline;
