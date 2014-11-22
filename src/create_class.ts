/// <reference path="../typings/react/react.d.ts" />
import ComponentClass = require("./component_class");
import React = require("react");

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

function createClass<P, S>(clazz: ComponentClass<P, S>): React.ReactComponentFactory<P> {
    var key: string;
    var spec: React.Specification<P, S> = (<React.Specification<P, S>>{});
    spec.displayName = clazz.prototype.constructor.name;
    for (key in clazz.prototype) {
        if (!ILLEGAL_KEYS[key]) {
            (<any>spec)[key] = (<any>clazz.prototype)[key];
        }
    }
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
    return React.createClass(spec);
}

export = createClass;
