const path = require('path');
const {
    override,
    addBabelPlugin,
    addWebpackAlias
} = require('customize-cra');

module.exports = override(
    addBabelPlugin('react-intl-auto'),
    addWebpackAlias({common: path.resolve(__dirname, 'src/common/')})
);
