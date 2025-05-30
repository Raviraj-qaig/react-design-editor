import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "~/components/Resizable";
import { Block } from "baseui/block";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import useDesignEditorScenes from "~/hooks/useDesignEditorScenes";
import { useTimer } from "@layerhub-io/use-timer";
const VerticalLine = ({ size }) => {
    return (_jsx("svg", { width: "3", height: "24", viewBox: "0 0 3 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.25 24C0.559644 24 0 23.8508 0 23.6667L0 0.333333C0 0.149238 0.559644 -7.15256e-07 1.25 -7.15256e-07C1.94036 -7.15256e-07 2.5 0.149238 2.5 0.333333L2.5 23.6667C2.5 23.8508 1.94036 24 1.25 24Z", fill: "white" }) }));
};
const RightHandle = ({ isHover, setControlHover }) => (_jsx("div", { onMouseEnter: () => setControlHover(true), onMouseLeave: () => setControlHover(false), style: {
        background: "rgba(0,0,0,0.25)",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isHover ? 1 : 0,
        cursor: "col-resize",
    }, children: _jsx(VerticalLine, { size: 24 }) }));
const TimelineItem = ({ item, makeResizeTimelineItem, width, preview, frame, duration, isCurrentScene }) => {
    const timeLineItemRef = React.useRef(null);
    const { setContextMenuTimelineRequest } = useDesignEditorContext();
    const [markerRefPosition, setMarkerRefPosition] = React.useState({ y: 0 });
    const { setTime } = useTimer();
    const scenes = useDesignEditorScenes();
    const [options, setOptions] = React.useState({
        isControlHover: false,
        isResizing: false,
        isItemHover: false,
    });
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: "#ffffff",
        cursor: "pointer",
    };
    const setControlHover = React.useCallback((isHover) => {
        setOptions({ ...options, isControlHover: isHover });
    }, [options]);
    const onMouseMoveItem = (evt) => {
        if (timeLineItemRef.current) {
            const position = evt.pageX - timeLineItemRef.current?.getBoundingClientRect().left;
            setMarkerRefPosition({ y: position });
        }
    };
    const refBoundingRect = timeLineItemRef.current?.getBoundingClientRect();
    const setTimeByMarker = React.useCallback((id, change) => {
        const currentIndex = scenes.findIndex((scn) => scn.id === id);
        if (currentIndex > -1) {
            const prevScenes = scenes.slice(0, currentIndex);
            const prevDuration = prevScenes.reduce(function (previousVal, currentValue) {
                return previousVal + currentValue.duration;
            }, 0);
            setTime(prevDuration + change);
        }
    }, [scenes]);
    React.useEffect(() => {
        const timeLineItemDiv = timeLineItemRef.current;
        const handleContextMenu = (event) => {
            event.preventDefault();
            setContextMenuTimelineRequest({
                id: item.id,
                left: event.pageX,
                top: event.pageY,
                visible: true,
            });
        };
        if (timeLineItemDiv) {
            timeLineItemDiv.addEventListener("contextmenu", handleContextMenu);
        }
        return () => {
            if (timeLineItemDiv) {
                timeLineItemDiv.removeEventListener("contextmenu", handleContextMenu);
            }
        };
    }, [timeLineItemRef, item]);
    return (_jsx(Resizable, { onResizeStart: () => setOptions({ ...options, isResizing: true }), onResizeStop: (e, direction, ref, d) => {
            setOptions({
                ...options,
                isResizing: false,
            });
            makeResizeTimelineItem(item.id, {
                width: width + d.width,
                height: 70 + d.height,
            });
        }, size: { width: width, height: 70 }, handleComponent: {
            right: _jsx(RightHandle, { setControlHover: setControlHover, isHover: options.isControlHover || options.isResizing }),
            left: _jsx(RightHandle, { setControlHover: setControlHover, isHover: options.isControlHover || options.isResizing }),
        }, children: _jsx("div", { ref: setNodeRef, style: style, ...attributes, ...listeners, children: _jsx("div", { onMouseMove: onMouseMoveItem, ref: timeLineItemRef, children: _jsxs("div", { onMouseEnter: () => setOptions({ ...options, isItemHover: true }), onMouseLeave: () => setOptions({ ...options, isItemHover: false, isControlHover: false }), style: {
                        background: "#ffffff",
                        height: 70,
                        borderRadius: "10px",
                    }, children: [_jsx(Block, { "$style": {
                                backgroundImage: `url(${preview})`,
                                backgroundSize: `${frame ? (frame.width * 70) / frame.height : 70}px 70px`,
                                backgroundRepeat: "repeat",
                                height: "70px",
                                border: isCurrentScene ? "2px solid #7158e2" : "2px solid rgba(0,0,0,.15)",
                            } }), options.isItemHover &&
                            refBoundingRect &&
                            markerRefPosition.y + 22 < refBoundingRect.width &&
                            markerRefPosition.y > 22 && (_jsx(Block, { onClick: () => {
                                setTimeByMarker(item.id, markerRefPosition.y * 40);
                            }, "$style": {
                                position: "absolute",
                                left: `${markerRefPosition.y}px`,
                                bottom: "0px",
                                height: "70px",
                                width: "2px",
                                backgroundColor: "#333333",
                                transform: "translate(0, -2px)",
                                cursor: "pointer",
                            } })), _jsxs(Block, { "$style": {
                                position: "absolute",
                                bottom: "4px",
                                left: "8px",
                                background: "rgba(0,0,0,0.65)",
                                color: "#fff",
                                fontSize: "10px",
                                borderRadius: "8px",
                                height: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0.15rem 0.35rem",
                            }, children: [(duration / 1000).toFixed(1), "s"] })] }) }) }) }));
};
export default TimelineItem;
