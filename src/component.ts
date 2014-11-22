import Mixin = require("./mixin");

class Component<P, S> extends Mixin<P, S> implements React.Specification<P, S>, React.Component<P, S> {
    render(): React.ReactElement<any, any> {
        return null;
    }
}

export = Component;
