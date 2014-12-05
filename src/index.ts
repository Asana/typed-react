/// <reference path="../typings/react/react.d.ts" />
import React = require("react");

export class NotImplementedError implements Error {
    public name = "NotImplementedError";
    public message: string;

    constructor(methodName: string) {
        this.message = methodName + " should be implemented by React";
    }
}

export class Mixin<P, S> implements React.Mixin<P, S> {
    public refs: {
        [key: string]: React.Component<any>
    };
    public props: P;
    public state: S;

    getDOMNode(): Element {
        throw new NotImplementedError("getDomNode");
    }

    setState(nextState: S, callback?: () => void): void {
        throw new NotImplementedError("setState");
    }

    replaceState(nextState: S, callback?: () => void): void {
        throw new NotImplementedError("replaceState");
    }

    forceUpdate(callback?: () => void): void {
        throw new NotImplementedError("forceUpdate");
    }

    isMounted(): boolean {
        throw new NotImplementedError("isMounted");
    }

    setProps(nextProps: P, callback?: () => void): void {
        throw new NotImplementedError("setProps");
    }

    replaceProps(nextProps: P, callback?: () => void): void {
        throw new NotImplementedError("replaceProps");
    }
}

export class Component<P, S> extends Mixin<P, S> implements React.CompositeComponent<P, S> {
    render(): React.ReactElement<any> {
        return null;
    }
}

var ILLEGAL_KEYS: { [key: string]: boolean } = {
    constructor: true,
    refs: true,
    props: true,
    state: true,
    getDOMNode: true,
    setState: true,
    replaceState: true,
    forceUpdate: true,
    isMounted: true,
    setProps: true,
    replaceProps: true
};

function extractPrototype<T>(clazz: { new (): T }): T {
    var proto: T = (<T>{});
    for (var key in clazz.prototype) {
        if (ILLEGAL_KEYS[key] === undefined) {
            (<any>proto)[key] = clazz.prototype[key];
        }
    }
    return proto;
}

export function createMixin<P, S>(clazz: { new(): Mixin<P, S> }): React.Mixin<P, S> {
    return extractPrototype(clazz);
}

export function createClass<P, S>(clazz: { new(): Component<P, S> }, mixins?: React.Mixin<P, S>[]): React.ComponentClass<P> {
    var spec: React.ComponentSpec<P, S> = extractPrototype(clazz);
    spec.displayName = clazz.prototype.constructor.name;
    if (spec.componentWillMount !== undefined) {
        var componentWillMount = spec.componentWillMount;
        spec.componentWillMount = function() {
            clazz.apply(this);
            componentWillMount.apply(this);
        };
    } else {
        spec.componentWillMount = function() {
            clazz.apply(this);
        };
    }
    if (mixins !== undefined && mixins !== null) {
        spec.mixins = mixins;
    }
    return React.createClass(spec);
}
