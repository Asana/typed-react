/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import Component = require("../src/component");
import NotImplementedError = require("../src/not_implemented_error");

describe("Component", () => {
    var component: Component<any, any>;

    beforeEach(() => {
        component = new Component<any, any>();
    });

    it("should not have refs", () => {
        chai.expect(component).to.not.have.property("refs");
    });

    it("should not have props", () => {
        chai.expect(component).to.not.have.property("props");
    });

    it("should not have state", () => {
        chai.expect(component).to.not.have.property("state");
    });

    var testNotImplemented = (methodName: string, fn: () => void): void => {
        it("should throw for " + methodName, () => {
            chai.expect(fn).to.throw(NotImplementedError, methodName);
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
        chai.expect(component.render()).to.be.null;
    });
});
