import { Constant } from "./constant";

/**
 * Lucky7 クラス
 */
export class Lucky7 {

    // -------------------------------------
    // 構築・消滅
    // -------------------------------------
    public constructor() {
        this.messageArea = <HTMLDivElement>document.getElementById('messageArea');
        this.spin1 = <HTMLSpanElement>document.getElementById('spin1');
        this.spin2 = <HTMLSpanElement>document.getElementById('spin2');
        this.spin3 = <HTMLSpanElement>document.getElementById('spin3');
        this.remainingCount = <HTMLLabelElement>document.getElementById('remainingCount');
        this.score = <HTMLSpanElement>document.getElementById('score');
        this.imgCoin = <HTMLImageElement>document.getElementById('imgCoin');
        this.btnStart = <HTMLInputElement>document.getElementById('toggle--push--glow');
        this.lblStart = <HTMLLabelElement>document.getElementById('lblStart');
        this.btnStops = <NodeListOf<HTMLLinkElement>>document.querySelectorAll('.btnStops');
        this.btnReset = <HTMLInputElement>document.getElementById('toggle--push--glow--reset');
        this.pointBalloon = <HTMLDivElement>document.getElementById('pointBalloon');

        this.spinInterval1 = null;
        this.spinInterval2 = null;
        this.spinInterval3 = null;
    }

    // -------------------------------------
    // パブリックメソッド
    // -------------------------------------

    /**
     * 各ボタンのイベント処理を追加する
     */
    public addEvent = () => {
        // 「START」ボタンのイベント
        this.btnStart.addEventListener('change', () => {
            this.btnStart.disabled = true;
            // btnReset3.disabled = true;
            this.btnReset.disabled = true;
            this.btnReset.checked = false;
            this.imgCoin.style.visibility = 'hidden';
            // 獲得ポイントバルーンの非表示解除
            this.pointBalloon.style.visibility = 'visible';
            // 獲得ポイントバルーンをズームアウトする
            this.pointBalloon.classList.remove('zoomIn');
            this.pointBalloon.classList.add('zoomOut');
            // スピン要素の文字色を金色に変更する
            this.setSpinFontColorGold(this.spin1, this.spin2, this.spin3);
            // スピン停止ボタンの色を変更する
            this.addDuringSpinClass(this.btnStops);

            this.spinInterval1 = setInterval(() => this.setRandomNumber(this.spin1), 10);
            this.spinInterval2 = setInterval(() => this.setRandomNumber(this.spin2), 10);
            this.spinInterval3 = setInterval(() => this.setRandomNumber(this.spin3), 10);
        });

        // 「STOP」ボタンのイベント
        this.btnStops.forEach(target => {
            target.addEventListener('click', async () => {
                if (!this.spinInterval1 && !this.spinInterval2 && !this.spinInterval3) {
                    // スピン中の項目が存在しない場合は、何もしない
                    return;
                }

                const targetId = target.id;
                if (!this.stopSpin(targetId)) {
                    // インターバル処理を停止できなかった場合は、何もせず処理を抜ける
                    return;
                }

                // スピン停止ボタンの色を戻す
                this.removeDuringSpinClass(target);

                if (this.spinInterval1 || this.spinInterval2 || this.spinInterval3) {
                    // スピンしている要素が 1 つでも残っている場合は、ここで処理を終了する
                    return;
                }

                // 7 の数をカウントする
                const numberOfSeven = this.countNumberOfSeven(this.spin1, this.spin2, this.spin3);
                // 加算ポイント数を取得する
                const addPoint = <number>Constant.POINT_LIST[numberOfSeven];

                // 現在の残り回数を取得する
                const currentRemainingCount = Number(this.remainingCount.textContent);
                // 残り回数を 1 減らす
                this.remainingCount.textContent = (currentRemainingCount - 1).toString();

                if (numberOfSeven === Constant.ALL_SEVEN_COUNT) {
                    // スピン要素が 3 つとも 7 だった場合、文字色を赤に変更する
                    this.setSpinFontColorRed(this.spin1, this.spin2, this.spin3);
                }

                if (numberOfSeven > 0) {
                    // 7 が 1 つでも出ていた場合、コイン画像を出現させる
                    for (let i = 0; i <= Constant.MAX_BLINKS_NUMBER; i++) {
                        await this.sleep(100);
                        this.toggleCoinImageOnOff(this.imgCoin);
                    }
                }

                // 加算ポイント数が 0 より大きい場合は、累計スコアの加算を行う
                if (addPoint > 0) {
                    // 獲得ポイントバルーンを表示する
                    this.pointBalloon.classList.remove('zoomOut');
                    this.pointBalloon.classList.add('zoomIn');
                    this.pointBalloon.textContent = `+${addPoint}`;
                    // バルーン表示後、わずかに遅れてポイントを加算させるため、0.4 秒待機させる
                    await this.sleep(400);
                    this.scoreCountUp(addPoint);
                    return;
                }

                // ターン終了処理
                this.turnEndProcess();
            });
        });

        // 「RESET」ボタンのイベント
        this.btnReset.addEventListener('change', () => {
            const spinNumber = Number(this.remainingCount.textContent);
            if (spinNumber !== 0 && !window.confirm(Constant.RESET_CONFIRM_MESSAGE)) {
                this.btnReset.checked = true;
                return;
            }

            this.init();
        });
    }

