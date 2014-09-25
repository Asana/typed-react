/// <reference path="../typings/jest/jest.d.ts" />
jest.autoMockOff();
import NotImplementedError = require("../src/not_implemented_error");

describe("NotImplementedError", () => {
    var err: NotImplementedError;
    var methodName = "chai";

    beforeEach(() => {
        err = new NotImplementedError(methodName);
    });

    it("should have a name", () => {
        expect(err.name).toEqual("NotImplementedError");
    });

    it("should have a message", () => {
        expect(err.message).toEqual(methodName + " should be implemented by React");
    });
});
