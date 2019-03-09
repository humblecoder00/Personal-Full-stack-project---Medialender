// import Raven from "raven-js";

function init() {
  // Raven.config("https://7db5979e79034d29890df2d36212cc0b@sentry.io/1400516", {
  //   release: "1-0-0",
  //   environment: "development-test"
  // }).install();
}

function log(error) {
  // Raven.captureException(error);
  console.log(error);
}

export default {
  init,
  log
};
