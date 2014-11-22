/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import TypedReact = require("../src/index");

var assert = chai.assert;

describe("TypedReact", () => {
    it("should have Component", () => {
        assert.property(TypedReact, "Component");
    });

    it("should have createClass", () => {
        assert.property(TypedReact, "createClass");
    });

    it("should have NotImplementedError", () => {
        assert.property(TypedReact, "NotImplementedError");
    });
});
