import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Block } from "baseui/block";
import Common from "./Common";
import Flip from "./Shared/Flip";
const Image = () => {
    return (_jsxs(Block, { "$style": {
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            justifyContent: "space-between",
        }, children: [_jsx(Block, { children: _jsx(Flip, {}) }), _jsx(Common, {})] }));
};
export default Image;
