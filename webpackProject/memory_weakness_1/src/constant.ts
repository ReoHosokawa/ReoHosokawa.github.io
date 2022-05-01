
/**
 * 定数クラス
 */
export class Constant {

    /**
     * 最大ペア数
     */
    static get MaxPair(): number {
        return 10;
    }

    /**
     * トランプの画像（ジョーカー）を示す番号
     */
    static get JokerNumber(): number {
        return 14;
    }

    /**
     * トランプ画像の開始番号
     */
    static get StartCardNumber(): number {
        return 1;
    }

    /**
     * トランプ画像の終了番号
     */
    static get EndCardNumber(): number {
        return 14;
    }

    /**
     * 画像フォルダのパス
     */
    static get ImageFolderPath(): string {
        return "./images/";
    }

    /**
     * トランプ画像の拡張子
     */
    static get ImageExtension(): string {
        return ".gif";
    }

    /**
     * 裏向きトランプ画像のファイル名
     */
    static get DefaultCardFileName(): string {
        return "z02";
    }

    /**
     * ライフ画像のファイル名
     */
    static get LifeImageFileName(): string {
        return "lifeImage.png";
    }

    /**
     * 最大ミス可能回数
     */
    static get MaxMissNumber(): number {
        return 7;
    }

    /**
     * ライフエリア要素のクラス名
     */
    static get LifeImageClassName(): string {
        return "lifeImage";
    }

    /**
     * カードの絵札（スペード、ハート、ダイヤ、クラブ、ジョーカー）別 key と value の一覧
     */
    static get CardTypeList() {
        return {
            Spade: { "key": "s", "value": 0 },
            Heart: { "key": "h", "value": 1 },
            Diamond: { "key": "d", "value": 2 },
            Club: { "key": "c", "value": 3 },
            Joker: { "key": "x", "value": 4 },
        };
    }
}