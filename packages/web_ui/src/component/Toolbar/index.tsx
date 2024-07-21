import { Button, Divider, Menu, MenuProps, Tooltip } from "antd";
import { useState, type ReactElement, FunctionComponent } from "react";
import { toolbarButtonList } from "@src/component/Toolbar/toolbar_button_list";

export type ToolbarButton = {
  label: string;
  icon: ReactElement;
  DetailsView: (props: { onExit: () => void }) => ReactElement;
};

export const Toolbar: FunctionComponent = () => {
  const [curActiveBtn, setCurActiveBtn] = useState<ToolbarButton>();
  const onExit = () => setCurActiveBtn(undefined);

  if (curActiveBtn == undefined) {
    return (
      <div>
        <Divider orientation="left">111</Divider>
        {toolbarButtonList.map((btn) => (
          <Tooltip title={btn.label}>
            <Button
              key={btn.label}
              type="text"
              size="large"
              icon={btn.icon}
              onClick={() => setCurActiveBtn(btn)}
            />
          </Tooltip>
        ))}
      </div>
    );
  } else {
    return <curActiveBtn.DetailsView onExit={onExit} />;
  }
};
