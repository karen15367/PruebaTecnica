module.exports = {
    "preset": "ts-jest",
    "testEnvironment": "node",
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    }
};
