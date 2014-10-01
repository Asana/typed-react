/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import TypedReact = require("../src/index");

var expect = chai.expect;

describe("Component", () => {
    var component: TypedReact.Component<any, any>;

    beforeEach(() => {
        component = new TypedReact.Component<any, any>();
    });

    it("should not have refs", () => {
        expect(component.refs).to.be.undefined;
    });

    it("should not have props", () => {
        expect(component.props).to.be.undefined;
    });

    it("should not have state", () => {
        expect(component.state).to.be.undefined;
    });

    var testNotImplemented = (methodName: string, fn: () => void): void => {
        it("should throw for " + methodName, () => {
            var err = new TypedReact.NotImplementedError(methodName);
            expect(fn).to.throw(err);
        });
    };

    testNotImplemented("getDomNode", () => {
        component.getDomNode();
    });

    testNotImplemented("setState", () => {
        component.setState(null);
    });

    testNotImplemented("replaceState", () => {
        component.replaceState(null);
    });

    testNotImplemented("forceUpdate", () => {
        component.forceUpdate();
    });

    testNotImplemented("isMounted", () => {
        component.isMounted();
    });

    testNotImplemented("transferPropsTo", () => {
        component.transferPropsTo(null);
    });

    testNotImplemented("setProps", () => {
        component.setProps(null);
    });

    testNotImplemented("replaceProps", () => {
        component.replaceProps(null);
    });

    it("should return null from render", () => {
        expect(component.render()).to.be.null;
    });
});
