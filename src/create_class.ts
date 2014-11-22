/// <reference path="../typings/react/react.d.ts" />
import ComponentClass = require("./component_class");
import extractPrototype = require("./extract_prototype");
import React = require("react");

function createClass<P, S>(clazz: ComponentClass<P, S>, mixins?: React.Mixin<P, S>[]): React.ReactComponentFactory<P> {
    var spec: React.Specification<P, S> = extractPrototype(clazz);
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

export = createClass;
