import chai = require("chai");
import index = require("../src/index");

suite("Index", () => {
    test("name", () => {
        chai.assert.equal(index.name, "typescript-starter");
    });
});
