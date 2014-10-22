import ClassCreator = require("./class_creator");
import ComponentClass = require("./component_class");
import FactoryCreator = require("./factory_creator");

function createFactory<P, S>(
    createClass: ClassCreator<P, S>,
    createFactory: FactoryCreator<P>,
    clazz: ComponentClass<P, S>): React.ReactComponentFactory<P> {
    var displayName = clazz.prototype.constructor.name;
    // Do not override React
    delete clazz.prototype.constructor;
    delete clazz.prototype.getDOMNode;
    delete clazz.prototype.setState;
    delete clazz.prototype.replaceState;
    delete clazz.prototype.forceUpdate;
    delete clazz.prototype.isMounted;
    delete clazz.prototype.transferPropsTo;
    delete clazz.prototype.setProps;
    delete clazz.prototype.replaceProps;
    var spec: React.Specification<P, S> = clazz.prototype;
    spec.displayName = displayName;
    return createFactory(createClass(spec));
}

export = createFactory;
