const path = require("path")

const { DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require('vue-loader')
// const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getStyleLoaders = (pre) => {
    return [
        "vue-style-loader",
        "css-loader",
        {
            // 处理css兼容性问题
            // 配合package.json中browserslist来指定兼容性
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre,
    ].filter(Boolean);
};


module.exports = {
    entry: "./src/main.ts",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader")
            },
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader")
            }, {
                test: /\.styl(us)?$/,
                use: getStyleLoaders("stylus-loader"),
            }, {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                },
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: path.resolve(__dirname, "../src")
            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            {
                test: /\.(woff2?|ttf)$/,
                type: "asset/resource",
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    plugins: [
        // new EslintWebpackPlugin({
        //     context: path.resolve(__dirname, "../src"),
        //     exclude: "node_modules",
        //     cache: true,
        //     cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({  //处理vue警告
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
    mode: "development",
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
    },
    resolve: {
        // 自动补全文件扩展名
        extensions: [".vue", ".js", ".ts", ".json"],
    },
    devServer: {
        host: "localhost",
        port: 3001,
        open: true,
        hot: true, // 开启HMR
        historyApiFallback: true, // 解决前端路由刷新404问题
    },
} 