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
    render() {
        return React.DOM.h1(null, "Greetings, ", this.props.name);
    }
}

describe("createClass", () => {
    var spec: React.ReactComponentFactory<FactoryProps>;
    var descriptor: React.ReactComponentElement<FactoryProps>;
    var name = "and salad dressings";

    beforeEach(() => {
        spec = TypedReact.createClass<FactoryProps, FactoryState>(React.createClass, FactoryTest);
        descriptor = React.createElement(spec, {
            name: name
        });
    });

    it("should produce a valid descriptor", () => {
        expect(React.isValidElement(descriptor)).to.be.true;
        expect(descriptor.props.name).to.equal(name);
    });

    it("should be renderable", () => {
        expect(React.renderToStaticMarkup(descriptor)).to.equal("<h1>Greetings, and salad dressings</h1>");
    });
});

describe("createFactory", () => {
    var factory: React.ReactComponentFactory<FactoryProps>;
    var descriptor: React.ReactComponentElement<FactoryProps>;
    var name = "test";

    beforeEach(() => {
        factory = TypedReact.createFactory<FactoryProps, FactoryState>(React.createClass, React.createFactory, FactoryTest);
        descriptor = factory({
            name: name
        });
    });

    it("should produce a valid descriptor", () => {
        expect(React.isValidElement(descriptor)).to.be.true;
        expect(descriptor.props.name).to.equal(name);
    });
});
