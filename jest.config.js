module.exports = {
  transform: { '^.+\\.jsx?$': 'babel-jest' },
  moduleFileExtensions: ['js', 'jsx'],
  modulePaths: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '.*/config$': '<rootDir>/tests/mocks/config.js',
  },
  unmockedModulePathPatterns: ['/^src\\/.*\\.jsx?$/', '/^node_modules/'],
  setupFiles: ['<rootDir>/tests/test-setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!node_modules/',
    '!tests/',
    '!src/index.js',
    '!src/serviceWorker.js',
    '!src/store.js',
  ],
}
