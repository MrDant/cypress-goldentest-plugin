const { matcher } = require("./constants");
Cypress.Commands.add(
  "goldenTest",
  {
    prevSubject: "optional",
  },
  (subject = cy, arg1, options) => {
    // no filename
    if (typeof arg1 === "object") {
      options = arg1;
      return subject.screenshot({
        ...options,
        blackout: [matcher],
      });
    }
    // with filename
    if (typeof arg1 === "string") {
      return subject.screenshot(
        [...Cypress.currentTest.titlePath, arg1].join(" -- "),
        {
          ...options,
          blackout: [matcher],
        }
      );
    }
    // any argument
    return subject.screenshot({
      blackout: [matcher],
    });
  }
);
