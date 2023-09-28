import React from 'react';
import { Alert } from 'antd';

function Errors() {
  return <Alert message="Sorry, but the page you requested does not exist or cannot be found." type="error" />;
}

export default Errors;
