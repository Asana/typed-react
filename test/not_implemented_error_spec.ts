/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import NotImplementedError = require("../src/not_implemented_error");

describe("NotImplementedError", () => {
    var err: NotImplementedError;
    var methodName = "chai";

    beforeEach(() => {
        err = new NotImplementedError(methodName);
    });

    it("should have a name", () => {
        chai.expect(err).to.have.property("name", "NotImplementedError");
    });

    it("should have a message", () => {
        chai.expect(err).to.have.property("message", methodName + " should be implemented by React");
    });
});
