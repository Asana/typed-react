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

    render(): React.ReactElement<any, any> {
        return null;
    }
}

export interface ClassCreator<P, S> {
    (specification: React.Specification<P, S>): React.ReactComponentFactory<P>;
}

export interface FactoryCreator<P> {
    (clazz: React.ReactComponentFactory<P>): React.ReactComponentFactory<P>;
}

export interface ComponentClass<P, S> {
    new(): Component<P, S>
}

export function createClass<P, S>(
    createClass: ClassCreator<P, S>,
    clazz: ComponentClass<P, S>): React.ReactComponentFactory<P> {
    var displayName = clazz.prototype.constructor.name;
    // Do not override React
    delete clazz.prototype.constructor;
    delete clazz.prototype.getDOMNode;
    delete clazz.prototype.setState;
    delete clazz.prototype.replaceState;
    delete clazz.prototype.forceUpdate;
    delete clazz.prototype.isMounted;
    delete clazz.prototype.transferPropsTo;
    delete clazz.prototype.setProps;
    delete clazz.prototype.replaceProps;
    var spec: React.Specification<P, S> = clazz.prototype;
    spec.displayName = displayName;
    return createClass(spec);
}

export function createFactory<P, S>(
    createClass_: ClassCreator<P, S>,
    createFactory: FactoryCreator<P>,
    clazz: ComponentClass<P, S>): React.ReactComponentFactory<P> {
    return createFactory(createClass(createClass_, clazz));
}

