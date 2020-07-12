module.exports = {
  testEnvironment: 'node',
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "\\.(ts|js)x?$": "ts-jest",
  },
  testRegex: "/src/__tests__/.*\\.test\\.ts$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["src", "node_modules"],
  modulePaths: ["<rootDir>/src/"],
  testPathIgnorePatterns: ["/lib/", "/node_modules/"]
};
