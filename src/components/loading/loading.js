import React from 'react';
import { Spin } from 'antd';

import './loading.css';

class Loading extends React.Component {
  render() {
    return <Spin className="spin" size="large" />;
  }
}

export default Loading;
