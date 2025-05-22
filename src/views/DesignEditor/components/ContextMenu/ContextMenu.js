import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useActiveObject, useContextMenuRequest, useEditor } from "@layerhub-io/react";
import { useStyletron } from "baseui";
import BringToFront from "~/components/Icons/BringToFront";
import Delete from "~/components/Icons/Delete";
import Duplicate from "~/components/Icons/Duplicate";
import Elements from "~/components/Icons/Elements";
import Locked from "~/components/Icons/Locked";
import Paste from "~/components/Icons/Paste";
import SendToBack from "~/components/Icons/SendToBack";
import Unlocked from "~/components/Icons/Unlocked";
const ContextMenu = () => {
    const contextMenuRequest = useContextMenuRequest();
    const editor = useEditor();
    const activeObject = useActiveObject();
    const handleAsComponentHandler = async () => {
        if (editor) {
            const component = await editor.scene.exportAsComponent();
            if (component) {
                console.log({ component });
            }
        }
    };
    if (!contextMenuRequest || !contextMenuRequest.target) {
        return _jsx(_Fragment, {});
    }
    if (contextMenuRequest.target.type === "Background") {
        return (_jsxs("div", { onContextMenu: (e) => e.preventDefault(), style: {
                position: "absolute",
                top: `${contextMenuRequest.top}px`,
                left: `${contextMenuRequest.left}px`,
                zIndex: 129,
                width: "240px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
                padding: "0.5rem 0",
            }, children: [_jsx(ContextMenuItem, { disabled: true, onClick: () => {
                        editor.objects.copy();
                        editor.cancelContextMenuRequest();
                    }, icon: "Duplicate", label: "copy", children: _jsx(Duplicate, { size: 24 }) }), _jsx(ContextMenuItem, { onClick: () => {
                        editor.objects.paste();
                        editor.cancelContextMenuRequest();
                    }, icon: "Paste", label: "paste", children: _jsx(Paste, { size: 24 }) }), _jsx(ContextMenuItem, { disabled: true, onClick: () => {
                        editor.objects.remove();
                        editor.cancelContextMenuRequest();
                    }, icon: "Delete", label: "delete", children: _jsx(Delete, { size: 24 }) })] }));
    }
    return (_jsx(_Fragment, { children: !contextMenuRequest.target.locked ? (_jsxs("div", { onContextMenu: (e) => e.preventDefault(), style: {
                position: "absolute",
                top: `${contextMenuRequest.top}px`,
                left: `${contextMenuRequest.left}px`,
                zIndex: 129,
                width: "240px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
                padding: "0.5rem 0",
            }, children: [_jsx(ContextMenuItem, { onClick: () => {
                        editor.objects.copy();
                        editor.cancelContextMenuRequest();
                    }, icon: "Duplicate", label: "copy", children: _jsx(Duplicate, { size: 24 }) }), _jsx(ContextMenuItem, { onClick: () => {
                        editor.objects.paste();
                        editor.cancelContextMenuRequest();
                    }, icon: "Paste", label: "paste", children: _jsx(Paste, { size: 24 }) }), _jsx(ContextMenuItem, { onClick: () => {
                        editor.objects.remove();
                        editor.cancelContextMenuRequest();
                    }, icon: "Delete", label: "delete", children: _jsx(Delete, { size: 24 }) }), _jsx("div", { style: { margin: "0.5rem 0" } }), _jsx(ContextMenuItem, { onClick: () => {
                        editor.objects.bringForward();
                        editor.cancelContextMenuRequest();
                    }, icon: "Forward", label: "bring forward", children: _jsx(BringToFront, { size: 24 }) }), _jsx(ContextMenuItem, { onClick: () => {
                        editor.objects.sendBackwards();
                        editor.cancelContextMenuRequest();
                    }, icon: "Backward", label: "send backward", children: _jsx(SendToBack, { size: 24 }) }), _jsx(ContextMenuItem, { onClick: () => {
                        handleAsComponentHandler();
                        editor.cancelContextMenuRequest();
                    }, icon: "Elements", label: "Save as component", children: _jsx(Elements, { size: 24 }) }), _jsx("div", { style: { margin: "0.5rem 0" } }), _jsx(ContextMenuItem, { onClick: () => {
                        editor.objects.lock();
                        editor.cancelContextMenuRequest();
                    }, icon: "Locked", label: "lock", children: _jsx(Locked, { size: 24 }) }), activeObject?.type === "StaticImage" && (_jsx(ContextMenuItem, { onClick: () => {
                        // handleAsComponentHandler()
                        editor.objects.setAsBackgroundImage();
                        editor.cancelContextMenuRequest();
                    }, icon: "Images", label: "Set as background image", children: _jsx(Elements, { size: 24 }) }))] })) : (_jsx("div", { onContextMenu: (e) => e.preventDefault(), style: {
                position: "absolute",
                top: `${contextMenuRequest.top}px`,
                left: `${contextMenuRequest.left}px`,
                zIndex: 129,
                width: "240px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
                padding: "0.5rem 0",
            }, children: _jsx(ContextMenuItem, { onClick: () => {
                    editor.objects.unlock();
                    editor.cancelContextMenuRequest();
                }, icon: "Unlocked", label: "unlock", children: _jsx(Unlocked, { size: 24 }) }) })) }));
};
const ContextMenuItem = ({ label, onClick, children, disabled = false, }) => {
    const [css] = useStyletron();
    return (_jsxs("div", { onClick: onClick, className: css({
            display: "flex",
            height: "32px",
            fontSize: "14px",
            alignItems: "center",
            padding: "0 1rem",
            gap: "1rem",
            cursor: "pointer",
            pointerEvents: disabled ? "none" : "auto",
            opacity: disabled ? 0.4 : 1,
            ":hover": {
                backgroundColor: "rgba(0,0,0,0.075)",
            },
        }), children: [children, " ", label] }));
};
export default ContextMenu;
