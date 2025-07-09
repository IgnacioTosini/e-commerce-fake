module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [],
};