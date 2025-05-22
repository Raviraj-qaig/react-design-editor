import { jsx as _jsx } from "react/jsx-runtime";
import { Block } from "baseui/block";
const EditorContainer = ({ children }) => {
    return (_jsx(Block, { "$style": {
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "#FFFFFF",
            fontFamily: "Uber Move Text",
        }, children: children }));
};
export default EditorContainer;
