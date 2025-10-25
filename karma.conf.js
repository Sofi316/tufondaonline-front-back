module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/utils/**/*.js',   // Incluye la lógica primero
    ],
    reporters: ['spec'],     // Reporter legible
    browsers: ['ChromeHeadless'], // Ejecuta en modo invisible
    singleRun: true,         // Corre una vez y termina
    concurrency: Infinity
  });
};
