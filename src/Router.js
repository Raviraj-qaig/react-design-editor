import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesignEditor from "~/views/DesignEditor";
import Dashboard from "~/views/Dashboard";
const Router = () => {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/manage", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/", element: _jsx(DesignEditor, {}) })] }) }));
};
export default Router;
