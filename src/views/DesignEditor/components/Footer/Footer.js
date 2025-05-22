import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import Graphic from "./Graphic";
import Presentation from "./Presentation";
import Video from "./Video";
import useEditorType from "~/hooks/useEditorType";
const Footer = () => {
    const editorType = useEditorType();
    return {
        NONE: _jsx(_Fragment, {}),
        PRESENTATION: _jsx(Presentation, {}),
        VIDEO: _jsx(Video, {}),
        GRAPHIC: _jsx(Graphic, {}),
    }[editorType];
};
export default Footer;
