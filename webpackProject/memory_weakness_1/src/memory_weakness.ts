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
        this.isGameOver = false;
        this.pairCount = 0;
        this.missCount = 0;

        // 初期状態で表示するトランプの裏向き画像パス
        const filePath = Constant.ImageFolderPath + Constant.DefaultCardFileName + Constant.ImageExtension;
        this.cardImages.forEach($image => {
            // カード画像設定要素群に、トランプの裏向き画像を初期状態としてセットする
            $image.src = filePath;

            // トランプ画像がダブルクリックされた場合のイベント定義
            $image.addEventListener("dblclick", this.selectCard);
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
     * カードが選択された場合に実行される処理
     * @param e イベント
     * @returns なし
     */
    private selectCard = async (e: MouseEvent) => {
        if (!this.isSelectable) {
            return;
        }

        const target = e.target;
        if (target === null) {
            return;
        }

        const $image = <HTMLImageElement>target;

        const cardNumber = Number($image.dataset.cardNumber);
        if (this.selectCardCount === 1 && this.selectCardList[0] === cardNumber) {
            // すでにカードが 1 枚選択されている場合、今回選択されたカードがひとつ前に選択されたカードと
            // 同じ場所だった場合は何もしない
            return;
        }
        // 選択されたトランプを表向きにする
        $image.src = this.createTrumpImagePath(cardNumber);

        // 選択されたカードの情報（場所）を配列に格納しておく
        this.selectCardList.push(cardNumber);
        this.selectCardCount++;

        if (this.selectCardCount !== Constant.SelectableNumber) {
            // カードが 2 枚選択されていない場合は、ここで処理終了
            return;
        }

        this.isSelectable = false;

        const isPair = this.isPair();

        // ペアかどうかで処理を分岐する
        if (isPair) {
            this.showResultMessage(Constant.HitValue, Constant.HitClassName);
            this.pairCount++;
            this.pairCountArea.textContent = this.createPairCountValue(this.pairCount);
        } else {
            this.showResultMessage(Constant.MissValue, Constant.MissClassName);
            this.missCount++;
            this.missCountArea.textContent = this.createMissCountValue(this.missCount);
            this.removeLife();
        }

        // 結果がすぐに消えないよう、1 秒間待機する
        await this.sleep(1000);

        // 再度トライできるように画面を整える
        this.messageArea.classList.remove(Constant.HitClassName, Constant.MissClassName);
        this.messageArea.textContent = this.createStatusMessage(Constant.MaxMissNumber - this.missCount);
        this.isSelectable = true;

        // ペアだった場合は、該当のカードを選択不可に、ペアではなかった場合はカードを裏返す
        isPair ? this.setCardDisabled() : this.turnCardFaceDown();

        // 選択中のカード情報をリセットする
        this.selectCardCount = 0;
        this.selectCardList = [];
    }

    /**
     * トランプのカードをシャッフルする
     */
    private shuffleCards = () => {
        // トランプのランク一覧
        const baseRanks = this.createNumberList(Constant.StartCardNumber, Constant.EndCardNumber);

        // ランク一覧シャッフル
        const ranks = Linq.from(baseRanks).shuffle().toArray();

        // 定義されている数のペアを用意する
        const basePairList = this.createPairList(ranks, Constant.MaxPair);
        // 用意したペア一覧をシャッフルする
        this.cardList = Linq.from(basePairList).shuffle().toArray();
    }

    /**
     * 指定された開始番号～終了番号までの連番一覧を生成する
     * @param start 開始番号
     * @param end 終了番号
     * @returns 開始番号～終了番号までの連番一覧
     */
    private createNumberList = (start: number, end: number): number[] => {
        return Linq.range(start, end).toArray();
    }

    /**
     * 指定されたペア数分、トランプのペアを用意する
     * @param ranks トランプのカード番号一覧
     * @param maxPair 最大ペア数
     * @returns ペア一覧
     */
    private createPairList = (ranks: number[], maxPair: number): { "type": number, "value": number }[] => {
        // トランプの絵札一覧
        const cardTypeList = Constant.CardTypeList;
        const types = this.createNumberList(0, cardTypeList.length - 1);

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
            const jokerTypes = this.createNumberList(1, 2);
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
     * ライフを削除する
     */
    private removeLife = () => {
        const $lifeImage = <HTMLImageElement>document.getElementById(`life_${this.missCount}`);
        $lifeImage.remove();
    }

    /**
     * ペアが成立しているかどうか
     * @returns ペアなら true、それ以外は false
     */
    private isPair = () => {
        const firstCardNumber = this.cardList[this.selectCardList[0]].value;
        const secondCardNumber = this.cardList[this.selectCardList[1]].value;
        return firstCardNumber === secondCardNumber;
    };

    /**
     * 結果メッセージを表示する
     * @param message 表示するメッセージ
     * @param classValue 追加するクラス（任意）
     */
    private showResultMessage = (message: string, classValue: string | null = null) => {
        this.messageArea.textContent = message;
        if (classValue !== null) {
            this.messageArea.classList.add(classValue);
        }
    }

    /**
     * 選択中のカードを選択不可にする
     */
    private setCardDisabled = () => {
        for (const cardNumber of this.selectCardList) {
            const $card = <HTMLImageElement>document.getElementById(`card_${cardNumber + 1}`);
            $card.removeEventListener("dblclick", this.selectCard);
        }
    }

    /**
     * 選択中のカードを裏向きにする
     */
    private turnCardFaceDown = () => {
        // 裏向きカードのパス
        const filePath = Constant.ImageFolderPath + Constant.DefaultCardFileName + Constant.ImageExtension;
        for (const cardNumber of this.selectCardList) {
            const $card = <HTMLImageElement>document.getElementById(`card_${cardNumber + 1}`);
            $card.src = filePath;
        }
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

    /**
     * 指定された時間、処理をストップさせる
     * @param ms 停止したい時間（ミリ秒）
     * @returns なし
     */
    private sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

    /**
     * ゲームオーバーかどうか
     */
    private isGameOver: boolean = false;

    /**
     * ペア数
     */
    private pairCount: number = 0;

    /**
     * ミス数
     */
    private missCount: number = 0;
}