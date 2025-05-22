import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useEditor, useObjects } from "@layerhub-io/react";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import Locked from "~/components/Icons/Locked";
import Unlocked from "~/components/Icons/Unlocked";
import Eye from "~/components/Icons/Eye";
import EyeCrossed from "~/components/Icons/EyeCrossed";
import Delete from "~/components/Icons/Delete";
import { Button, KIND, SIZE } from "baseui/button";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
const Layers = () => {
    const editor = useEditor();
    const objects = useObjects();
    const [layerObjects, setLayerObjects] = React.useState([]);
    const setIsSidebarOpen = useSetIsSidebarOpen();
    React.useEffect(() => {
        if (objects) {
            setLayerObjects(objects);
        }
    }, [objects]);
    React.useEffect(() => {
        let watcher = async () => {
            if (objects) {
                setLayerObjects([...objects]);
            }
        };
        if (editor) {
            editor.on("history:changed", watcher);
        }
        return () => {
            if (editor) {
                editor.off("history:changed", watcher);
            }
        };
    }, [editor, objects]);
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsx(Block, { children: "Layers" }), _jsx(Block, { onClick: () => setIsSidebarOpen(false), "$style": { cursor: "pointer", display: "flex" }, children: _jsx(AngleDoubleLeft, { size: 18 }) })] }), _jsx(Scrollable, { children: _jsx(Block, { padding: "0 1.5rem", children: layerObjects.map((object) => (_jsxs(Block, { "$style": {
                            display: "grid",
                            gridTemplateColumns: "1fr 90px",
                            fontSize: "14px",
                            alignItems: "center",
                            ":hover": {
                                background: "rgb(245,246,247)",
                            },
                        }, children: [_jsx(Block, { "$style": { cursor: "pointer" }, onClick: () => editor.objects.select(object.id), children: object.name }), _jsxs(Block, { "$style": { display: "flex", alignItems: "center", justifyContent: "flex-end" }, children: [object.locked ? (_jsx(Button, { kind: KIND.tertiary, size: SIZE.mini, onClick: () => editor.objects.unlock(object.id), overrides: {
                                            Root: {
                                                style: {
                                                    paddingLeft: "4px",
                                                    paddingRight: "4px",
                                                },
                                            },
                                        }, children: _jsx(Locked, { size: 24 }) })) : (_jsx(Button, { kind: KIND.tertiary, size: SIZE.mini, onClick: () => editor.objects.lock(object.id), overrides: {
                                            Root: {
                                                style: {
                                                    paddingLeft: "4px",
                                                    paddingRight: "4px",
                                                },
                                            },
                                        }, children: _jsx(Unlocked, { size: 24 }) })), object.visible ? (_jsx(Button, { kind: KIND.tertiary, size: SIZE.mini, onClick: () => editor.objects.update({ visible: false }, object.id), overrides: {
                                            Root: {
                                                style: {
                                                    paddingLeft: "4px",
                                                    paddingRight: "4px",
                                                },
                                            },
                                        }, children: _jsx(Eye, { size: 24 }) })) : (_jsx(Button, { kind: KIND.tertiary, size: SIZE.mini, onClick: () => editor.objects.update({ visible: true }, object.id), overrides: {
                                            Root: {
                                                style: {
                                                    paddingLeft: "4px",
                                                    paddingRight: "4px",
                                                },
                                            },
                                        }, children: _jsx(EyeCrossed, { size: 24 }) })), _jsx(Button, { kind: KIND.tertiary, size: SIZE.mini, onClick: () => editor.objects.remove(object.id), overrides: {
                                            Root: {
                                                style: {
                                                    paddingLeft: "4px",
                                                    paddingRight: "4px",
                                                },
                                            },
                                        }, children: _jsx(Delete, { size: 24 }) })] })] }, object.id))) }) })] }));
};
export default Layers;
