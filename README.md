# Typed React 

[![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url]

A binding layer between React and TypeScript for the `React.createClass` syntax. With React 0.13, you can use ES6 classes to inherit from React components. This works well with TypeScript and you can just use the [type definitions][type-definitions] in DefinitelyTyped. The inheritance path has some different functionality so you may still want to use the `React.createClass` pattern. TypedReact can help you implement that pattern by providing a dummy parent class and a set of functions to appropriately extract the prototype for `React.createClass`

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

[travis-url]: http://travis-ci.org/Asana/typed-react
[travis-image]: http://img.shields.io/travis/Asana/typed-react/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/Asana/typed-react
[coveralls-image]: https://img.shields.io/coveralls/Asana/typed-react/master.svg?style=flat-square

[type-definitions]: https://github.com/borisyankov/DefinitelyTyped/tree/master/react