    /**
     * ゲームを初期状態にする
     * @param elements Lucky7 の要素群
     */
    public init = () => {
        // リセット
        this.messageArea.textContent = Constant.DEFALT_MESSAGE;
        this.remainingCount.textContent = Constant.SPIN_MAX_COUNT.toString();
        this.score.textContent = '0';
        this.btnStart.disabled = false;
        this.btnStart.checked = false;
        this.btnReset.disabled = true;
        this.lblStart.classList.remove(Constant.GAME_END_CLASS_NAME);
        this.imgCoin.style.visibility = 'hidden';
        this.pointBalloon.classList.add('zoomOut');

        for (const spin of [this.spin1, this.spin2, this.spin3]) {
            spin.textContent = '';
        }
    };

    // -------------------------------------
    // プライベートメソッド
    // -------------------------------------

    /**
     * 指定された時間、処理をストップさせる
     * @param ms 停止したい時間（ミリ秒）
     * @returns なし
     */
    private sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * 指定されたボタン ID に紐づくスピンインターバルを停止する
     * @param targetId 対象の ID
     * @returns 処理成功なら true、それ以外は false を返却する
     */
    private stopSpin = (targetId: string) => {
        switch (targetId) {
            case Constant.STOP_BUTTON_ID_LIST[1]:
                this.stopInterval(this.spinInterval1);
                this.spinInterval1 = null;
                break;
            case Constant.STOP_BUTTON_ID_LIST[2]:
                this.stopInterval(this.spinInterval2);
                this.spinInterval2 = null;
                break;
            case Constant.STOP_BUTTON_ID_LIST[3]:
                this.stopInterval(this.spinInterval3);
                this.spinInterval3 = null;
                break;
            default:
                // 未定義の ID を検出した場合は、false を返す
                return false;
        }

        return true;
    }

    /**
     * スピン要素の文字色を赤色に変更する
     * @param spins スピン要素群
     */
    private setSpinFontColorRed = (...spins: HTMLSpanElement[]) => {
        for (const spin of spins) {
            spin.style.color = 'red';
        }
    };

    /**
     * スピン要素の文字色を金色に変更する
     * @param spins スピン要素群
     */
    private setSpinFontColorGold = (...spins: HTMLSpanElement[]) => {
        for (const spin of spins) {
            spin.style.color = 'gold';
        }
    };

    /**
     * スピン要素にセットされた 7 の数をカウントする
     * @param spins スピン要素群
     * @returns 7 のカウント数
     */
    private countNumberOfSeven = (...spins: HTMLSpanElement[]): number => {
        return spins.reduce((acc, spin) => Number(spin.textContent) === 7 ? acc + 1 : acc, 0);
    };

    /**
     * duringSpin クラスを追加する
     * @param targets スピン停止ボタン要素群
     */
    private addDuringSpinClass = (targets: NodeListOf<HTMLLinkElement>) => {
        targets.forEach(target => target.classList.add('duringSpin'));
    };

