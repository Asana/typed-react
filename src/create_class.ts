import extractPrototype = require("./extract_prototype");
import Component = require("./component");
import react = require("react");

function createClass<P, S>(clazz: { new(): Component<P, S> }, mixins?: react.Mixin<P, S>[]): react.ComponentClass<P> {
    var spec: react.ComponentSpec<P, S> = extractPrototype(clazz);
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
    return react.createClass(spec);
}

export = createClass;
