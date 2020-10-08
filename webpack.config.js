const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;


const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCSSExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
                sourceMap: true
            },
        },
        // важливий порядок wp читає з права на ліво
        // "style-loader", // додає наші стилі в head у html
        // options: {},
        "css-loader", // дозволяж wp імпортувати в js різні стилі
        "postcss-loader",
    ];
    
    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

const babelOptions = (preset) => {
    const opts = {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
    };

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
};

const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: babelOptions(),
        },
    ];

    return loaders;
};

module.exports = {
    context: path.resolve(__dirname, "src"), // де ми зараз знаходимося; можна із шляхів повидаляти src
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.js"],
    }, // вказуємо wp звідки почати роботу;
    output: {
        // що робити із результатом
        filename: "[name].bundle.js", //все що вказано в index.js буде опрацьовано у єдиний файл
        path: path.resolve(__dirname, "dist"), //куди дівати результат;
        // publicPath: "/dist"
    },

    // optimization: optimization(),

    devtool: "cheap-module-eval-source-map",

    devServer: {
        port: 4400,
        hot: isDev,
        contentBase: './src',
        watchContentBase: true
    },

    plugins: [
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, "src/img"), to: path.resolve(__dirname, "dist/img") }
            ],
          }),
        new HTMLWebpackPlugin({
            // поміщає index.html в папку dist
            hash: false,
            template: "./index.html", // який саме файл туди помістити
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: "[name].bundle.css",
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
        }),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true,
            options: { sourceMap: true },
          }),

          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })
    ], //plugins
    module: {
        // loader - дозволяє webpack працювати із іншими типами файлів (не js)
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            }, // css
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders("sass-loader")
            }, // scss
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                    // outputPath: 'img',
                },
            },
            {
                test: /\.(woff|woff2)$/,
                // use: ["file-loader"],
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                },
            }, //fonts
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            }, // babel
        ], // rules
    }, // module
};
