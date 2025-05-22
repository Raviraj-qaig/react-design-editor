import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, SIZE } from "baseui/button";
import { textComponents } from "~/constants/editor";
import { useStyletron } from "styletron-react";
import { useEditor } from "@layerhub-io/react";
import { loadFonts } from "~/utils/fonts";
import { nanoid } from "nanoid";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
const Text = () => {
    const editor = useEditor();
    const setIsSidebarOpen = useSetIsSidebarOpen();
    const addObject = async () => {
        if (editor) {
            const font = {
                name: "OpenSans-Regular",
                url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
            };
            await loadFonts([font]);
            const options = {
                id: nanoid(),
                type: "StaticText",
                width: 420,
                text: "Add some text",
                fontSize: 92,
                fontFamily: font.name,
                textAlign: "center",
                fontStyle: "normal",
                fontURL: font.url,
                fill: "#333333",
                metadata: {},
            };
            editor.objects.add(options);
        }
    };
    const addComponent = async (component) => {
        if (editor) {
            const fontItemsList = [];
            if (component.objects) {
                component.objects.forEach((object) => {
                    if (object.type === "StaticText" || object.type === "DynamicText") {
                        fontItemsList.push({
                            name: object.fontFamily,
                            url: object.fontURL,
                        });
                    }
                });
                const filteredFonts = fontItemsList.filter((f) => !!f.url);
                await loadFonts(filteredFonts);
            }
            else {
                if (component.type === "StaticText" || component.type === "DynamicText") {
                    fontItemsList.push({
                        name: component.fontFamily,
                        url: component.fontURL,
                    });
                    await loadFonts(fontItemsList);
                }
            }
            editor.objects.add(component);
        }
    };
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsx(Block, { children: "Text" }), _jsx(Block, { onClick: () => setIsSidebarOpen(false), "$style": { cursor: "pointer", display: "flex" }, children: _jsx(AngleDoubleLeft, { size: 18 }) })] }), _jsx(Scrollable, { children: _jsxs(Block, { padding: "0 1.5rem", children: [_jsx(Button, { onClick: addObject, size: SIZE.compact, overrides: {
                                Root: {
                                    style: {
                                        width: "100%",
                                    },
                                },
                            }, children: "Add text" }), _jsx(Block, { "$style": {
                                paddingTop: "0.5rem",
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "8px",
                            }, children: [...textComponents].map((tc) => (_jsx(TextComponentItem, { onClick: addComponent, component: tc }, tc.id))) })] }) })] }));
};
const TextComponentItem = ({ component, onClick }) => {
    const [css] = useStyletron();
    return (_jsxs("div", { onClick: () => onClick(component.layers[0]), className: css({
            position: "relative",
            height: "84px",
            background: "#f8f8fb",
            cursor: "pointer",
            padding: "12px",
            borderRadius: "8px",
            overflow: "hidden",
            "::before:hover": {
                opacity: 1,
            },
        }), children: [_jsx("div", { className: css({
                    backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    height: "100%",
                    width: "100%",
                    ":hover": {
                        opacity: 1,
                    },
                }) }), _jsx("img", { src: component.preview, className: css({
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    pointerEvents: "none",
                    verticalAlign: "middle",
                }) })] }));
};
export default Text;
