import React, { Component } from 'react';
import { Switch } from './switch';

class Toggle extends Component {
    state = {on: false}
    isControlled(prop) {
        return this.props[prop] !== undefined
    }
    getState() {
        return {
            on: this.props.on !== undefined ? this.props.on : this.state.on,
        }
    }
    toggle = () => {
        if (this.isControlled('on')) {
            this.props.onToggle(!this.getState().on)
        } else {
            this.setState(
                ({on}) => ({on: !on}),
                () => {
                    this.props.onToggle(this.getState().on)
                },
            )
        }
    }
    render() {
        return <Switch on={this.getState().on} onClick={this.toggle} />
    }
}

class Usage extends Component {
    state = {bothOn: false}
    handleToggle = on => {
        this.setState({bothOn: on})
    }
    render() {
        const {bothOn} = this.state
        const {toggle1Ref, toggle2Ref} = this.props
        return (
            <div>
                <Toggle
                    // on={bothOn}
                    onToggle={this.handleToggle}
                    ref={toggle1Ref}
                />
                <Toggle
                    on={bothOn}
                    onToggle={this.handleToggle}
                    ref={toggle2Ref}
                />
            </div>
        )
    }
}

export default Usage
