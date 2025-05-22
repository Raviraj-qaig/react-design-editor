import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { styled } from "baseui";
import Icons from "~/components/Icons";
import { Button, KIND, SIZE } from "baseui/button";
import { useZoomRatio } from "@layerhub-io/react";
import { useTimer } from "@layerhub-io/use-timer";
import { Block } from "baseui/block";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
const Container = styled("div", ({ $theme }) => ({
    height: "50px",
    background: $theme.colors.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));
const Common = () => {
    const { time } = useTimer();
    const { maxTime } = useDesignEditorContext();
    const [options, setOptions] = React.useState({
        zoomRatio: 20,
    });
    const zoomRatio = useZoomRatio();
    React.useEffect(() => {
        setOptions({ ...options, zoomRatio: Math.round(zoomRatio * 100) });
    }, [zoomRatio]);
    return (_jsxs(Container, { children: [_jsxs(Block, { "$style": { display: "flex", fontWeight: 500, fontSize: "15px", alignItems: "center" }, children: [_jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, children: _jsx(Icons.Layers, { size: 20 }) }), _jsxs(Block, { children: [new Date(time).toISOString().slice(14, 19), " / ", new Date(maxTime).toISOString().slice(14, 19)] })] }), _jsxs(Block, { "$style": { display: "flex", alignItems: "center", justifyContent: "end" }, children: [_jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, children: options.zoomRatio }), _jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, children: _jsx(Icons.Refresh, { size: 16 }) }), _jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, children: _jsx(Icons.Undo, { size: 22 }) }), _jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, children: _jsx(Icons.Redo, { size: 22 }) }), _jsx(Button, { kind: KIND.tertiary, size: SIZE.compact, children: _jsx(Icons.TimePast, { size: 16 }) })] })] }));
};
export default Common;
