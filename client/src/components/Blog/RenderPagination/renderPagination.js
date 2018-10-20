import { map } from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  activePage,
  disableChevron,
  paginationContainer,
} from './renderPagination.scss';

class Pagination extends PureComponent {
  handlePaginationClick = currentPage =>
    this.props.goTo(currentPage, this.props.postCount);

  render = () => {
    const { currentPage, pageCount, postCount } = this.props;
    return (
      <ul className={paginationContainer}>
        <li className={currentPage === 1 ? `${disableChevron}` : null}>
          <button onClick={() => this.handlePaginationClick(currentPage - 1)}>
            <span className="small-font">&#60;</span>
          </button>
        </li>
        {map(pageCount, page => (
          <li
            key={page}
            className={currentPage === page + 1 ? `${activePage}` : null}
          >
            <button onClick={() => this.handlePaginationClick(page + 1)}>
              {page + 1}
            </button>
          </li>
        ))}
        <li
          className={
            (currentPage + 1) * 10 <= postCount ? null : `${disableChevron}`
          }
        >
          <button onClick={() => this.handlePaginationClick(currentPage + 1)}>
            <span style={{ fontSize: 10 }}>&#62;</span>
          </button>
        </li>
        <hr />
      </ul>
    );
  };
}

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number,
  postCount: PropTypes.number,
  pageCount: PropTypes.number,
  goTo: PropTypes.func,
};
