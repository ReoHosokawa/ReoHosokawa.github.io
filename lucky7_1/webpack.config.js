const path = require('path');
const outputPath = path.join(__dirname, '../public/Lucky7_1');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 1. `process.env.NODE_ENV` で引数の中身を受け取り、true / false を判定する
const isProduction = process.env.NODE_ENV === 'production';

// 2. 共通設定が書かれた config オブジェクトを定義
const config = {
    // モジュールバンドルを行う起点となるファイルの指定
    // 指定できる値としては、ファイル名の文字列や、それを並べた配列やオブジェクト
    // 下記はオブジェクトとして指定した例
    entry: {
        lucky7_1: './src/app.ts'
    },
    output: {
        // モジュールバンドルを行った結果を出力する場所やファイル名の指定
        // "__dirname" はこのファイルが存在するディレクトリを表す node.js で定義済みの定数
        path: outputPath,
        filename: '[name].js'   // [name] は entry で記述した名前（この例では lucky7_1）が入る
    },
    // モジュールとして扱いたいファイルの拡張子を指定する
    // 例えば「import Foo from './foo'」という記述に対して "foo.ts" という名前のファイルをモジュールとして探す
    // デフォルトは ['.js', '.json']
    resolve: {
        extensions: ['.ts', '.js']
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
            filename: 'css/style.css',
        })
    ]
}

// 3. 手順 1 で得た値を使って分岐させ、共通設定に個別の設定を追加してから return する
module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        // 本番環境用の設定
        config.devtool = undefined; // ソースマップを出力しない
    } else {
        config.mode = 'development';
        // 開発環境用の設定
        config.devtool = 'source-map';   // ソースマップを出力する
        config.devServer = {
            // webpack-dev-server の公開フォルダ
            contentBase: outputPath
        }
    }

    // 最後に、共通部分にいろいろ書き加えた後の config オブジェクトを返す
    return config;
}