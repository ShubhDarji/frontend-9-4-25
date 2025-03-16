import React, { useEffect, useRef } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { DashboardOutlined, UserOutlined, ShopOutlined, OrderedListOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sidebarRef.current, { x: -200 }, { x: 0, duration: 1 });
  }, []);

  return (
    <Sider ref={sidebarRef} width={220} style={{ height: "100vh", position: "fixed", left: 0 }}>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/admin-dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/admin/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="sellers" icon={<ShopOutlined />}>
          <Link to="/admin/sellers">Sellers</Link>
        </Menu.Item>
        <Menu.Item key="products" icon={<ShopOutlined />}>
          <Link to="/admin/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<OrderedListOutlined />}>
          <Link to="/admin/orders">Orders</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
