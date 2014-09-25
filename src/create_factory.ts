import Component = require("./component");
import React = require("react");

function createFactory<P, S>(component: {new(): Component<P, S>}, mixins: React.Mixin<P, S>[] = []): React.Factory<P> {
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

export = createFactory;
