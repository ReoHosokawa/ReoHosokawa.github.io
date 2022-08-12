const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputPath = path.join(__dirname, '../public/Lucky7_2');
module.exports = {
    // モジュールバンドルを行う起点となるファイルの指定
    // 指定できる値としては、ファイル名の文字列や、それを並べた配列やオブジェクト
    // 下記はオブジェクトとして指定した例
    entry: {
        lucky7_2: './src/app.ts'
    },
    output: {
        // モジュールバンドルを行った結果を出力する場所やファイル名の指定
        // "__dirname" はこのファイルが存在するディレクトリを表す node.js で定義済みの定数
        path: outputPath,
        filename: '[name].js'   // [name] は entry で記述した名前（この例では licky7_2）が入る
    },
    // モジュールとして扱いたいファイルの拡張子を指定する
    // 例えば「import Foo from './foo'」という記述に対して "foo.ts" という名前のファイルをモジュールとして探す
    // デフォルトは ['.js', '.json']
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        // webpack-dev-server の公開フォルダ
        contentBase: outputPath
    },
    // モジュールに適用するルールの設定（ここではローダーの設定を行うことが多い）
    module: {
        rules: [
            {
                // 拡張子が .ts で終わるファイルに対して、TypeScript コンパイラを適用する
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                // 拡張子が .css 、.sass 、.scss で終わるファイルに対して、CSS コンパイラを以下の順で適用する
                //   1. sass-loader
                //   2. css-loader
                //   3. style-loader
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css', // /dist/css/style.css に出力
        })
    ]
}