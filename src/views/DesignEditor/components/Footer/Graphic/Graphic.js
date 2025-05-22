import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "baseui";
import Common from "./Common";
import Scenes from "./Scenes";
const Container = styled("div", ({ $theme }) => ({
    background: $theme.colors.white,
}));
const Graphic = () => {
    return (_jsxs(Container, { children: [_jsx(Scenes, {}), _jsx(Common, {})] }));
};
export default Graphic;
