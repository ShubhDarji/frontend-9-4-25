import React from "react";
import { Form, Input, Button } from "antd";

const ProfileForm = ({ profile, updateProfile }) => {
  return (
    <Form layout="vertical" onFinish={updateProfile} initialValues={profile}>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">Update Profile</Button>
    </Form>
  );
};

export default ProfileForm;
