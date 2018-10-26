module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  modulePaths: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^(.*):(.*)$': '$1_$2',
    '/imports/(.*)': '<rootDir>/imports/$1',
  },
  unmockedModulePathPatterns: ['/^src\\/.*\\.jsx?$/', '/^node_modules/'],
  setupFiles: ['<rootDir>/tests/test-setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
