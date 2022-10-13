const CracoLessPlugin = require('craco-less');
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#F78B2D',
                            '@text-color': '#333333',
                            '@border-radius-base': '4px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
