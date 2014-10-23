import Component = require("./component");

interface ComponentClass<P, S> {
    new (): Component<P, S>
}

export = ComponentClass;
