/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import TypedReact = require("../src/index");
import React = require("react/addons");

var expect = chai.expect;

interface FactoryProps {
    name: string;
}

interface FactoryState {
}

class FactoryTest extends TypedReact.Component<FactoryProps, FactoryState> {
    greeting: string = "Greetings, ";

    render() {
        return React.DOM.h1(null, this.greeting, this.props.name);
    }
}

class InheritanceTest extends FactoryTest {
}

describe("createFactory", () => {
    var clazz: React.ReactComponentFactory<FactoryProps>;
    var factory: React.ReactComponentFactory<FactoryProps>;
    var descriptor: React.ReactComponentElement<FactoryProps>;
    var name = "test";

    beforeEach(() => {
        clazz = TypedReact.createClass<FactoryProps, FactoryState>(React.createClass, FactoryTest);
        factory = React.createFactory(clazz);
        descriptor = factory({
            name: name
        });
    });

    it("should produce a valid descriptor", () => {
        expect(React.isValidElement(descriptor)).to.be.true;
        expect(descriptor.props.name).to.equal(name);
    });

    it("should keep class properties", () => {
        expect(React.renderToStaticMarkup(factory({name: "Asana"}))).to.equal("<h1>Greetings, Asana</h1>");
    });

    it("should keep inherited methods and props", () => {
        var inheritedClazz = TypedReact.createClass<FactoryProps, FactoryState>(React.createClass, InheritanceTest);
        var inheritedFactory = React.createFactory(inheritedClazz);
        expect(React.renderToStaticMarkup(inheritedFactory({name: "Asana"}))).to.equal("<h1>Greetings, Asana</h1>");
    });
});
