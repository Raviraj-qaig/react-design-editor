import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Canvas as LayerhubCanvas } from "@layerhub-io/react";
import Playback from "../Playback";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import ContextMenu from "../ContextMenu";
const Canvas = () => {
    const { displayPlayback } = useDesignEditorContext();
    return (_jsxs("div", { style: { flex: 1, display: "flex", position: "relative" }, children: [displayPlayback && _jsx(Playback, {}), _jsx(ContextMenu, {}), _jsx(LayerhubCanvas, { config: {
                    size: {
                        width: 1920,
                        height: 1080,
                    },
                    background: "#f1f2f6",
                    controlsPosition: {
                        rotation: "BOTTOM",
                    },
                    shadow: {
                        blur: 4,
                        color: "#fcfcfc",
                        offsetX: 0,
                        offsetY: 0,
                    },
                } })] }));
};
export default Canvas;
