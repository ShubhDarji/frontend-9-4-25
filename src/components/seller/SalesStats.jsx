import React from "react";
import { Statistic, Row, Col, Card } from "antd";

const SalesStats = ({ earnings, totalSales }) => (
  <Row gutter={16}>
    <Col span={12}>
      <Card>
        <Statistic title="Total Earnings" value={`$${earnings}`} />
      </Card>
    </Col>
    <Col span={12}>
      <Card>
        <Statistic title="Total Sales" value={totalSales} />
      </Card>
    </Col>
  </Row>
);

export default SalesStats;
