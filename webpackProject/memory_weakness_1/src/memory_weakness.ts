import { Constant } from './constant';
import Linq from 'linq';

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
        this.cardList = [];
        this.selectCardCount = 0;
        this.selectCardList = [];
        this.isSelectable = true;

        // 初期状態で表示するトランプの裏向き画像パス
        const filePath = Constant.ImageFolderPath + Constant.DefaultCardFileName + Constant.ImageExtension;
        this.cardImages.forEach($image => {
            // カード画像設定要素群に、トランプの裏向き画像を初期状態としてセットする
            $image.src = filePath;

            // トランプ画像がダブルクリックされた場合のイベント定義
            $image.addEventListener("dblclick", e => {
                const cardNumber = Number($image.dataset.cardNumber);
                // 選択されたトランプを表向きにする
                $image.src = this.createTrumpImagePath(cardNumber);
            });
        });

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

        // カードをシャッフルする
        this.shuffleCards();
    }

    // -------------------------------------
    // プライベートメソッド
    // -------------------------------------

    /**
     * トランプのカードをシャッフルする
     */
    private shuffleCards = () => {
        // トランプのランク一覧
        const baseRanks = this.createRankList(Constant.StartCardNumber, Constant.EndCardNumber);

        // ランク一覧シャッフル
        const ranks = Linq.from(baseRanks).shuffle().toArray();

        // 定義されている数のペアを用意する
        const basePairList = this.createPairList(ranks, Constant.MaxPair);
        // 用意したペア一覧をシャッフルする
        this.cardList = Linq.from(basePairList).shuffle().toArray();
    }

    /**
     * 指定された開始番号～終了番号までのランク一覧を生成する
     * @param start トランプの開始番号
     * @param end トランプの終了番号
     * @returns トランプの開始番号 ～ トランプの終了番号までのランク一覧
     */
    private createRankList = (start: number, end: number): number[] => {
        return Linq.range(start, end).toArray();
    }

    /**
     * 指定された開始番号～終了番号までのタイプ番号一覧を生成する
     * @param start カードタイプの開始番号
     * @param end カードタイプの終了番号
     * @returns カードタイプ番号一覧
     */
    private createTypeList = (start: number, end: number): number[] => {
        return Linq.range(start, end).toArray();
    }

    /**
     * 指定されたペア数分、トランプのペアを用意する
     * @param ranks トランプのカード番号一覧
     * @param maxPair 最大ペア数
     * @returns ペア一覧
     */
    private createPairList = (ranks: number[], maxPair: number): {"type": number, "value": number}[] => {
        // トランプの絵札一覧
        const cardTypeList = Constant.CardTypeList;
        const types = this.createTypeList(0, cardTypeList.length - 1);

        const pairList = new Array();
        for (let i = 0; i < maxPair; i++) {
            const rank = ranks[i];
            // ジョーカー用の番号かどうか
            const isJoker = rank === Constant.JokerNumber;
            // 絵札をシャッフルする
            const cardTypeList = this.shuffleCardTypes(types, isJoker);

            // ペアを作成する
            for (let j = 0; j < 2; j++) {
                const type = cardTypeList[j];
                pairList.push({ "type": type, "value": rank });
            }
        }

        return pairList;
    }

    /**
     * カードの絵札一覧をシャッフルする
     * @param types カードの絵札一覧
     * @param isJoker ジョーカーかどうか
     * @returns シャッフル後の絵札一覧
     */
    private shuffleCardTypes = (types: number[], isJoker: boolean): number[] => {
        if (isJoker) {
            // ジョーカーの場合
            // ジョーカー用のカードは 2 種類しかないので、 1 と 2 のみを格納した配列を用意する
            const jokerTypes = Linq.range(1, 2).toArray();
            return Linq.from(jokerTypes).shuffle().toArray();
        }

        return Linq.from(types).shuffle().toArray();
    }

    /**
     * 選択されたカード番号に紐づくトランプの画像パスを生成する
     * @param cardNumber 対象のカード番号
     * @returns 画像ファイルパス
     */
    private createTrumpImagePath = (cardNumber: number): string => {
        const cardData = this.cardList[cardNumber];
        // ジョーカー用かどうか
        const isJoker = cardData.value === Constant.JokerNumber;
        // カードの絵札情報
        const cardType = Constant.CardTypeList[isJoker ? Constant.JokerType : cardData.type];
        // 画像ファイル名
        const fileName = cardType.value + this.zeroPadding(isJoker ? cardData.type : cardData.value, 2) + Constant.ImageExtension;
        // 画像パス
        return Constant.ImageFolderPath + fileName;
    }

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

    /**
     * 指定された数値の先頭を 0 埋めする
     * @param target 対象の数値
     * @param len 0 埋めする桁数
     * @returns 0 埋めした後の値
     */
    private zeroPadding = (target: number, len: number): string => ("0".repeat(len) + target).slice(-len);

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

    /**
     * シャッフル後のカード情報一覧
     */
    private cardList: { type: number, value: number }[] = [];

    /**
     * 選択されたカードの枚数
     */
    private selectCardCount: number = 0;

    /**
     * 選択されたカードの情報一覧
     */
    private selectCardList: number[] = [];

    /**
     * カードは選択可能か
     */
    private isSelectable: boolean = true;
}