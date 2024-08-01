import {
  CheckOutlined,
  CloseOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Toolbar, ToolbarButton } from "@src/components/toolbar";

export const DetailsView: ToolbarButton["DetailsView"] = ({ exit }) => {
  const editor2dButtons: ToolbarButton[] = [
    {
      label: "保存",
      icon: <CheckOutlined />,
      onClick() {
        exit();
      },
    },
    {
      label: "退出",
      icon: <CloseOutlined />,
      onClick() {
        exit();
      },
    },
  ];

  return <Toolbar toolbarButtons={editor2dButtons} />;
};
