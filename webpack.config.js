const path = require('path');

module.exports = {
    entry: {
        site: './src/site.controller.ts', 
        dashboard: './src/dashboard.controller.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch:true
};