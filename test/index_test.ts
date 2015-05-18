import chai = require("chai");
import index = require("../src/index");

suite("Index", () => {
    test("name", () => {
        chai.assert.equal(index.name, "typescript-starter");
    });

    test("parent", () => {
        chai.assert.instanceOf(new index.Parent(), index.Parent);
    });

    test("child", () => {
        var child = new index.Child();
        chai.assert.instanceOf(child, index.Parent);
        chai.assert.instanceOf(child, index.Child);
    });

    test.skip("sourcemaps", () => {
        // Tests that sourcemaps work
        throw new Error("test");
    });
});
