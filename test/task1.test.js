const assert = require("assert");
const task1 = require("../task1");
describe("Task 1", function() {
  it("should return 3m3o2t2o5r2w1a4y", function() {
    assert.equal(
      task1([
        "m",
        "m",
        "m",
        "o",
        "o",
        "o",
        "t",
        "t",
        "o",
        "o",
        "r",
        "r",
        "r",
        "r",
        "r",
        "w",
        "w",
        "a",
        "y",
        "y",
        "y",
        "y"
      ]),
      "3m3o2t2o5r2w1a4y"
    );
  });
});
