import NotImplementedError = require("./not_implemented_error");
import React = require("react");

class Component<P, S> implements React.Specification<P, S>, React.Component<P, S> {
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

    render(): React.Descriptor<P> {
        return null;
    }
}

export = Component;
