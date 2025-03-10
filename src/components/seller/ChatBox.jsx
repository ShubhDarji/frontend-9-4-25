import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Button, List, Avatar, Typography, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const ChatBox = ({ users, onSendMessage }) => {
  const [selectedUser, setSelectedUser] = useState(users.length > 0 ? users[0] : null);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages[selectedUser?.id]]);

  // ✅ Handle sending message
  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser) return;

    const newMessage = {
      sender: "You",
      text: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedUser.id]: [...(prevMessages[selectedUser.id] || []), newMessage],
    }));
    
    setMessage("");

    // ✅ Send message to parent component (for backend integration)
    if (onSendMessage) {
      onSendMessage(selectedUser.id, newMessage);
    }
  };

  return (
    <Card
      title="Chat with Customers"
      bordered={false}
      style={{
        maxWidth: "100%",
        width: 400,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      bodyStyle={{ padding: 15, display: "flex", flexDirection: "column" }}
    >
      {/* ✅ Select User to Chat With */}
      <Select
        value={selectedUser?.id}
        onChange={(userId) => setSelectedUser(users.find((user) => user.id === userId))}
        style={{ width: "100%", marginBottom: 10 }}
        placeholder="Select a customer"
      >
        {users.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.name}
          </Option>
        ))}
      </Select>

      {/* ✅ Messages List */}
      <List
        dataSource={messages[selectedUser?.id] || []}
        renderItem={(msg, index) => (
          <List.Item
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.sender === "You" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                background: msg.sender === "You" ? "#007bff" : "#f1f1f1",
                color: msg.sender === "You" ? "#fff" : "#333",
                padding: "8px 12px",
                borderRadius: 10,
                maxWidth: "70%",
                wordWrap: "break-word",
                textAlign: "left",
              }}
            >
              <Text strong style={{ display: "block" }}>
                {msg.sender}
              </Text>
              <Text>{msg.text}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Text>
            </div>
          </List.Item>
        )}
        style={{
          maxHeight: 300,
          overflowY: "auto",
          padding: "10px",
        }}
      />
      <div ref={messagesEndRef} />

      {/* ✅ Message Input */}
      <div style={{ marginTop: 10 }}>
        <TextArea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onPressEnter={handleSendMessage}
        />
        <Button
          type="primary"
          block
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          style={{ marginTop: 10 }}
        >
          Send
        </Button>
      </div>
    </Card>
  );
};

export default ChatBox;
