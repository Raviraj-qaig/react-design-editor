import { jsx as _jsx } from "react/jsx-runtime";
import { PanelType } from "~/constants/app-options";
import { createContext, useState } from "react";
export const AppContext = createContext({
    isMobile: false,
    setIsMobile: () => { },
    templates: [],
    setTemplates: () => { },
    uploads: [],
    setUploads: () => { },
    shapes: [],
    setShapes: () => { },
    activePanel: PanelType.TEMPLATES,
    setActivePanel: () => { },
    activeSubMenu: null,
    setActiveSubMenu: (value) => { },
    currentTemplate: {},
    setCurrentTemplate: {},
});
export const AppProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(undefined);
    const [templates, setTemplates] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [activePanel, setActivePanel] = useState(PanelType.TEMPLATES);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [currentTemplate, setCurrentTemplate] = useState(null);
    const context = {
        isMobile,
        setIsMobile,
        templates,
        setTemplates,
        activePanel,
        setActivePanel,
        shapes,
        setShapes,
        activeSubMenu,
        setActiveSubMenu,
        uploads,
        setUploads,
        currentTemplate,
        setCurrentTemplate,
    };
    return _jsx(AppContext.Provider, { value: context, children: children });
};
