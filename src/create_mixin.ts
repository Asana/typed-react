/// <reference path="../typings/react/react.d.ts"/>
import extractPrototype = require("./extract_prototype");
import Mixin = require("./mixin");

function createMixin<P, S>(clazz: { new(): Mixin<P, S> }): React.Mixin<P, S> {
    return extractPrototype(clazz);
}

export = createMixin;
