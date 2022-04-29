import { Constant } from './constant';

/**
 * 神経衰弱クラス
 */
export class MemoryWeakness {
    // -------------------------------------
    // 構築・消滅
    // -------------------------------------
    /**
     * コンストラクタ
     */
    public constructor() {
        this.cardImages = <NodeListOf<HTMLImageElement>>document.querySelectorAll(".cardImage");
        this.lifeArea = <HTMLDivElement>document.getElementById("lifeArea");
        this.pairCountArea = <HTMLDivElement>document.getElementById("pairCountArea");
        this.missCountArea = <HTMLDivElement>document.getElementById("missCountArea");
        this.messageArea = <HTMLDivElement>document.getElementById("messageArea");
    }

    // -------------------------------------
    // パブリックメソッド
    // -------------------------------------

    /**
     * ゲーム画面を初期化する
     */
    public init = () => {
        // カード画像設定要素群に、トランプの裏向き画像を初期状態としてセットする
        this.cardImages.forEach($image => $image.src = Constant.ImageFolderPath + Constant.DefaultCardFileName);

        // ライフ画像要素が設定されている可能性があるので、いったん削除する
        this.removeLifeImages();
        // ライフの追加
        this.addLifeImages();

        const defaultCount = 0;
        // ペア数
        this.pairCountArea.textContent = this.createPairCountValue(defaultCount);
        // ミス数
        this.missCountArea.textContent = this.createMissCountValue(defaultCount);
        // 残りミス可能数
        this.messageArea.textContent = this.createStatusMessage(Constant.MaxMissNumber);
    }

    // -------------------------------------
    // プライベートメソッド
    // -------------------------------------

    /**
     * ライフ画像を最大ミス可能数分、ライフ表示エリアに追加する
     */
    private addLifeImages = () => {
        for (let i = Constant.MaxMissNumber; i > 0; i--) {
            const $life = document.createElement("img");
            $life.id = `life_${i}`;
            $life.classList.add(Constant.LifeImageClassName);
            $life.src = Constant.ImageFolderPath + Constant.LifeImageFileName;
            this.lifeArea.appendChild($life);
        }
    }

    /**
     * ライフ表示エリアからライフ画像要素を削除する
     */
    private removeLifeImages = () => {
        const $lifeImages = <NodeListOf<HTMLImageElement>>document.querySelectorAll(`.${Constant.LifeImageClassName}`);
        $lifeImages.forEach($life => this.lifeArea.removeChild($life));
    }

    /**
     * ペア数を示す文字列を生成する
     * @param pairCount ペア数
     * @returns ペア数を示す文字列
     */
    private createPairCountValue = (pairCount: number): string => `${pairCount} ペア`;

    /**
     * ミス数を示す文字列を生成する
     * @param missCount ミス数
     * @returns ミス数を示す文字列
     */
    private createMissCountValue = (missCount: number): string => `${missCount} ミス`;

    /**
     * ミス可能な回数を示すメッセージを生成する
     * @param missCount ミスできる回数
     * @returns ミス可能な回数を示すメッセージ
     */
    private createStatusMessage = (missCount: number): string => `あと ${missCount} 回ミスできます。`;

    // -------------------------------------
    // フィールド変数
    // -------------------------------------

    /**
     * カード画像設定要素群
     */
    private cardImages: NodeListOf<HTMLImageElement>;

    /**
     * ライフ画像表示領域
     */
    private lifeArea: HTMLDivElement;

    /**
     * ペア数表示要素
     */
    private pairCountArea: HTMLDivElement;

    /**
     * ミス数表示要素
     */
    private missCountArea: HTMLDivElement;

    /**
     * メッセージ表示要素
     */
    private messageArea: HTMLDivElement;
}