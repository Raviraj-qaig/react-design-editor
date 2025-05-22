import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Modal, ModalBody, SIZE, ROLE } from "baseui/modal";
import useEditorType from "~/hooks/useEditorType";
import { Block } from "baseui/block";
import Video from "./Video";
import Presentation from "./Presentation";
import Graphic from "./Graphic";
const Preview = ({ isOpen, setIsOpen }) => {
    const editorType = useEditorType();
    return (_jsx(Modal, { onClose: () => setIsOpen(false), closeable: true, isOpen: isOpen, animate: true, autoFocus: true, size: SIZE.full, role: ROLE.dialog, overrides: {
            Root: {
                style: {
                    zIndex: 5,
                },
            },
            Dialog: {
                style: {
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                },
            },
        }, children: _jsx(ModalBody, { "$style": {
                display: "flex",
                flexDirection: "column",
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                height: "100%",
                position: "relative",
            }, children: _jsx(Block, { "$style": {
                    position: "absolute",
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                }, children: {
                    GRAPHIC: _jsx(Graphic, {}),
                    PRESENTATION: _jsx(Presentation, {}),
                    VIDEO: _jsx(Video, {}),
                    NONE: _jsx(_Fragment, {}),
                }[editorType] }) }) }));
};
export default Preview;
