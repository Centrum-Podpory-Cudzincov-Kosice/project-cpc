const path = require("path");

module.exports = function override(config) {
    const oneOfRule = config.module.rules.find(
        rule => Array.isArray(rule.oneOf)
    );

    const babelLoader = oneOfRule?.oneOf.find(
        rule =>
            rule.loader &&
            rule.loader.includes("babel-loader")
    );

    if (!babelLoader) {
        throw new Error("CRA babel-loader was not found");
    }

    delete babelLoader.include;

    return config;
};