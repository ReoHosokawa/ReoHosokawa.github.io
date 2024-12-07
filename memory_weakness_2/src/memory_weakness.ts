import * as Constant from "./constant";
import { MemoryWeaknessDomItems } from "./types/memory_weakness_dom_items";
import { TrumpCard } from './types/trump_card';
import Linq from 'linq';


/**
 * シャッフル後のカード情報一覧
 */
let cardList: TrumpCard[];
/**
 * 選択されたカードの枚数
 */
let selectCardCount: number;
/**
 * 選択されたカードの情報一覧
 */
let selectCardList: number[];
/**
 * カードは選択可能か
 */
let isSelectable: boolean;
/**
 * ゲームクリアしたか
 */
let isGameClear: boolean;
/**
 * ゲームオーバーになったか
 */
let isGameOver: boolean;
/**
 * ペア数
 */
let pairCount: number;
/**
 * ミス数
 */
let missCount: number;

/**
 * 指定された数値の先頭を 0 埋めする
 * @param target 対象の数値
 * @param len 0 埋めする桁数
 * @returns 0 埋めした後の値
 */
const zeroPadding = (target: number, length: number): string => String(target).padStart(length, "0");

/**
 * 指定された時間、処理を停止する
 * @param ms 処理を停止する時間（ミリ秒）
 * @returns なし
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 選択されたカード番号に紐づくトランプの画像パスを生成する
 * @param targetCardNumber 対象のカード番号
 * @returns 画像ファイルパス
 */
const createTrumpImagePath = (targetCardNumber: number): string => {
    const cardData = cardList[targetCardNumber];
    // ジョーカー用かどうか
    const isJoker = cardData.value === Constant.JOKER_NUMBER;
    // カードの絵札情報
    const cardType = Constant.CARD_TYPE_LIST[isJoker ? Constant.JOKER_TYPE : cardData.type];
    // カードの番号
    const cardNumber = zeroPadding(isJoker ? cardData.type : cardData.value, 2);
    // 画像ファイル名
    const fileName = cardType.value + cardNumber + Constant.IMAGE_EXTENSION;

    // 画像パスにして返却する
    return Constant.IMAGE_FOLDER_PATH + fileName;
}

/**
 * 選択された 2 枚のカードがペアかどうか
 * @returns ペアなら `true`, それ以外なら `false` を返却する
 */
const isCardPair = (): boolean => {
    const firstCardNumber = cardList[selectCardList[0]].value;
    const secondCardNumber = cardList[selectCardList[1]].value;
    return firstCardNumber === secondCardNumber;
}

/**
 * 結果メッセージを表示する
 * @param domItems 神経衰弱用 DOM 要素群
 * @param message 表示するメッセージ
 * @param className 設定するクラス名
 */
const showResultMessage = (domItems: MemoryWeaknessDomItems, message: string, className: string | null = null) => {
    const $messageArea = domItems.messageArea;
    $messageArea.innerText = message;
    if (className === null) {
        return;
    }
    $messageArea.classList.add(className);
}

/**
 * ペア数を示す文字列を作成する
 * @param pairCount ペア数
 * @returns ペア数を示す文字列
 */
const createPairCountValue = (pairCount: number): string => `${pairCount} ペア`;

/**
 * ミス数を示す文字列を作成する
 * @param missCount ミス数
 * @returns ミス数を示す文字列
 */
const createMissCountValue = (missCount: number): string => `${missCount} ミス`;

/**
 * ミスできる残り回数を示すメッセージを作成する
 * @param missCount ミスできる残り回数
 * @returns ミスできる残り回数を示すメッセージ
 */
const createStatusMessage = (missCount: number): string => `あと ${missCount} 回ミスできます。`;

/**
 * 選択中のカードを選択不可にする
 */
const setCardDisabled = () => {
    for (const cardNumber of selectCardList) {
        const $card = <HTMLImageElement | null>document.getElementById(`card_${cardNumber + 1}`);
        if ($card === null) {
            return;
        }
        $card.removeEventListener("dblclick", () => selectCard);
        $card.classList.add(Constant.GRAY_OUT_CLASS_NAME);
    }
}

/**
 * 裏向きになっているすべてのカードを表向きにする
 */
const flipAllCards = () => {
    // 裏向きになっているカード一覧
    // ※厳密には以下のクエリセレクター指定だと、現在選択中のカードも含まれてしまうが、ここでは気にしない
    const $targetList = <NodeListOf<HTMLImageElement>>document.querySelectorAll(`.card-image:not(.${Constant.GRAY_OUT_CLASS_NAME})`);
    $targetList.forEach($card => $card.src = createTrumpImagePath(Number($card.dataset.cardNumber)));
}

/**
 * 選択中のカードを裏向きにする
 */
