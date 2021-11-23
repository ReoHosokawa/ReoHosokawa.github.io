# このプロジェクトの実行方法

## 0. 事前準備

### 1. node.js のインストール

このプロジェクトを動かすためには、node.js が必要になります。  
以下のサイトを参考にインストールしてください。  
![nvm-windowsでNode.jsバージョン管理](https://qiita.com/akuden/items/a88630de9624039c4135)

なお、ここでは以下のバージョンの node.js を使用します（新しいバージョンだとエラーになる）。

* 12.18.2

### 2. Yarn のインストール

1. プログラムの実行そのものは npm コマンドでも可能ですが、ここでは yarn コマンドを使用することにします。
コマンドプロンプトや Power Shell などを起動し、以下のコマンドを実行してください。

```Bash
# npm 経由で　yarn をインストール
npm install -g yarn
# yarn のバージョンを確認する
yarn -v
```

### 3. TypeScript コンパイラのインストール

1. コマンドプロンプトや Power Shell などを起動し、以下のコマンドを実行してください。

```Bash
yarn global add typescript
```

1. 以下のコマンドを入力し、"Version 4.1.2" などと表示されればインストール完了です。

```Bash
tsc -v
```

## 1. プログラムの実行に必要なツールのインストール

1. コマンドプロンプトや Power Shell などで以下のコマンドを実行してください。

```Bash
yarn install
```

## 2. TypeScript プログラムの実行

1. コマンドプロンプトや Power Shell などで以下のコマンドを実行すると、
実行環境である webpack-dev-server が起動します。

```Bash
yarn start
```

1. 続いて、任意のブラウザで <http://localhost:8080> にアクセスしてください。
正しくページが表示されれば完了です。

## トラブルシューティング

1. Power Shell のコマンド実行に失敗する場合
   * ![Power Shell のスクリプトが実行できない場合の対処方法](https://qiita.com/Targityen/items/3d2e0b5b0b7b04963750)
