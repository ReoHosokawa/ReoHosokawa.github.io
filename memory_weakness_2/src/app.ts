import { MemoryWeaknessDomItems } from './types/memory_weakness_dom_items';
import { createCardImages, selectCard, resetGame, addLifeImages, init } from "./memory_weakness";
import "./scss/index.scss";
import "./scss/nav.scss";


/**
 * 神経衰弱を実行するために必要な DOM 要素を読み出してオブジェクトで返却する
 * @returns 神経衰弱用 DOM 要素オブジェクト
 */
const readDomItems = (): MemoryWeaknessDomItems | null => {
    const $cardImages = <HTMLImageElement[]>Array.from(document.querySelectorAll(".card-image"));
    if ($cardImages.length === 0) {
        return null;
    }
    const $lifeArea = <HTMLDivElement | null>document.getElementById("life-area");
    if ($lifeArea === null) {
        return null;
    }
    const $pairCountArea = <HTMLDivElement | null>document.getElementById("pair-count-area");
    if ($pairCountArea === null) {
        return null;
    }
    const $messageArea = <HTMLDivElement | null>document.getElementById("message-area");
    if ($messageArea === null) {
        return null;
    }

    return {
        cardImages: $cardImages,
        lifeArea: $lifeArea,
        pairCountArea: $pairCountArea,
        messageArea: $messageArea,
    };
}

const appInit = () => {
    // トランプ画像セット用要素を画面に追加する
    createCardImages();

    const domItems = readDomItems();
    if (domItems === null) {
        return;
    }

    domItems.cardImages.forEach($image => {
        // トランプ画像がダブルクリックされた場合のイベント定義
        $image.addEventListener("dblclick", (e) => selectCard($image, domItems));
    });

    // 「リセット」ボタンクリック時のイベント定義
    const $resetButton = <HTMLAnchorElement | null>document.getElementById("reset-button");
    if ($resetButton === null) {
        return;
    }
    $resetButton.addEventListener("click", (e) => resetGame(domItems));

    // ライフ画像を画面に追加する
    addLifeImages(domItems);

    init(domItems);

    // スマホで操作時、ダブルタップで拡大してしまうのを防止する
    document.addEventListener("dblclick", (e: MouseEvent) => e.preventDefault(), { passive: false });
}


window.onload = appInit;

// 範囲選択を無効化する
document.addEventListener("selectstart", (e: Event) => e.preventDefault());
document.addEventListener("touchstart", (e: TouchEvent) => e.preventDefault());