const turnCardFaceDown = () => {
    // 裏向きカードのパス
    const filePath = Constant.IMAGE_FOLDER_PATH + Constant.DEFAULT_CARD_FILE_NAME + Constant.IMAGE_EXTENSION;
    for (const cardNumber of selectCardList) {
        const $card = <HTMLImageElement | null>document.getElementById(`card_${cardNumber + 1}`);
        if ($card === null) {
            return;
        }
        $card.src = filePath;
    }
}

/**
 * ライフ画像を最大ミス可能数分、ライフ表示エリアに追加する
 * @param domItems 神経衰弱用 DOM 要素群
 */
export const addLifeImages = (domItems: MemoryWeaknessDomItems) => {
    for (let i = Constant.MAX_MISS_NUMBER; i > 0; i--) {
        const $life = document.createElement("img");
        $life.id = `life_${i}`;
        $life.classList.add(Constant.LIFE_IMAGE_CLASS_NAME);
        $life.src = Constant.IMAGE_FOLDER_PATH + Constant.LIFE_IMAGE_FILE_NAME;
        domItems.lifeArea.appendChild($life);
    }
}

/**
 * ライフ表示エリアからライフ画像要素を削除する
 * @param domItems 神経衰弱用 DOM 要素群
 */
const removeLifeImages = (domItems: MemoryWeaknessDomItems) => {
    const $lifeImages = <NodeListOf<HTMLImageElement>>document.querySelectorAll(`.${Constant.LIFE_IMAGE_CLASS_NAME}`);
    $lifeImages.forEach($life => domItems.lifeArea.removeChild($life));
}

/**
 * ライフ画像を削除する
 */
const removeLife = () => {
    const $lifeImage = <HTMLImageElement>document.getElementById(`life_${missCount}`);
    $lifeImage.remove();
}

/**
 * img 要素に設定されたグレーアウト用のクラスを削除する
 */
const removeGrayOut = () => {
    const $targetList = <NodeListOf<HTMLImageElement>> document.querySelectorAll(`.${Constant.GRAY_OUT_CLASS_NAME}`);
    $targetList.forEach($target => $target.classList.remove(Constant.GRAY_OUT_CLASS_NAME));
}

/**
 * 指定された開始番号～終了番号までの連番一覧を生成する
 * @param start 開始番号
 * @param end 終了番号
 * @returns 開始番号～終了番号までの連番一覧
 */
const createNumberList = (start: number, end: number): number[] => {
    return Linq.range(start, end).toArray();
}

/**
 * 指定されたペア数分、トランプのペアを用意する
 * @param ranks トランプのカード番号一覧
 * @param maxPair 最大ペア数
 * @returns ペア一覧
 */
