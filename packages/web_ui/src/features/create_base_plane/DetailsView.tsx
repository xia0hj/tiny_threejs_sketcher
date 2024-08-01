import {
  BorderOuterOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { ToolbarButton } from "@src/components/Toolbar";
import { Card, Form, InputNumber, Select } from "antd";
import style from "./index.module.less";
import { useEditorStore } from "@src/store";
import { COMMAND_KEY } from "tiny_threejs_sketcher";
interface FieldType {
  parallelTo: "XY" | "XZ" | "YZ";
  offset: number;
}

export const DetailsView: ToolbarButton["DetailsView"] = ({ exit: onExit }) => {
  const [formInstance] = Form.useForm();
  const threeCadEditor = useEditorStore((state) => state.tinyThreejsSketcher);
  const onSubmit = (values: FieldType) => {
    console.log(values);
    threeCadEditor?.runCommand(COMMAND_KEY.create_base_plane, {
      offset: values.offset,
      parallelTo: values.parallelTo,
    });
    onExit();
  };

  return (
    <div className={style.form_container}>
      <Card
        title="创建草图平面"
        actions={[
          <CheckOutlined onClick={() => formInstance.submit()} />,
          <CloseOutlined onClick={() => onExit()} />,
        ]}
      >
        <Form
          form={formInstance}
          onFinish={onSubmit}
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
    </div>
  );
};
