import { BorderOuterOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar";
import { Card, Form, InputNumber, Select } from "antd";

interface FieldType {
  parallelTo: "XY" | "XZ" | "YZ";
  offset: number;
}

const activePanel: ToolbarButton["activePanel"] = ({ done }) => {
  return (
    <Card title="创建草图平面">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ parallelTo: "XY", offset: 0 }}
        requiredMark={false}
      >
        <Form.Item<FieldType>
          label="平行于"
          name="parallelTo"
          rules={[{ required: true, message: "必填" }]}
        >
          <Select
            options={[
              { value: "XY", label: "XY" },
              { value: "XZ", label: "XZ" },
              { value: "YZ", label: "YZ" },
            ]}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="偏移"
          name="offset"
          rules={[{ required: true, message: "必填" }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Card>
  );
};

export const btnCreateSketchPlane: ToolbarButton = {
  label: "创建草图平面",
  icon: <BorderOuterOutlined />,
  activePanel,
} as const;
