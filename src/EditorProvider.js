import { jsx as _jsx } from "react/jsx-runtime";
import { Provider as ScenifyProvider } from "@layerhub-io/react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme } from "baseui";
import { store } from "./store/store";
import { Provider as ReduxProvier } from "react-redux";
import { AppProvider } from "./contexts/AppContext";
import { DesignEditorProvider } from "./contexts/DesignEditor";
import { I18nextProvider } from "react-i18next";
import { TimerProvider } from "@layerhub-io/use-timer";
import i18next from "i18next";
import "./translations";
const engine = new Styletron();
const EditorProvider = ({ children }) => {
    return (_jsx(ReduxProvier, { store: store, children: _jsx(DesignEditorProvider, { children: _jsx(TimerProvider, { children: _jsx(AppProvider, { children: _jsx(ScenifyProvider, { children: _jsx(StyletronProvider, { value: engine, children: _jsx(BaseProvider, { theme: LightTheme, children: _jsx(I18nextProvider, { i18n: i18next, children: children }) }) }) }) }) }) }) }));
};
export default EditorProvider;
