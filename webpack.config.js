var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/MtgCardViewer.js',
    output: {
        path: path.resolve('lib'),
        filename: 'MtgCardViewer.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}