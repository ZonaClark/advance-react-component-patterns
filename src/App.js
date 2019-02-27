import React, { Component } from 'react';
import { Switch } from './switch';

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

class Toggle extends Component {
  static defaultProps = {
    onReset: () => {},
    initialOn: false,
  }
  initialState = {on: this.props.initialOn}
  state = this.initialState
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  reset = () =>
      this.setState(this.initialState, () =>
        this.props.onReset(this.state.on),
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
      reset: this.reset,
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
  initialOn = true,
  onReset = (...args) => console.log('onReset', ...args),
}) {
  return (
    <Toggle
      initialOn={initialOn}
      onToggle={onToggle}
      onReset={onReset}
    >
      {({on, getTogglerProps, reset}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr />
          <button onClick={reset}>
            Reset
          </button>
        </div>
      )}
    </Toggle>
  )
}

export default Usage
