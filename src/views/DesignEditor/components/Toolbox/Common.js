import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Button, SIZE, KIND } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { Block } from "baseui/block";
import { StatefulTooltip, PLACEMENT } from "baseui/tooltip";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import { StatefulPopover } from "baseui/popover";
import DeleteIcon from "~/components/Icons/Delete";
import UnlockedIcon from "~/components/Icons/Unlocked";
import LockedIcon from "~/components/Icons/Locked";
import DuplicateIcon from "~/components/Icons/Duplicate";
import LayersIcon from "~/components/Icons/Layers";
import AlignCenter from "~/components/Icons/AlignCenter";
import AlignLeft from "~/components/Icons/AlignLeft";
import AlignRight from "~/components/Icons/AlignRight";
import AlignTop from "~/components/Icons/AlignTop";
import AlignMiddle from "~/components/Icons/AlignMiddle";
import BringToFront from "~/components/Icons/BringToFront";
import SendToBack from "~/components/Icons/SendToBack";
import AlignBottom from "~/components/Icons/AlignBottom";
import Opacity from "./Shared/Opacity";
const Common = () => {
    const [state, setState] = React.useState({ isGroup: false, isMultiple: false });
    const activeObject = useActiveObject();
    const editor = useEditor();
    React.useEffect(() => {
        if (activeObject) {
            setState({ isGroup: activeObject.type === "group", isMultiple: activeObject.type === "activeSelection" });
        }
    }, [activeObject]);
    React.useEffect(() => {
        let watcher = async () => {
            if (activeObject) {
                // @ts-ignore
                setState({ isGroup: activeObject.type === "group", isMultiple: activeObject.type === "activeSelection" });
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
    }, [editor, activeObject]);
    return (_jsxs(Block, { "$style": { display: "flex", alignItems: "center" }, children: [state.isGroup ? (_jsx(Button, { onClick: () => {
                    editor.objects.ungroup();
                    setState({ ...state, isGroup: false });
                }, size: SIZE.compact, kind: KIND.tertiary, children: "Ungroup" })) : state.isMultiple ? (_jsx(Button, { onClick: () => {
                    editor.objects.group();
                    setState({ ...state, isGroup: true });
                }, size: SIZE.compact, kind: KIND.tertiary, children: "Group" })) : null, (state.isGroup || !state.isMultiple) && _jsx(CommonLayers, {}), _jsx(CommonAlign, {}), _jsx(Opacity, {}), _jsx(LockUnlock, {}), _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Duplicate", children: _jsx(Button, { onClick: () => editor.objects.clone(), size: SIZE.mini, kind: KIND.tertiary, children: _jsx(DuplicateIcon, { size: 22 }) }) }), _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Delete", children: _jsx(Button, { onClick: () => editor.objects.remove(), size: SIZE.mini, kind: KIND.tertiary, children: _jsx(DeleteIcon, { size: 24 }) }) })] }));
};
const CommonLayers = () => {
    const editor = useEditor();
    const [checked, setChecked] = React.useState(true);
    const activeObject = useActiveObject();
    React.useEffect(() => {
        if (activeObject) {
            //  @ts-ignore
            setChecked(!!activeObject.clipPath);
        }
    }, [activeObject]);
    return (_jsx(StatefulPopover, { placement: PLACEMENT.bottomRight, content: () => (_jsxs(Block, { padding: "12px", backgroundColor: "#ffffff", children: [_jsxs(Block, { display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "8px", children: [_jsx(Button, { startEnhancer: _jsx(BringToFront, { size: 24 }), onClick: () => editor.objects.bringToFront(), kind: KIND.tertiary, size: SIZE.mini, children: "Bring to front" }), _jsx(Button, { startEnhancer: _jsx(SendToBack, { size: 24 }), onClick: () => editor.objects.sendToBack(), kind: KIND.tertiary, size: SIZE.mini, children: "Send to back" })] }), _jsxs(Block, { "$style": {
                        display: "flex",
                        fontSize: "12px",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontWeight: 500,
                        fontFamily: "system-ui,",
                        padding: "0.5rem 0.5rem",
                        cursor: "pointer",
                        ":hover": {
                            background: "rgb(244,245,246)",
                        },
                    }, children: [_jsx(Checkbox, { overrides: {
                                Checkmark: {
                                    style: {
                                        height: "16px",
                                        width: "16px",
                                    },
                                },
                            }, checked: checked, onChange: () => {
                                editor.objects.update({ clipToFrame: !checked });
                                setChecked(!checked);
                            } }), _jsx(Block, { children: "Clip to frame" })] })] })), returnFocus: true, autoFocus: true, children: _jsx(Block, { children: _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Layers", children: _jsx(Button, { size: SIZE.mini, kind: KIND.tertiary, children: _jsx(LayersIcon, { size: 19 }) }) }) }) }));
};
const CommonAlign = () => {
    const editor = useEditor();
    return (_jsx(StatefulPopover, { placement: PLACEMENT.bottomRight, content: () => (_jsxs(Block, { padding: "12px", backgroundColor: "#ffffff", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridGap: "8px", children: [_jsx(Button, { onClick: () => editor.objects.alignLeft(), kind: KIND.tertiary, size: SIZE.mini, children: _jsx(AlignLeft, { size: 24 }) }), _jsx(Button, { onClick: () => editor.objects.alignCenter(), kind: KIND.tertiary, size: SIZE.mini, children: _jsx(AlignCenter, { size: 24 }) }), _jsx(Button, { onClick: () => editor.objects.alignRight(), kind: KIND.tertiary, size: SIZE.mini, children: _jsx(AlignRight, { size: 24 }) }), _jsx(Button, { onClick: () => editor.objects.alignTop(), kind: KIND.tertiary, size: SIZE.mini, children: _jsx(AlignTop, { size: 24 }) }), _jsx(Button, { onClick: () => editor.objects.alignMiddle(), kind: KIND.tertiary, size: SIZE.mini, children: _jsx(AlignMiddle, { size: 24 }) }), _jsx(Button, { onClick: () => editor.objects.alignBottom(), kind: KIND.tertiary, size: SIZE.mini, children: _jsx(AlignBottom, { size: 24 }) })] })), returnFocus: true, autoFocus: true, children: _jsx(Block, { children: _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Align", children: _jsx(Button, { size: SIZE.mini, kind: KIND.tertiary, children: _jsx(AlignCenter, { size: 24 }) }) }) }) }));
};
const LockUnlock = () => {
    const [state, setState] = React.useState({ locked: false });
    const editor = useEditor();
    const activeObject = useActiveObject();
    React.useEffect(() => {
        if (activeObject) {
            // @ts-ignore
            setState({ locked: !!activeObject.locked });
        }
    }, [activeObject]);
    return state.locked ? (_jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Lock", children: _jsx(Button, { onClick: () => {
                editor.objects.unlock();
                setState({ locked: false });
            }, size: SIZE.mini, kind: KIND.tertiary, children: _jsx(UnlockedIcon, { size: 24 }) }) })) : (_jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Lock", children: _jsx(Button, { onClick: () => {
                editor.objects.lock();
                setState({ locked: true });
            }, size: SIZE.mini, kind: KIND.tertiary, children: _jsx(LockedIcon, { size: 24 }) }) }));
};
export default Common;
