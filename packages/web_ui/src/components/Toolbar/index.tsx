import { Button, Divider, Menu, MenuProps, Tooltip } from "antd";
import { useState, type ReactElement, FunctionComponent } from "react";

export type ToolbarButton = {
  label: string;
  icon: ReactElement;
  DetailsView: (props: { onExit: () => void }) => ReactElement;
};

export const Toolbar: FunctionComponent<{toolbarButtons: ToolbarButton[]}> = ({toolbarButtons}) => {
  const [curActiveBtn, setCurActiveBtn] = useState<ToolbarButton>();
  const onExit = () => setCurActiveBtn(undefined);

  if (curActiveBtn == undefined) {
    return (
      <div>
        <Divider orientation="left">111</Divider>
        {toolbarButtons.map((btn) => (
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
