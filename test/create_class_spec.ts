/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import React = require("react");
import TypedReact = require("../src/index");

var assert = chai.assert;

interface FactoryProps {
    name: string;
    callback?: () => void;
}

interface FactoryState {
}

class FactoryTest extends TypedReact.Component<FactoryProps, FactoryState> {
    greeting: string = "Greetings, ";

    render() {
        return React.DOM.h1(null, this.greeting, this.props.name);
    }
}

class ComponentWillMountTest extends FactoryTest {
    componentWillMount() {
        this.props.callback();
    }
}

class InheritanceTest extends FactoryTest {
}

class LifeCycleMixin extends TypedReact.Mixin<FactoryProps, FactoryState> {
    componentWillMount() {
        this.props.callback();
    }
}

class HelperMixin extends TypedReact.Mixin<FactoryProps, FactoryState> {
    greet(greeting: string): React.ReactHTMLElement {
        return React.DOM.h1(null, greeting, this.props.name);
    }
}

class MixinTest extends FactoryTest implements HelperMixin {
    greet: (greeting: string) => React.ReactHTMLElement;

    render() {
        return this.greet(this.greeting);
    }
}

describe("createFactory", () => {
    var clazz: React.ComponentClass<FactoryProps>;
    var factory: React.ComponentFactory<FactoryProps>;
    var element: React.ReactElement<FactoryProps>;
    var name = "test";

    beforeEach(() => {
        clazz = TypedReact.createClass(FactoryTest);
        factory = React.createFactory<FactoryProps>(clazz);
        element = factory({
            name: name
        });
    });

    it("should produce a valid element", () => {
        assert.isTrue(React.isValidElement(element));
        assert.equal(element.props.name, name);
    });

    it("should keep class properties", () => {
        assert.equal(React.renderToStaticMarkup(factory({
            name: "Asana"
        })), "<h1>Greetings, Asana</h1>");
    });

    it("should keep componentWillMount code", () => {
        var willMountClazz = TypedReact.createClass(ComponentWillMountTest);
        var willMountFactory = React.createFactory(willMountClazz);
        var wasCalled = false;
        assert.equal(React.renderToStaticMarkup(willMountFactory({
            name: "Asana",
            callback: () => {
                wasCalled = true;
            }
        })), "<h1>Greetings, Asana</h1>");
        assert.isTrue(wasCalled);
    });

    it("should keep inherited methods and props", () => {
        var inheritedClazz = TypedReact.createClass(InheritanceTest);
        var inheritedFactory = React.createFactory(inheritedClazz);
        assert.equal(React.renderToStaticMarkup(inheritedFactory({
            name: "Asana"
        })), "<h1>Greetings, Asana</h1>");
    });

    it("should handle life cycle mixins", () => {
        var willMountClazz = TypedReact.createClass(ComponentWillMountTest, [
            TypedReact.createMixin(LifeCycleMixin)
        ]);
        var willMountFactory = React.createFactory(willMountClazz);
        var callCount = 0;
        assert.equal(React.renderToStaticMarkup(willMountFactory({
            name: "Asana",
            callback: () => {
                callCount++;
            }
        })), "<h1>Greetings, Asana</h1>");
        assert.equal(callCount, 2);
    });

    it("should handle normal mixins", () => {
        var mixinClazz = TypedReact.createClass(MixinTest, [
            TypedReact.createMixin(HelperMixin)
        ]);
        var mixinFactory = React.createFactory(mixinClazz);
        assert.equal(React.renderToStaticMarkup(mixinFactory({
            name: "Asana"
        })), "<h1>Greetings, Asana</h1>");
    });
});
