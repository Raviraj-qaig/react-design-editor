import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStyletron, styled } from "baseui";
import { BASE_ITEMS, VIDEO_PANEL_ITEMS } from "~/constants/app-options";
import useAppContext from "~/hooks/useAppContext";
import Icons from "~/components/Icons";
import { useTranslation } from "react-i18next";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
import useEditorType from "~/hooks/useEditorType";
import Scrollable from "~/components/Scrollable";
import { Block } from "baseui/block";
const Container = styled("div", (props) => ({
    width: "80px",
    backgroundColor: props.$theme.colors.primary100,
    display: "flex",
}));
const PanelsList = () => {
    const { activePanel } = useAppContext();
    const { t } = useTranslation("editor");
    const editorType = useEditorType();
    const PANEL_ITEMS = editorType === "VIDEO" ? VIDEO_PANEL_ITEMS : BASE_ITEMS;
    return (_jsx(Container, { children: _jsx(Scrollable, { autoHide: true, children: PANEL_ITEMS.map((panelListItem) => (_jsx(PanelListItem, { label: t(`panels.panelsList.${panelListItem.id}`), name: panelListItem.name, icon: panelListItem.name, activePanel: activePanel }, panelListItem.name))) }) }));
};
const PanelListItem = ({ label, icon, activePanel, name }) => {
    const { setActivePanel } = useAppContext();
    const setIsSidebarOpen = useSetIsSidebarOpen();
    const [css, theme] = useStyletron();
    // @ts-ignore
    const Icon = Icons[icon];
    return (_jsxs(Block, { id: "EditorPanelList", onClick: () => {
            setIsSidebarOpen(true);
            setActivePanel(name);
        }, "$style": {
            width: "80px",
            height: "80px",
            backgroundColor: name === activePanel ? theme.colors.white : theme.colors.primary100,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "Uber Move Text",
            fontWeight: 500,
            fontSize: "0.8rem",
            userSelect: "none",
            transition: "all 0.5s",
            gap: "0.1rem",
            ":hover": {
                cursor: "pointer",
                backgroundColor: theme.colors.white,
                transition: "all 1s",
            },
        }, children: [_jsx(Icon, { size: 24 }), _jsx("div", { children: label })] }));
};
export default PanelsList;
