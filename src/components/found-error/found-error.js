import React from 'react';
import { Alert, Space } from 'antd';

class FoundError extends React.Component {
  render() {
    return (
      <Space
        direction="vertical"
        style={{
          display: 'block',
          margin: '10px auto',
          width: '90%',
          padding: '20px',
        }}
      >
        <Alert message="Film not found" description="try changing the title" type="error" closable showIcon />
      </Space>
    );
  }
}

export default FoundError;
