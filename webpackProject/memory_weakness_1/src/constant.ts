
/**
 * 定数クラス
 */
export class Constant {
    /**
     * 画像フォルダのパス
     */
    static get ImageFolderPath(): string {
        return "./images/";
    }

    /**
     * 裏向きトランプ画像のファイル名
     */
    static get DefaultCardFileName(): string {
        return "z02.gif";
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
}