/// <reference path="../typings/jest/jest.d.ts" />
jest.autoMockOff();
import TypedReact = require("../src/index");

describe("NotImplementedError", () => {
    var err: TypedReact.NotImplementedError;
    var methodName = "chai";

    beforeEach(() => {
        err = new TypedReact.NotImplementedError(methodName);
    });

    it("should have a name", () => {
        expect(err.name).toEqual("NotImplementedError");
    });

    it("should have a message", () => {
        expect(err.message).toEqual(methodName + " should be implemented by React");
    });
});
