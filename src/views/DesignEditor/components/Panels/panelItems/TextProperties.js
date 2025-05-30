import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-nocheck
import React from "react";
import InformationCircleOutline from "~/components/Icons/InformationCircleOutline";
import Underline from "~/components/Icons/Underline";
import Spacing from "~/components/Icons/Spacing";
import Shadow from "./Common/Shadow";
import { Input, SIZE } from "baseui/input";
import { Button } from "baseui/button";
import { ChevronRight } from "baseui/icon";
import useAppContext from "~/hooks/useAppContext";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import { useSelector } from "react-redux";
import { selectFonts } from "~/store/slices/fonts/selectors";
import { getTextOptions } from "~/utils/object-options";
import { fontStyleLabels } from "~/constants/fonts";
import { Select } from "baseui/select";
import { loadFonts } from "~/utils/fonts";
import { defaultTextOptions } from "~/constants/contants";
const TextProperties = () => {
    const fonts = useSelector(selectFonts);
    const [state, setState] = React.useState(defaultTextOptions);
    const { setActiveSubMenu } = useAppContext();
    const activeObject = useActiveObject();
    const editor = useEditor();
    React.useEffect(() => {
        if (activeObject) {
            const textOptions = getTextOptions(activeObject);
            const isGroup = textOptions.isGroup;
            const active = textOptions.fontFamily.split("__")[1];
            const font = fonts.find((f) => f.family === textOptions.fontFamily.split("__")[0].split("_").join(" "));
            if (!font) {
                setState(defaultTextOptions);
                return;
            }
            const isNotGradient = typeof activeObject.value?.fill === "string" || activeObject.value?.fill instanceof String;
            const styles = Object.keys(font.files)
                .map((file) => ({
                value: file,
                label: fontStyleLabels[file].label,
                id: fontStyleLabels[file].id,
                url: font.files[file],
                family: font.family,
            }))
                .sort((a, b) => (a.id > b.id ? 1 : -1));
            setState({
                ...textOptions,
                font,
                styles,
                fontFamily: font.family,
                activeStyle: {
                    label: fontStyleLabels[active].label,
                    id: fontStyleLabels[active].id,
                },
                fill: isGroup ? "#000000" : isNotGradient ? textOptions.fill : "#000000",
            });
        }
        else {
            setState(defaultTextOptions);
        }
    }, [activeObject]);
    const handleChange = async (key, value) => {
        if (key === "fontStyle") {
            const selected = value[0];
            const updatedFamily = `${selected.family.split(" ").join("_")}__${selected.value}`;
            const font = {
                name: updatedFamily,
                url: selected.url,
            };
            await loadFonts([font]);
            editor.objects.update({
                fontFamily: updatedFamily,
                metadata: {
                    fontURL: font.url,
                },
            });
            setState({ ...state, activeStyle: selected });
        }
        else {
            editor.objects.update({
                [key]: value,
            });
            setState({ ...state, [key]: value });
        }
    };
    return (_jsxs("div", { children: [_jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsx("div", { children: "Text properties" }), _jsx(InformationCircleOutline, { size: 24 })] }), _jsxs("div", { style: { display: "grid", gap: "0.5rem" }, children: [_jsx("div", { style: { padding: "0 1.5rem" }, children: _jsx(Input, { overrides: {
                                Root: {
                                    style: {
                                        paddingRight: "0px",
                                    },
                                },
                            }, onFocus: () => setActiveSubMenu("FontSelector"), endEnhancer: _jsx(ChevronRight, { size: "18px" }), size: SIZE.compact, value: state.fontFamily, placeholder: "Controlled Input", clearOnEscape: true }) }), _jsxs("div", { style: { padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem" }, children: [_jsx(Input, { size: SIZE.compact, value: 24 }), _jsx(Select, { size: SIZE.compact, options: state.styles, 
                                // @ts-ignore
                                value: [state.activeStyle], placeholder: "Select color", clearable: false, onChange: (params) => {
                                    // @ts-ignore
                                    handleChange("fontStyle", params.value);
                                } })] })] }), _jsxs("div", { style: { padding: "0 1.5rem" }, children: [_jsx(Button, { size: "compact", onClick: () => handleChange("underline", !activeObject.underline), kind: "tertiary", children: _jsx(Spacing, { size: 24 }) }), _jsx(Button, { size: "compact", onClick: () => handleChange("underline", !activeObject.underline), kind: "tertiary", children: _jsx(Underline, { size: 24 }) })] }), _jsx("div", { children: _jsx(Shadow, {}) })] }));
};
export default TextProperties;
