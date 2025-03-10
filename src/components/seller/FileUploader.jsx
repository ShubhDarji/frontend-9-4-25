import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUploader = ({ uploadUrl, onSuccess }) => {
  const props = {
    name: "file",
    action: uploadUrl,
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully.`);
        onSuccess(info.file.response.url);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload Image</Button>
    </Upload>
  );
};

export default FileUploader;
