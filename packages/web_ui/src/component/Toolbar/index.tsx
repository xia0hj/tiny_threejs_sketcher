import { Menu, MenuProps } from "antd";
import { useState, type ReactElement, FunctionComponent } from "react";

export type ToolbarButton = {
  label: string;
  icon: ReactElement;
  activePanel: (props: { done: () => void }) => ReactElement;
};

function convertToMenuItemList(
  buttonList: ToolbarButton[],
): MenuProps["items"] {
  return buttonList.map((btn) => ({
    key: btn.label,
    label: btn.label,
    icon: btn.icon,
  }));
}

export const Toolbar: FunctionComponent<{ buttonList: ToolbarButton[] }> = ({
  buttonList,
}) => {
  const [curActiveBtn, setCurActiveBtn] = useState<ToolbarButton>();
  const onClick: MenuProps["onClick"] = (info) => {
    const findBtn = buttonList.find((btn) => btn.label === info.key);
    setCurActiveBtn(findBtn);
  };
  const done = () => setCurActiveBtn(undefined);

  if (curActiveBtn == undefined) {
    return (
      <Menu
        items={convertToMenuItemList(buttonList)}
        selectable={false}
        mode="vertical"
        onClick={onClick}
      />
    );
  } else {
    return <curActiveBtn.activePanel done={done} />;
  }
};
