/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import TypedReact = require("../src/index");

var assert = chai.assert;

suite("NotImplementedError", () => {
    var err: TypedReact.NotImplementedError;
    var methodName = "chai";

    suiteSetup(() => {
        err = new TypedReact.NotImplementedError(methodName);
    });

    test("should have a name", () => {
        assert.equal(err.name, "NotImplementedError");
    });

    test("should have a message", () => {
        assert.equal(err.message, methodName + " should be implemented by React");
    });
});
