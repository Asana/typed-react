import Mixin = require("././mixin");
import react = require("react");

class Component<P, S> extends Mixin<P, S> implements react.ClassicComponent<P, S> {
    render(): react.ReactElement<any> {
        return null;
    }
}

export = Component;
