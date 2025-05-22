import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import useEditorType from "~/hooks/useEditorType";
import SelectEditor from "./SelectEditor";
import GraphicEditor from "./GraphicEditor";
import PresentationEditor from "./PresentationEditor";
import VideoEditor from "./VideoEditor";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import Preview from "./components/Preview";
const DesignEditor = () => {
    const editorType = useEditorType();
    const { displayPreview, setDisplayPreview } = useDesignEditorContext();
    return (_jsxs(_Fragment, { children: [displayPreview && _jsx(Preview, { isOpen: displayPreview, setIsOpen: setDisplayPreview }), {
                NONE: _jsx(SelectEditor, {}),
                PRESENTATION: _jsx(PresentationEditor, {}),
                VIDEO: _jsx(VideoEditor, {}),
                GRAPHIC: _jsx(GraphicEditor, {}),
            }[editorType]] }));
};
export default DesignEditor;
