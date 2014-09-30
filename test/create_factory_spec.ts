/// <reference path="../typings/jest/jest.d.ts" />
jest.autoMockOff();
import TypedReact = require("../src/index");
import React = require("react");

interface FactoryProps {
    name: string;
}

interface FactoryState {
}

class FactoryTest extends TypedReact.Component<FactoryProps, FactoryState> {
    render() {
        return React.DOM.h1(null, "Greetings", name);
    }
}

describe("createFactory", () => {
    var factory: React.Factory<FactoryProps>;
    var descriptor: React.Descriptor<FactoryProps>;
    var name = "jest";

    beforeEach(() => {
        factory = TypedReact.createFactory(FactoryTest);
        descriptor = factory({
            name: name
        });
    });

    it("should be a factory", () => {
        expect(React.isValidClass(factory)).toBeTruthy();
    });

    it("should produce a valid descriptor", () => {
        expect(React.isValidComponent(descriptor)).toBeTruthy();
        expect(descriptor.props.name).toEqual(name);
    });
});
