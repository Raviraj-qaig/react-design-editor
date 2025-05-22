import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ArrowBackOutline from "~/components/Icons/ArrowBackOutline";
import Search from "~/components/Icons/Search";
import { Input, SIZE } from "baseui/input";
import useAppContext from "~/hooks/useAppContext";
import { useStyletron } from "baseui";
import { useEditor } from "@layerhub-io/react";
import { loadFonts } from "~/utils/fonts";
import { SAMPLE_FONTS } from "~/constants/editor";
import { groupBy } from "lodash";
import Scrollable from "~/components/Scrollable";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
const FontSelector = () => {
    const [query, setQuery] = React.useState("");
    const { setActiveSubMenu } = useAppContext();
    const setIsSidebarOpen = useSetIsSidebarOpen();
    const [commonFonts, setCommonFonts] = React.useState([]);
    const [css] = useStyletron();
    const editor = useEditor();
    React.useEffect(() => {
        const grouped = groupBy(SAMPLE_FONTS, "family");
        const standardFonts = Object.keys(grouped).map((key) => {
            const familyFonts = grouped[key];
            const standardFont = familyFonts.find((familyFont) => familyFont.postscript_name.includes("-Regular"));
            if (standardFont) {
                return standardFont;
            }
            return familyFonts[familyFonts.length - 1];
        });
        setCommonFonts(standardFonts);
    }, []);
    const handleFontFamilyChange = async (x) => {
        if (editor) {
            const font = {
                name: x.postscript_name,
                url: x.url,
            };
            await loadFonts([font]);
            // @ts-ignore
            editor.objects.update({
                fontFamily: x.postscript_name,
                fontURL: font.url,
            });
        }
    };
    return (_jsxs(Block, { "$style": { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsxs(Block, { "$style": {
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    justifyContent: "space-between",
                    padding: "1.5rem",
                }, children: [_jsxs(Block, { "$style": { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [_jsx(ArrowBackOutline, { size: 24 }), _jsx(Block, { children: "Choose font" })] }), _jsx(Block, { onClick: () => setIsSidebarOpen(false), "$style": { cursor: "pointer", display: "flex" }, children: _jsx(AngleDoubleLeft, { size: 18 }) })] }), _jsx(Block, { "$style": { padding: "0 1.5rem 1rem" }, children: _jsx(Input, { overrides: {
                        Root: {
                            style: {
                                paddingLeft: "8px",
                            },
                        },
                    }, clearable: true, onChange: (e) => setQuery(e.target.value), placeholder: "Search font", size: SIZE.compact, startEnhancer: _jsx(Search, { size: 16 }) }) }), _jsx(Scrollable, { children: _jsx("div", { style: { padding: "0 1.5rem", display: "grid", gap: "0.2rem" }, children: commonFonts.map((font, index) => {
                        return (_jsx("div", { onClick: () => handleFontFamilyChange(font), className: css({
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                fontSize: "14px",
                                ":hover": {
                                    backgroundColor: "rgb(245,246,247)",
                                },
                            }), id: font.id, children: _jsx("img", { src: font.preview }) }, index));
                    }) }) })] }));
};
export default FontSelector;
