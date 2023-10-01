import React from 'react';
import { Pagination } from 'antd';

import './pagination.css';

class Paginations extends React.Component {
  handleChange = (page) => {
    if (this.props.pageTab === 'search') {
      this.props.searchPageMovie(this.props.queryMovie, page);
    }
    if (this.props.pageTab === 'rated') {
      console.log(page);
      this.props.getPageSession(page);
    }
  };
  render() {
    const { totalPage, page } = this.props;
    return (
      <div className="pagination">
        <Pagination
          className="pagination"
          defaultCurrent={page}
          pageSize={1}
          total={totalPage}
          showSizeChanger={false}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Paginations;
