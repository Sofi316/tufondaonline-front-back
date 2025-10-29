// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/utils/**/*.logic.js',
      'src/utils/**/*.logic.spec.js'
    ],
    browsers: ['ChromeHeadless'],
    // 👇 Cambiamos los reporters
    reporters: ['spec'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-spec-reporter'
    ],
    specReporter: {
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      showSpecTiming: true
    },
    colors: true,
    singleRun: true
  });
};
