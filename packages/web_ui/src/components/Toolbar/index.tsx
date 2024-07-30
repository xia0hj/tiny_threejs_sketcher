import { Button, Divider, Menu, MenuProps, Tooltip } from "antd";
import { useState, type ReactElement, FunctionComponent } from "react";

export type ToolbarButton = {
  label: string;
  icon: ReactElement;
  DetailsView?: (props: { exit: () => void }) => ReactElement;
  onClick?: () => void;
};

export const Toolbar: FunctionComponent<{
  toolbarButtons: ToolbarButton[];
}> = ({ toolbarButtons }) => {
  const [curActiveBtn, setCurActiveBtn] = useState<ToolbarButton>();
  const onExit = () => setCurActiveBtn(undefined);
  const onClick = (btn: ToolbarButton) => {
    setCurActiveBtn(btn);
    btn.onClick?.();
  };

  if (curActiveBtn == undefined || curActiveBtn.DetailsView == undefined) {
    return (
      <div>
        <Divider orientation="left">111</Divider>
        {toolbarButtons.map((btn) => (
          <Tooltip title={btn.label}>
            <Button
              key={btn.label}
              type={btn.label === curActiveBtn?.label ? undefined : "text"}
              size="large"
              icon={btn.icon}
              onClick={() => onClick(btn)}
            />
          </Tooltip>
        ))}
      </div>
    );
  } else {
    return <curActiveBtn.DetailsView exit={onExit} />;
  }
};
