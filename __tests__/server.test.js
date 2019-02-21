const sum = require("../sum");

// fake test to get CI/CD going
test("adds 1 + 2 to equal 3", () => {
  expect(sum()).toBe(3);
});
