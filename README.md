# Typed React [![build status](http://img.shields.io/travis/Asana/typed-react.svg?style=flat-square)](https://travis-ci.org/Asana/typed-react)

A binding layer between React and TypeScript. React currently uses a `createClass` function which takes in a component specification and then binds the value of `this`. Unfortunately TypeScript does not support that currently but there are several proposals to do that in the future. React moving to a world which supports ES6 classes will also make this unnecessary. In the meantime, this library quite simple provides a class to extend and factory function to convert the prototype for `createClass`.

## Installation

```sh
npm install typed-react --save
```

## Example

```ts
import React = require("react");
import TypedReact = require("typed-react");

export interface TimerProps {
    tickInterval: number;
}

interface TimerState {
    ticksElapsed: number;
}

class Timer extends TypedReact.Component<TimerProps, TimerState> {
    private interval: number;

    getInitialState() {
        return {
            ticksElapsed: 0
        };
    }

    tick() {
        this.setState({
            ticksElapsed: this.state.ticksElapsed + 1
        });
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, this.props.tickInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return React.DOM.div(null, "Ticks Elapsed: ", this.state.ticksElapsed);
    }
}

export var timer = TypedReact.createClass<TimerProps, TimerState>(React.createClass, Timer);
```

In this case we export the Props and the Factory but we could make the props and state inline interfaces and just export the factory function.

## Changelog

- *2.1* Switching to createClass
- *2.0* React 0.12.RC
- *1.4* Removed incorrect mixin support
- *1.3* Mixins

## Development Setup

```sh
npm install -g gulp
npm install -g tsd
git clone git@github.com:Asana/typed-react.git
cd typed-react
npm install
tsd reinstall --overwrite --save
```