const createPairList = (ranks: number[], maxPair: number): { "type": number, "value": number }[] => {
    // トランプの絵札一覧
    const cardTypeList = Constant.CARD_TYPE_LIST;
    const types = createNumberList(0, cardTypeList.length - 1);

    const pairList = new Array();
    for (let i = 0; i < maxPair; i++) {
        const rank = ranks[i];
        // ジョーカー用の番号かどうか
        const isJoker = rank === Constant.JOKER_NUMBER;
        // 絵札をシャッフルする
        const cardTypeList = shuffleCardTypes(types, isJoker);

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
const shuffleCardTypes = (types: number[], isJoker: boolean): number[] => {
    if (isJoker) {
        // ジョーカーの場合
        // ジョーカー用のカードは 2 種類しかないので、 1 と 2 のみを格納した配列を用意する
        const jokerTypes = createNumberList(1, 2);
        return Linq.from(jokerTypes).shuffle().toArray();
    }

    return Linq.from(types).shuffle().toArray();
}

/**
 * トランプのカードをシャッフルする
 */
const shuffleCards = () => {
    // トランプのランク一覧
    const baseRanks = createNumberList(Constant.START_CARD_NUMBER, Constant.END_CARD_NUMBER);

    // ランク一覧シャッフル
    const ranks = Linq.from(baseRanks).shuffle().toArray();

    // 定義されている数のペアを用意する
    const basePairList = createPairList(ranks, Constant.MAX_PAIR_NUMBER);
    // 用意したペア一覧をシャッフルする
    cardList = Linq.from(basePairList).shuffle().toArray();
}

/**
 * カードが選択された場合に実行される処理
 * @param e マウスイベントオブジェクト
 * @param domItems 神経衰弱用 DOM 要素群
 * @returns
 */
const selectCard = async (e: MouseEvent, domItems: MemoryWeaknessDomItems) => {
    if (!isSelectable || isGameClear || isGameOver) {
        // 以下のいずれかの条件を満たしている場合、何もしない
        // 　・カードが選択不可状態
        // 　・ゲームクリア状態
        // 　・ゲームオーバー状態
        return;
    }

    const target = e.target;
    if (target === null) {
        return;
    }

    const $image = <HTMLImageElement>target;

    const cardNumber = Number($image.dataset.cardNumber);
    if (selectCardCount === 1 && selectCardList[0] === cardNumber) {
        // すでにカードが 1 枚選択されている場合、今回選択されたカードがひとつ前に選択されたカードと
        // 同じ場所だった場合は何もしない
        return;
    }
    // 選択されたトランプを表向きにする
    $image.src = createTrumpImagePath(cardNumber);

    // 選択されたカードの情報（場所）を配列に格納しておく
    selectCardList.push(cardNumber);
    selectCardCount++;

    if (selectCardCount !== Constant.SELECTABLE_NUMBER) {
        // カードが 2 枚選択されていない場合は、ここで処理終了
        return;
    }

    isSelectable = false;

    const isPair = isCardPair();

    // ペアかどうかで処理を分岐する
    if (isPair) {
        showResultMessage(domItems, "当たり！", Constant.HIT_CLASS_NAME);
        pairCount++;
        domItems.pairCountArea.textContent = createPairCountValue(pairCount);
    } else {
        showResultMessage(domItems, "はずれ…", Constant.MISS_CLASS_NAME);
        missCount++;
        domItems.missCountArea.textContent = createMissCountValue(missCount);
        removeLife();
    }

    // 結果がすぐに消えないよう、1 秒間待機する
    await sleep(1000);

    if (pairCount === Constant.MAX_PAIR_NUMBER) {
        // ペア数が最大ペア数に達した場合は、ゲームクリアとする
        isGameClear = true;
        domItems.messageArea.innerHTML = "ゲームクリア！<br/>おめでとう！";
        domItems.messageArea.classList.remove(Constant.HIT_CLASS_NAME);
        setCardDisabled();
        return;
    }

    if (missCount === Constant.MAX_MISS_NUMBER) {
        // ミス数が最大ミス可能回数に達した場合は、ゲームオーバーとする
        isGameOver = true;
        domItems.messageArea.textContent = "ゲームオーバー";
        domItems.messageArea.classList.remove(Constant.MISS_CLASS_NAME);
        flipAllCards();
        return;
    }

    // 再度トライできるように画面を整える
    domItems.messageArea.classList.remove(Constant.HIT_CLASS_NAME, Constant.MISS_CLASS_NAME);
    domItems.messageArea.textContent = createStatusMessage(Constant.MAX_MISS_NUMBER - missCount);
    isSelectable = true;

    // ペアだった場合は、該当のカードを選択不可に、ペアではなかった場合はカードを裏返す
    isPair ? setCardDisabled() : turnCardFaceDown();

    // 選択中のカード情報をリセットする
    selectCardCount = 0;
    selectCardList = [];
}

/**
 * リセットボタンが押された場合の処理
 * @param domItems 神経衰弱用 DOM 要素群
 * @returns {void}
 */
const resetGame = (domItems: MemoryWeaknessDomItems) => {
    if (pairCount === 0 && missCount === 0 && selectCardCount === 0) {
        // ゲームがプレイされていない場合は、何もしない
        return;
    }

    if (pairCount === Constant.MAX_PAIR_NUMBER || missCount === Constant.MAX_MISS_NUMBER) {
        // プレイが終了している場合は、そのままリセットする
        init(domItems);
        return;
    }

    if (!window.confirm("まだプレイ中ですが、リセットしますか？")) {
        return;
    }

    init(domItems);
}

export const init = (domItems: MemoryWeaknessDomItems) => {
    cardList = [];
    selectCardCount = 0;
    selectCardList = [];
    isSelectable = true;
    isGameClear = false;
    isGameOver = false;
    pairCount = 0;
    missCount = 0;

    // 初期状態で表示するトランプの裏向き画像パス
    const filePath = Constant.IMAGE_FOLDER_PATH + Constant.DEFAULT_CARD_FILE_NAME + Constant.IMAGE_EXTENSION;
    domItems.cardImages.forEach($image => {
        // カード画像設定要素群に、トランプの裏向き画像を初期状態としてセットする
        $image.src = filePath;

        // トランプ画像がダブルクリックされた場合のイベント定義
        $image.addEventListener("dblclick", (e) => selectCard(e, domItems));
    });

    // 「リセット」ボタンクリック時のイベント定義
    domItems.resetButton.addEventListener("click", (e) => resetGame(domItems));

    // ライフ画像要素が設定されている可能性があるので、いったん削除する
    removeLifeImages(domItems);
    // ライフの追加
    addLifeImages(domItems);

    removeGrayOut();

    const defaultCount = 0;
    // ペア数
    domItems.pairCountArea.textContent = createPairCountValue(defaultCount);
    // ミス数
    domItems.missCountArea.textContent = createMissCountValue(defaultCount);
    // 残りミス可能数
    domItems.messageArea.textContent = createStatusMessage(Constant.MAX_MISS_NUMBER);

    // カードをシャッフルする
    shuffleCards();
}
