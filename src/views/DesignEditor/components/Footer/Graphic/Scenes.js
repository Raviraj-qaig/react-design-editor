import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useStyletron } from "baseui";
import Add from "~/components/Icons/Add";
import useDesignEditorPages from "~/hooks/useDesignEditorScenes";
import { DesignEditorContext } from "~/contexts/DesignEditor";
import { nanoid } from "nanoid";
import { getDefaultTemplate } from "~/constants/design-editor";
import { useEditor, useFrame } from "@layerhub-io/react";
import { DndContext, closestCenter, PointerSensor, useSensor, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToFirstScrollableAncestor, restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import SceneItem from "./SceneItem";
import { Block } from "baseui/block";
import useContextMenuTimelineRequest from "~/hooks/useContextMenuTimelineRequest";
import SceneContextMenu from "./SceneContextMenu";
const Scenes = () => {
    const scenes = useDesignEditorPages();
    const { setScenes, setCurrentScene, currentScene, setCurrentDesign, currentDesign } = React.useContext(DesignEditorContext);
    const editor = useEditor();
    const [css] = useStyletron();
    const [currentPreview, setCurrentPreview] = React.useState("");
    const frame = useFrame();
    const [draggedScene, setDraggedScene] = React.useState(null);
    const contextMenuTimelineRequest = useContextMenuTimelineRequest();
    const sensors = [
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    ];
    React.useEffect(() => {
        if (editor && scenes && currentScene) {
            const isCurrentSceneLoaded = scenes.find((s) => s.id === currentScene?.id);
            if (!isCurrentSceneLoaded) {
                setCurrentScene(scenes[0]);
            }
        }
    }, [editor, scenes, currentScene]);
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
                setCurrentDesign({
                    id: nanoid(),
                    frame: defaultTemplate.frame,
                    metadata: {},
                    name: "Untitled Design",
                    preview: "",
                    scenes: [],
                    type: "PRESENTATION",
                });
                editor.scene
                    .importFromJSON(defaultTemplate)
                    .then(() => {
                    const initialDesign = editor.scene.exportToJSON();
                    editor.renderer.render(initialDesign).then((data) => {
                        setCurrentScene({ ...initialDesign, preview: data });
                        setScenes([{ ...initialDesign, preview: data }]);
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
                return { ...updatedTemplate, preview: updatedPreview };
            }
            return p;
        });
        const defaultTemplate = getDefaultTemplate(currentDesign.frame);
        const newPreview = await editor.renderer.render(defaultTemplate);
        const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview };
        const newPages = [...updatedPages, newPage];
        setScenes(newPages);
        setCurrentScene(newPage);
    }, [scenes, currentDesign]);
    const changePage = React.useCallback(async (page) => {
        setCurrentPreview("");
        if (editor) {
            const updatedTemplate = editor.scene.exportToJSON();
            const updatedPreview = await editor.renderer.render(updatedTemplate);
            const updatedPages = scenes.map((p) => {
                if (p.id === updatedTemplate.id) {
                    return { ...updatedTemplate, preview: updatedPreview };
                }
                return p;
            });
            setScenes(updatedPages);
            setCurrentScene(page);
        }
    }, [editor, scenes, currentScene]);
    const handleDragStart = (event) => {
        const draggedScene = scenes.find((s) => s.id === event.active.id);
        if (draggedScene) {
            setDraggedScene(draggedScene);
        }
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setScenes((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setDraggedScene(null);
    };
    return (_jsx(DndContext, { modifiers: [restrictToFirstScrollableAncestor, restrictToHorizontalAxis], sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, onDragStart: handleDragStart, children: _jsx(Block, { id: "TimelineItemsContainer", "$style": { padding: "0.25rem 0.75rem", background: "#ffffff", position: "relative" }, children: _jsxs("div", { className: css({ display: "flex", alignItems: "center" }), children: [contextMenuTimelineRequest.visible && _jsx(SceneContextMenu, {}), _jsxs(SortableContext, { items: scenes, strategy: horizontalListSortingStrategy, children: [scenes.map((page, index) => (_jsx(SceneItem, { isCurrentScene: page.id === currentScene?.id, scene: page, index: index, changePage: changePage, preview: currentPreview && page.id === currentScene?.id ? currentPreview : page.preview ? page.preview : "" }, index))), _jsx("div", { style: {
                                    background: "#ffffff",
                                    padding: "1rem 1rem 1rem 0.5rem",
                                }, children: _jsx("div", { onClick: addScene, className: css({
                                        width: "100px",
                                        height: "56px",
                                        background: "rgb(243,244,246)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                    }), children: _jsx(Add, { size: 20 }) }) })] }), _jsx(DragOverlay, { children: draggedScene ? (_jsx(Block, { "$style": {
                                backgroundImage: `url(${draggedScene.preview})`,
                                backgroundSize: `${frame ? (frame.width * 70) / frame.height : 70}px 70px`,
                                height: "80px",
                                opacity: 0.75,
                            } })) : null })] }) }) }));
};
export default Scenes;
