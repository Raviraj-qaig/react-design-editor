import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-nocheck
import React from "react";
import { LightTheme, ThemeProvider } from "baseui";
import { Drawer, SIZE } from "baseui/drawer";
import { Button, KIND } from "baseui/button";
import { useSelector } from "react-redux";
import { selectPages } from "./store/slices/design-editor/selectors";
import { nanoid } from "nanoid";
import { useAppDispatch } from "./store/store";
import { addPage } from "./store/slices/design-editor/actions";
const Pages = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const pages = useSelector(selectPages);
    const dispatch = useAppDispatch();
    const handleAddPage = () => {
        dispatch(addPage({
            id: nanoid(),
            name: "New page",
        }));
    };
    return (_jsxs(ThemeProvider, {
        theme: LightTheme, children: [_jsx(Button, {
            onClick: () => setIsOpen(true), kind: KIND.secondary, "$style": {
                position: "absolute",
                bottom: "20px",
                right: "20px",
                zIndex: 1,
                display: isOpen ? "none" : "block",
            }, children: "Pages"
        }), _jsx(Drawer, {
            size: SIZE.auto, isOpen: isOpen, autoFocus: true, onClose: () => setIsOpen(false), children: _jsxs("div", {
                style: {
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }, children: [_jsx("div", {
                    style: { display: "grid", gap: "1rem", padding: "1rem 0" }, children: pages.map((page, index) => {
                        return (_jsxs("div", {
                            style: {
                                width: "180px",
                                height: "60px",
                                border: "1px solid gray",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }, children: ["Page ", index]
                        }, page.id));
                    })
                }), _jsx(Button, { onClick: handleAddPage, children: "Add Page" })]
            })
        })]
    }));
};
export default Pages;
