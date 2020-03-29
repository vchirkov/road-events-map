const {
    override,
    addBabelPlugin
} = require('customize-cra');

module.exports = override(
    addBabelPlugin('react-intl-auto'),
    addBabelPlugin('@babel/plugin-proposal-optional-chaining')
);
