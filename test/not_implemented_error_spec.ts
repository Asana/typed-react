/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import TypedReact = require("../src/index");

var assert = chai.assert;

describe("NotImplementedError", () => {
    var err: TypedReact.NotImplementedError;
    var methodName = "chai";

    beforeEach(() => {
        err = new TypedReact.NotImplementedError(methodName);
    });

    it("should have a name", () => {
        assert.equal(err.name, "NotImplementedError");
    });

    it("should have a message", () => {
        assert.equal(err.message, methodName + " should be implemented by React");
    });
});
