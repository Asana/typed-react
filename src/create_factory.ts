import ClassCreator = require("./class_creator");
import ComponentClass = require("./component_class");
import FactoryCreator = require("./factory_creator");
import createClass = require("./create_class");

function createFactory<P, S>(
    createClass_: ClassCreator<P, S>,
    createFactory: FactoryCreator<P>,
    clazz: ComponentClass<P, S>): React.ReactComponentFactory<P> {
    return createFactory(createClass(createClass_, clazz));
}

export = createFactory;
