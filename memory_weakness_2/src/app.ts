import { MemoryWeaknessDomItems } from './types/memory_weakness_dom_items';
import { addLifeImages, init } from "./memory_weakness";
import "./scss/index.scss";



/**
 * 神経衰弱用 DOM 要素格納用変数
 */
let domItems: MemoryWeaknessDomItems;

/**
 * タッチ対応デバイスかどうか
 * @returns タッチ操作可能なら true 、それ以外は false を返却する
 */
const isTouchDevice = () => typeof window.ontouchstart === "object";

/**
 * 神経衰弱を実行するために必要な DOM 要素を読み出してオブジェクトで返却する
 * @returns 神経衰弱用 DOM 要素オブジェクト
 */
const readDomItems = (): MemoryWeaknessDomItems => {
    const $cardImages = <HTMLImageElement[]> Array.from(document.querySelectorAll(".cardImage"));
    const $lifeArea = <HTMLDivElement> document.getElementById("lifeArea");
    const $pairCountArea = <HTMLDivElement> document.getElementById("pairCountArea");
    const $missCountArea = <HTMLDivElement> document.getElementById("missCountArea");
    const $messageArea = <HTMLDivElement> document.getElementById("messageArea");
    const $resetButton = <HTMLButtonElement> document.getElementById("resetButton");

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
    domItems = readDomItems();

    // ライフ画像を画面に追加する
    addLifeImages(domItems);

    init(domItems);

    // スマホで操作時、ダブルタップで拡大してしまうのを防止する
    document.addEventListener("dblclick", (e: MouseEvent) => e.preventDefault(), { passive: false });

    // タッチ対応デバイスかどうかに応じて、表示内容を切り替える
    const clickTypeValue = isTouchDevice() ? "タップ" : "クリック";

    const $subtitleArea = <HTMLDivElement>document.getElementById("subtitleArea");
    $subtitleArea.textContent = `カードをめくるときはダブル${clickTypeValue}！！`;
}

window.onload = appInit;

// 範囲選択を無効化する
document.addEventListener("selectstart", (e: Event) => e.preventDefault());
document.addEventListener("touchstart", (e: TouchEvent) => e.preventDefault());
