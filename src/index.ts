import React = require("react");

export class NotImplementedError implements Error {
    public name = "NotImplementedError";
    public message: string;

    constructor(methodName: string) {
        this.message = methodName + " should be implemented by React";
    }
}

export class Component<P, S> implements React.Specification<P, S>, React.Component<P, S> {
    public refs: {
        [key: string]: React.DomReferencer
    };
    public props: P;
    public state: S;

    getDomNode(): Element {
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

    transferPropsTo(target: React.Factory<P>): React.Descriptor<P> {
        throw new NotImplementedError("transferPropsTo");
    }

    setProps(nextProps: P, callback?: () => void): void {
        throw new NotImplementedError("setProps");
    }

    replaceProps(nextProps: P, callback?: () => void): void {
        throw new NotImplementedError("replaceProps");
    }

    render(): React.Descriptor<any> {
        return null;
    }
}

export function createFactory<P, S>(component: { new (): Component<P, S> }, mixins: React.Mixin<P, S>[]= []): React.Factory<P> {
    var displayName = component.prototype.constructor.name;
    // Do not override React
    delete component.prototype.constructor;
    delete component.prototype.getDomNode;
    delete component.prototype.setState;
    delete component.prototype.replaceState;
    delete component.prototype.forceUpdate;
    delete component.prototype.isMounted;
    delete component.prototype.transferPropsTo;
    delete component.prototype.setProps;
    delete component.prototype.replaceProps;
    var spec: React.Specification<P, S> = component.prototype;
    spec.displayName = displayName;
    spec.mixins = mixins;
    return React.createClass(spec);
}
