import NotImplementedError = require("./not_implemented_error");
import react = require("react");

class Mixin<P, S> implements react.Mixin<P, S> {
    public refs: {
        [key: string]: react.Component<any, any>
    };
    public props: P;
    public state: S;
    public context: any;

    getDOMNode(): Element {
        throw new NotImplementedError("getDomNode");
    }

    setState(nextState: S | ((prevState: S, props: P) => S), callback?: () => void): void {
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

export = Mixin;
