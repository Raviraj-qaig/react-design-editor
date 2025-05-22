import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Block } from "baseui/block";
import Common from "./Common";
const Multiple = () => {
    return (_jsxs(Block, { "$style": {
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            justifyContent: "space-between",
        }, children: [_jsx(Block, { children: "Multiple" }), _jsx(Common, {})] }));
};
export default Multiple;
