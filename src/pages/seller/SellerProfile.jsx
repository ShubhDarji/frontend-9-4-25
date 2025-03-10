import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Upload, message, Avatar } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import SellerSidebar from "../../components/seller/SellerSidebar";
import axios from "axios";

const { Content } = Layout;

const SellerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      const { data } = await axios.get("http://localhost:5000/api/seller/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      await axios.put(
        "http://localhost:5000/api/seller/profile",
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  const handleAvatarUpload = (info) => {
    if (info.file.status === "done") {
      setProfile({ ...profile, avatar: info.file.response.url });
      message.success("Avatar uploaded successfully!");
    }
  };

  return (
    <Layout>
      <SellerSidebar />
      <Content style={{ padding: "20px" }}>
        <h2>Seller Profile</h2>

        <Avatar size={100} src={profile.avatar} icon={<UserOutlined />} />
        <Upload
          name="avatar"
          action="http://localhost:5000/api/upload-avatar"
          onChange={handleAvatarUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Avatar</Button>
        </Upload>

        <Form layout="vertical" style={{ marginTop: "20px" }}>
          <Form.Item label="Name">
            <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={profile.email} disabled />
          </Form.Item>
          <Form.Item label="Phone">
            <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </Form.Item>
          <Button type="primary" onClick={handleUpdate}>Update Profile</Button>
        </Form>
      </Content>
    </Layout>
  );
};

export default SellerProfile;