    /**
     * duringSpin クラスを除去する
     * @param target スピン停止ボタン要素
     */
    private removeDuringSpinClass = (target: HTMLLinkElement) => {
        target.classList.remove('duringSpin');
    };

    /**
     * 0 ～ 9 の乱数を発生させ、span 要素にセットする
     * @param spin 対象の span 要素
     */
    private setRandomNumber = (spin: HTMLSpanElement) => {
        const random = Math.floor(Math.random() * 9);
        spin.innerText = random.toString();
    };

    /**
     * 指定されたインターバル処理を停止させる
     * @param spinInterval 対象のインターバル
     */
    private stopInterval = (spinInterval: NodeJS.Timeout | null) => {
        if (spinInterval) {
            clearInterval(spinInterval);
        }
    };

    /**
     * コイン画像の表示 ON / OFF を切り替える
     * @param imgCoin コイン画像表示要素
     */
    private toggleCoinImageOnOff = (imgCoin: HTMLImageElement) => {
        const isVisible = imgCoin.style.visibility === 'visible';
        imgCoin.style.visibility = !isVisible ? 'visible' : 'hidden';
    };

    /**
     * 指定された値でスコアを更新する
     * @param addPoint 加算ポイント数
     */
    private scoreCountUp(addPoint: number) {
        const startTime = Date.now();
        const from = Number(this.score.textContent);
        const to = from + addPoint;

        const timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = elapsedTime / Constant.DURATION;

            if (progress < 1) {
                this.score.textContent = (Math.floor(from + progress * (to - from))).toString();
            } else {
                this.score.textContent = to.toString();
                clearInterval(timer);
                // setInterval は非同期で実行されるため、カウントアップ処理完了を検知できないので、
                // ここでターン終了処理を呼び出す
                this.turnEndProcess();
            }
        }, 16);
    }

    /**
     * ターン終了時に行う処理
     * @returns なし
     */
    private turnEndProcess = () => {
        // btnReset3.disabled = false;
        this.btnReset.disabled = false;
        this.btnReset.checked = true;

        // 現在の残り回数
        const currentRemainingCount = Number(this.remainingCount.textContent);

        if (currentRemainingCount === 0) {
            // 現在の残り回数が 0 だった場合は、ゲーム終了とする
            this.messageArea.textContent = `あなたの最終スコアは ${this.score.textContent} ポイントです！`;
            this.lblStart.classList.add(Constant.GAME_END_CLASS_NAME);
            return;
        }

        // btnSpin.disabled = false;
        this.btnStart.disabled = false;
        this.btnStart.checked = false;
    }

    // -------------------------------------
    // フィールド変数
    // -------------------------------------
    /**
     * メッセージエリア要素
     */
    private messageArea: HTMLDivElement;

    /**
     * スピン要素 1
     */
    private spin1: HTMLSpanElement;

    /**
     * スピン要素 2
     */
    private spin2: HTMLSpanElement;

    /**
    * スピン要素 3
    */
    private spin3: HTMLSpanElement;

    /**
     * スピン残回数表示要素
     */
    private remainingCount: HTMLLabelElement;

    /**
     * スコア表示要素
     */
    private score: HTMLSpanElement;

    /**
     * コイン画像表示要素
     */
    private imgCoin: HTMLImageElement;

    /**
     * 「スタート」ボタン要素
     */
    private btnStart: HTMLInputElement;

    /**
     * 「スタート」ボタンのラベル要素
     */
    private lblStart: HTMLLabelElement;

    /**
     * 「ストップ」ボタン要素群
     */
    private btnStops: NodeListOf<HTMLLinkElement>;

    /**
     * 「リセット」ボタン要素
     */
    private btnReset: HTMLInputElement;

    /**
     * スピンインターバル 1
     */
    private spinInterval1: NodeJS.Timeout | null;

    /**
     * スピンインターバル 2
     */
    private spinInterval2: NodeJS.Timeout | null;

    /**
     * スピンインターバル 3
     */
    private spinInterval3: NodeJS.Timeout | null;

    private pointBalloon: HTMLDivElement;
}