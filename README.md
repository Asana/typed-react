# Typed React [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url]

A binding layer between React and TypeScript. React currently uses a `createClass` function which takes in a component specification and then binds the value of `this`. Unfortunately TypeScript does not support that currently but there are several proposals to do that in the future. React moving to a world which supports ES6 classes will also make this unnecessary. In the meantime, this library quite simple provides a class to extend and factory function to convert the prototype for `createClass`.

This library will change dramatically with the release of React 0.13. The goal
will be to provide traditional React semantics, such as Mixins with the new
ES6 style classes.

The documentation can be found at [http://asana.github.io/typed-react/](http://asana.github.io/typed-react/). 

## Installation

```sh
npm install typed-react --save
```

## Example

```ts
/// <reference path='../path/to/react.d.ts' />
/// <reference path='../path/to/typed-react.d.ts' />

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

export var timer = TypedReact.createClass(Timer);
```

In this case we export the Props and the Factory but we could make the props and state inline interfaces and just export the factory function.

## Mixins

TypedReact supports using existing React Mixins as well as defining new mixins with idiomatic TypeScript. The example is based on [http://www.typescriptlang.org/Handbook#mixins](http://www.typescriptlang.org/Handbook#mixins). You need to use `extractPrototype` on your own mixins and should export that from your mixin modules.

```ts
/// <reference path='../path/to/react.d.ts' />
/// <reference path='../path/to/typed-react.d.ts' />

import React = require("react/addons");
import TypedReact = require("typed-react");

export interface GreeterProps {
    name: string;
}

class GreetingMixin extends TypedReact.Mixin<GreeterProps, {}> {
    greet(greeting: string): React.ReactHTMLElement {
        return React.DOM.h1(null, greeting, this.props.name);
    }
}

class Greeter extends TypedReact.Component<GreeterProps, {}> implements GreetingMixin {
    greet: (greeting: string) => React.ReactHTMLElement;

    render() {
        return this.greet(this.greeting);
    }
}

export var greeter = TypedReact.createClass(Greeter, [
    TypedReact.createMixin(GreetingMixin),
    React.addons.PureRenderMixin
]);
```

## Changelog

- **3.3** Updating the React type definitions and moving the location of the type definition
- **3.2** Update with new `react.d.ts` typings
- **3.1** `extractPrototype` is now `createMixin`
- **3.0** Idiomatic Mixin Support
- **2.2** Making React a peer dependency. This means you do not need to pass `React.createClass` into `createClass`.
- **2.1** Switching to createClass
- **2.0** React 0.12.RC
- **1.4** Removed incorrect mixin support
- **1.3** Mixins

## Development Setup

```sh
git clone git@github.com:Asana/typed-react.git
cd typed-react
npm install
npm run typings
npm test
```

[npm-url]: https://www.npmjs.org/package/typed-react
[npm-image]: http://img.shields.io/npm/v/typed-react.svg?style=flat-square

[travis-url]: http://travis-ci.org/Asana/Asana/typed-react
[travis-image]: http://img.shields.io/travis/Asana/typed-react/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/Asana/typed-react
[coveralls-image]: https://img.shields.io/coveralls/Asana/typed-react/master.svg?style=flat-square
