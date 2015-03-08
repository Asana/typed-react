/// <reference path="../typings/react/react.d.ts"/>
import Mixin = require("././mixin");

class Component<P, S> extends Mixin<P, S> implements React.CompositeComponent<P, S> {
    render(): React.ReactElement<any> {
        return null;
    }
}

export = Component;
