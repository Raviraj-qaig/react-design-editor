import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import useAppContext from "~/hooks/useAppContext";
import panelItems from "./panelItems";
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen";
import { Block } from "baseui/block";
const PanelsList = () => {
    const [state, setState] = React.useState({ panel: "Text" });
    const isSidebarOpen = useIsSidebarOpen();
    const { activePanel, activeSubMenu } = useAppContext();
    React.useEffect(() => {
        setState({ panel: activePanel });
    }, [activePanel]);
    React.useEffect(() => {
        if (activeSubMenu) {
            setState({ panel: activeSubMenu });
        }
        else {
            setState({ panel: activePanel });
        }
    }, [activeSubMenu]);
    // @ts-ignore
    const Component = panelItems[state.panel];
    return (_jsx(Block, { id: "EditorPanelItem", "$style": {
            background: "#ffffff",
            width: isSidebarOpen ? "306px" : 0,
            flex: "none",
            borderRight: "1px solid #d7d8e3",
            display: "flex",
            transition: "ease width 0.1s",
            overflow: "hidden",
        }, children: Component && _jsx(Component, {}) }));
};
export default PanelsList;
