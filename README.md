Typed React
===========

A binding layer between React and TypeScript. React currently uses a `createClass` function which takes in a component specification and then binds the value of `this`. Unfortunately TypeScript does not support that currently but there are several proposals to do that in the future. In the meantime, this library quite simple provides a class to extend and factory function to conver the prototype for `createClass`.

Example
-------

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
            tickElapsed: this.state.tickElapsed + 1
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

export var factory = TypedReact.createFactory(Timer);
```

In this case we export the Props and the Factory but we could make the props and state inline interfaces and just export the factory function.

Development Setup
-----------------

```sh
npm install -g gulp
npm install -g tsd
git clone git@github.com:Asana/typed-react.git
cd typed-react
npm install
tsd reinstall --overwrite --save
```
