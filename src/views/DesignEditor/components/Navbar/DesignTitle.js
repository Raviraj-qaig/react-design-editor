import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import CloudCheck from "~/components/Icons/CloudCheck";
import { StatefulTooltip } from "baseui/tooltip";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
const DesignTitle = () => {
    const [state, setState] = React.useState({ name: "My first design.", width: 0 });
    const { currentDesign, setCurrentDesign } = useDesignEditorContext();
    const inputTitleRef = React.useRef(null);
    const spanRef = React.useRef(null);
    const handleInputChange = (name) => {
        setState({ ...state, name: name, width: spanRef.current?.clientWidth });
        setCurrentDesign({ ...currentDesign, name });
    };
    React.useEffect(() => {
        const name = currentDesign.name;
        if (name || name === "") {
            spanRef.current.innerHTML = name;
            setState({ ...state, name: name, width: spanRef.current?.clientWidth + 20 });
        }
    }, [currentDesign.name]);
    React.useEffect(() => {
        setState({ ...state, width: spanRef.current?.clientWidth + 20 });
    }, [state.name]);
    return (_jsxs(Block, { "$style": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            opacity: 1,
        }, children: [_jsx(Block, { "$style": { display: "flex", position: "absolute", top: "-10px", left: "50%", width: "100%" }, children: _jsx(Block, { "$style": {
                        fontFamily: "Uber Move Text",
                        position: "absolute",
                        top: "-10px",
                        left: "50%",
                        fontSize: "14px",
                        fontWeight: 500,
                    }, ref: spanRef, children: state.name }) }), _jsx(Block, { width: `${state.width}px`, display: "flex", children: _jsx(Input, { onChange: (e) => handleInputChange(e.target.value), overrides: {
                        Root: {
                            style: {
                                backgroundColor: "transparent",
                                borderTopStyle: "none",
                                borderBottomStyle: "none",
                                borderRightStyle: "none",
                                borderLeftStyle: "none",
                            },
                        },
                        InputContainer: {
                            style: {
                                backgroundColor: "transparent",
                                paddingRight: 0,
                            },
                        },
                        Input: {
                            style: {
                                fontWeight: 500,
                                fontSize: "14px",
                                width: `${state.width}px`,
                                fontFamily: "Uber Move Text",
                                backgroundColor: "transparent",
                                color: "#ffffff",
                                paddingRight: 0,
                            },
                        },
                    }, value: state.name, ref: inputTitleRef }) }), _jsx(StatefulTooltip, { showArrow: true, overrides: {
                    Inner: {
                        style: {
                            backgroundColor: "#ffffff",
                        },
                    },
                }, content: () => _jsx(Block, { backgroundColor: "#ffffff", children: "All changes are saved" }), children: _jsx(Block, { "$style": {
                        cursor: "pointer",
                        padding: "10px",
                        display: "flex",
                        color: "#ffffff",
                    }, children: _jsx(CloudCheck, { size: 24 }) }) })] }));
};
export default DesignTitle;
