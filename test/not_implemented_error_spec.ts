/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import TypedReact = require("../src/index");

var expect = chai.expect;

describe("NotImplementedError", () => {
    var err: TypedReact.NotImplementedError;
    var methodName = "chai";

    beforeEach(() => {
        err = new TypedReact.NotImplementedError(methodName);
    });

    it("should have a name", () => {
        expect(err.name).to.equal("NotImplementedError");
    });

    it("should have a message", () => {
        expect(err.message).to.equal(methodName + " should be implemented by React");
    });
});
