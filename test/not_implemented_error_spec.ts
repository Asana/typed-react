/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import NotImplementedError = require("../src/not_implemented_error");

var assert = chai.assert;

describe("NotImplementedError", () => {
    var err: NotImplementedError;
    var methodName = "chai";

    beforeEach(() => {
        err = new NotImplementedError(methodName);
    });

    it("should have a name", () => {
        assert.equal(err.name, "NotImplementedError");
    });

    it("should have a message", () => {
        assert.equal(err.message, methodName + " should be implemented by React");
    });
});
