import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Block } from "baseui/block";
import { HexColorPicker } from "react-colorful";
import Common from "./Common";
import { useActiveObject } from "@layerhub-io/react";
import { groupBy } from "lodash";
import { PLACEMENT, StatefulPopover } from "baseui/popover";
import Flip from "./Shared/Flip";
const Vector = () => {
    const [state, setState] = React.useState({ colors: [], colorMap: {} });
    const vectorPaths = React.useRef({});
    const activeObject = useActiveObject();
    React.useEffect(() => {
        if (activeObject && activeObject.type === "StaticVector") {
            const objects = activeObject._objects[0]._objects;
            const objectColors = groupBy(objects, "fill");
            vectorPaths.current = objectColors;
            setState({ ...state, colors: Object.keys(objectColors), colorMap: activeObject.colorMap });
        }
    }, [activeObject]);
    const changeBackgroundColor = (prev, next) => {
        const objectRef = activeObject;
        objectRef.updateLayerColor(prev, next);
        setState({
            ...state,
            colorMap: {
                ...state.colorMap,
                [prev]: next,
            },
        });
    };
    return (_jsxs(Block, { "$style": {
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            justifyContent: "space-between",
        }, children: [_jsx(Block, { children: _jsxs(Block, { "$style": { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [_jsx(Block, { "$style": { display: "flex", alignItems: "center", gap: "0.5rem" }, children: Object.keys(state.colorMap).map((c, index) => {
                                return (_jsx(StatefulPopover, { placement: PLACEMENT.bottomLeft, content: _jsx("div", { style: {
                                            padding: "1rem",
                                            background: "#ffffff",
                                            width: "200px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "1rem",
                                            textAlign: "center",
                                        }, children: _jsx(HexColorPicker, { onChange: (color) => {
                                                changeBackgroundColor(c, color);
                                            } }) }), accessibilityType: "tooltip", children: _jsx("div", { children: _jsx("div", { style: {
                                                height: "24px",
                                                width: "24px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                backgroundColor: state.colorMap[c],
                                                border: "1px solid #dedede",
                                            } }) }) }, index));
                            }) }), _jsx(Flip, {})] }) }), _jsx(Common, {})] }));
};
export default Vector;
