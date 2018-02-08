import React from 'react';
import { animateScroll as Nav } from 'react-scroll';

export default ({scrollY}) => (
  scrollY >= 1200
  ? <div
      key="scrolltotop"
      onClick={() =>
        Nav.scrollTo(0, { duration: 1000, smooth: 'easeInOutQuint' })}
      className="scroll"
    >
      <span className="icon">
        <i className="fa fa-angle-double-up" aria-hidden="true" />
      </span>
      <span className="text">Top</span>
    </div>
  : <div
      key="scrolltobottom"
      onClick={() =>
        Nav.scrollToBottom({
          duration: 1000,
          smooth: 'easeInOutQuint'
        })}
      className="scroll"
    >
      <span className="text">Bottom</span>
      <span className="icon">
        <i className="fa fa-angle-double-down" aria-hidden="true" />
      </span>
    </div>
);
