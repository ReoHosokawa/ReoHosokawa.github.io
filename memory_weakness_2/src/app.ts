import { MemoryWeaknessDomItems } from './types/memory_weakness_dom_items';
import { createCardImages, selectCard, resetGame, addLifeImages, init } from "./memory_weakness";
import "./scss/index.scss";

/**
 * タッチ対応デバイスかどうか
 * @returns タッチ操作可能なら true 、それ以外は false を返却する
 */
const isTouchDevice = () => typeof window.ontouchstart === "object";

/**
 * 神経衰弱を実行するために必要な DOM 要素を読み出してオブジェクトで返却する
 * @returns 神経衰弱用 DOM 要素オブジェクト
 */
const readDomItems = (): MemoryWeaknessDomItems | null => {
    const $cardImages = <HTMLImageElement[]> Array.from(document.querySelectorAll(".card-image"));
    if ($cardImages.length === 0) {
        return null;
    }
    const $lifeArea = <HTMLDivElement | null> document.getElementById("life-area");
    if ($lifeArea === null) {
        return null;
    }
    const $pairCountArea = <HTMLDivElement | null> document.getElementById("pair-count-area");
    if ($pairCountArea === null) {
        return null;
    }
    const $missCountArea = <HTMLDivElement | null> document.getElementById("miss-count-area");
    if ($missCountArea === null) {
        return null;
    }
    const $messageArea = <HTMLDivElement | null> document.getElementById("message-area");
    if ($messageArea === null) {
        return null;
    }
    const $resetButton = <HTMLButtonElement | null> document.getElementById("reset-button");
    if ($resetButton === null) {
        return null;
    }

    return {
        cardImages: $cardImages,
        lifeArea: $lifeArea,
        pairCountArea: $pairCountArea,
        missCountArea: $missCountArea,
        messageArea: $messageArea,
        resetButton: $resetButton,
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
    domItems.resetButton.addEventListener("click", (e) => resetGame(domItems));

    init(domItems);

    // スマホで操作時、ダブルタップで拡大してしまうのを防止する
    document.addEventListener("dblclick", (e: MouseEvent) => e.preventDefault(), { passive: false });

    // タッチ対応デバイスかどうかに応じて、表示内容を切り替える
    const clickTypeValue = isTouchDevice() ? "タップ" : "クリック";

    const $subtitleArea = <HTMLDivElement>document.getElementById("subtitle-area");
    $subtitleArea.textContent = `カードをめくるときはダブル${clickTypeValue}！！`;
}


window.onload = appInit;

// 範囲選択を無効化する
document.addEventListener("selectstart", (e: Event) => e.preventDefault());
document.addEventListener("touchstart", (e: TouchEvent) => e.preventDefault());
