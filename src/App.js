import React, { Component } from 'react';
import { Switch } from './switch';

class Toggle extends Component {
  state = {
    on: false,
  }

  render() {
    return (
      <Switch on={this.state.on} />
    );
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />
}

export default Usage;
