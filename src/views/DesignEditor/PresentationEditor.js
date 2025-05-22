import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "./components/Navbar";
import Panels from "./components/Panels";
import Canvas from "./components/Canvas";
import Footer from "./components/Footer";
import Toolbox from "./components/Toolbox";
import EditorContainer from "./components/EditorContainer";
const PresentationEditor = () => {
    return (_jsxs(EditorContainer, { children: [_jsx(Navbar, {}), _jsxs("div", { style: { display: "flex", flex: 1 }, children: [_jsx(Panels, {}), _jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsx(Toolbox, {}), _jsx(Canvas, {}), _jsx(Footer, {})] })] })] }));
};
export default PresentationEditor;
