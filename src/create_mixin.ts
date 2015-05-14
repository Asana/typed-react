import extractPrototype = require("./extract_prototype");
import Mixin = require("./mixin");
import react = require("react");

function createMixin<P, S>(clazz: { new(): Mixin<P, S> }): react.Mixin<P, S> {
    return extractPrototype(clazz);
}

export = createMixin;
