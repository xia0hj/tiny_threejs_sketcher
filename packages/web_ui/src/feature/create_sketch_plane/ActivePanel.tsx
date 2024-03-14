import {
  BorderOuterOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar_legacy";
import { Card, Form, InputNumber, Select } from "antd";
import style from "./index.module.less";
import { useGlobalStore } from "@src/store";
import { CommandKeyList } from "sdk";
interface FieldType {
  parallelTo: "XY" | "XZ" | "YZ";
  offset: number;
}

export const ActivePanel: ToolbarButton["activePanel"] = ({ done }) => {
  const [formInstance] = Form.useForm();
  const rootRenderer = useGlobalStore((state) => state.threeCadEditor);
  const onSubmit = (values: FieldType) => {
    console.log(values);
    rootRenderer?.commandSystem.runCommand({
      key: CommandKeyList.create_plane,
      parameter: {
        offset: values.offset,
        parallelTo: values.parallelTo,
      },
    });
    done();
  };

  return (
    <div className={style.form_container}>
      <Card
        title="创建草图平面"
        actions={[
          <CheckOutlined onClick={() => formInstance.submit()} />,
          <CloseOutlined onClick={() => done()} />,
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
