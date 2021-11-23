/**
 * 定数クラス
 */
export class Constant {
    /**
     * 7 の数に応じて加算されるポイントの一覧
     */
    static get POINT_LIST(): Partial<{[key: number]: number}> {
        return {
            0: 0,
            1: 5,
            2: 20,
            3: 100
        };
    }

    /**
     * スピン停止ボタンの ID 一覧
     */
    static get STOP_BUTTON_ID_LIST() {
        return {
            1: 'btnStop1',
            2: 'btnStop2',
            3: 'btnStop3',
        };
    }

    /**
     * 7 の最大カウント数
     */
    static get ALL_SEVEN_COUNT() {
        return 3;
    }

    /**
     * スピン実行最大回数
     */
    static get SPIN_MAX_COUNT() {
        return 20;
    };

    /**
     * 最大点滅回数
     */
    static get MAX_BLINKS_NUMBER() {
        return 6;
    }

    /**
     * カウントアップの間隔
     */
    static get DURATION() {
        return 360;
    }

    /**
     * メッセージエリアにデフォルトで出す文字列
     */
    static get DEFALT_MESSAGE() {
        return 'スピンして 7 が出たらポイントゲット！';
    }

    /**
     * ゲーム終了を示すクラス名
     */
    static get GAME_END_CLASS_NAME() {
        return "gameEnd";
    }

    /**
     * リセット確認メッセージ
     */
    static get RESET_CONFIRM_MESSAGE() {
        return "まだ途中ですが、リセットしてもよろしいですか？";
    }
}