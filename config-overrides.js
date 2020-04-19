const {
    override,
    addBabelPlugin
} = require('customize-cra');

module.exports = override(
    addBabelPlugin([
        'react-intl-auto',
        {
            removePrefix: '(src.app|src.components)'
        }
    ]),
    addBabelPlugin('@babel/plugin-proposal-optional-chaining')
);
