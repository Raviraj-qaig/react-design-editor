import { jsx as _jsx } from "react/jsx-runtime";
import { Block } from "baseui/block";
import { useEditor } from "@layerhub-io/react";
import { PLACEMENT, StatefulTooltip } from "baseui/tooltip";
import { Button, SIZE, KIND } from "baseui/button";
import UnlockedIcon from "~/components/Icons/Unlocked";
const Locked = () => {
    const editor = useEditor();
    return (_jsx(Block, { "$style": {
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            justifyContent: "flex-end",
        }, children: _jsx(StatefulTooltip, { placement: PLACEMENT.bottom, showArrow: true, accessibilityType: "tooltip", content: "Unlock", children: _jsx(Button, { onClick: () => {
                    editor.objects.unlock();
                }, size: SIZE.mini, kind: KIND.tertiary, children: _jsx(UnlockedIcon, { size: 24 }) }) }) }));
};
export default Locked;
