import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { SpringSystem, MathUtil } from 'rebound';

export default class SpringScrollbars extends Component {
  componentDidMount = () => {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
  }

  componentWillUnmount = () => {
    this.springSystem.deregisterSpring(this.spring);
    this.springSystem.removeAllListeners();
    this.springSystem = undefined;
    this.spring.destroy();
    this.spring = undefined;
  }

  scrollTop = top => {
    const { scrollbars } = this.refs;
    const scrollTop = scrollbars.getScrollTop();
    const scrollHeight = scrollbars.getScrollHeight();
    const val = MathUtil.mapValueInRange(top, 0, scrollHeight, scrollHeight * 0.2, scrollHeight * 0.8);
    this.spring.setCurrentValue(scrollTop).setAtRest();
    this.spring.setEndValue(val);
  }

  handleSpringUpdate = spring => this.refs.scrollbars.scrollTop(spring.getCurrentValue());

  render = () => (
    <Scrollbars
      {...this.props}
      ref="scrollbars"
      style={{ width: '100%', top: '50px' }}
      autoHeight
      autoHeightMin={`calc(100vh - 50px)`}
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      renderThumbVertical={props => <div {...props} className="scrollbar"/>}
    />
  )
}
