import React, { Component } from 'react';
import { Switch } from './switch';

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

class Toggle extends Component {
  static defaultProps = {
    onReset: () => {},
    initialOn: false,
    stateReducer: (state, changes) => changes,
  }
  static stateChangeTypes = {
    reset: '__reset__',
    toggle: '__toggle__',
  }
  initialState = {on: this.props.initialOn}
  state = this.initialState
  internalSetState(changes, callback) {
    this.setState(state => {
      const changesObject =
        typeof changes === 'function' ? changes(state) : changes
      
        const reducedChanges =
          this.props.stateReducer(state, changesObject) || {}

        const {type: ignoredType, ...onlyChanges} = reducedChanges;

        return Object.keys(onlyChanges).length
          ? onlyChanges
          : null
    }, callback)
  }
  toggle = ({type = Toggle.stateChangeTypes.toggle} = {}) =>
    this.internalSetState(
      ({on}) => ({on: !on, type}),
      () => this.props.onToggle(this.state.on),
    )
  reset = () =>
      this.internalSetState({...this.initialState, type: Toggle.stateChangeTypes.reset}, () =>
        this.props.onReset(this.state.on),
      )
  getTogglerProps = ({onClick, ...props} = {}) => ({
    'aria-pressed': this.state.on,
    onClick: callAll(onClick, () => this.toggle()),
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
class Usage extends Component {
  static defaultProps = {
    onToggle: (...args) => console.log('onToggle', ...args),
    onReset: (...args) => console.log('onReset', ...args),
  }

  initialState = {timesClicked: 0}
  state = this.initialState
  handleToggle = (...args) => {
    this.setState(({timesClicked}) => ({
      timesClicked: timesClicked + 1,
    }))
    this.props.onToggle(...args)
  }
  handleReset = (...args) => {
    this.setState(this.initialState)
    this.props.onReset(...args)
  }
  toggleStateReducer = (state, changes) => {
    if (changes.type === 'forced') {
      return changes
    }
    if (this.state.timesClicked >= 4) {
      return {...changes, on: false}
    }
    return changes
  }
  render() {
    const {timesClicked} = this.state
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
      >
        {({on, toggle, reset, getTogglerProps}) => (
          <div>
            <Switch 
              {...getTogglerProps({
                on: on,
              })} 
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
                <button onClick={() => toggle({type: 'forced'})}>
                  Force toggle
                </button>
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">
                Click count: {timesClicked}
              </div>
            ) : null}
            <button onClick={reset}>
              Reset
            </button>
          </div>
        )}
      </Toggle>
    )
  }
}

export default Usage
