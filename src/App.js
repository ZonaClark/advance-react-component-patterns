import React, { Component } from 'react';
import { Switch } from './switch';

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

class Toggle extends Component {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  getTogglerProps = ({onClick, ...props} = {}) => ({
    'aria-pressed': this.state.on,
    onClick: callAll(onClick, this.toggle),
    ...props,
  })
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      getTogglerProps: this.getTogglerProps,
    }
  }
    
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

// root
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
  onButtonClick = () => console.log('onButtonClick'),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, getTogglerProps}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr />
          <button
            {...getTogglerProps({
              'aria-label': 'custom-button',
              id: "custom-button-id",
              onClick: onButtonClick,
            })}
          >
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}

export default Usage
