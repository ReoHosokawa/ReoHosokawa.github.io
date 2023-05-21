import { MemoryWeakness } from './memory_weakness';
import "./scss/index.scss";


/**
 * タッチ対応デバイスかどうか
 * @returns タッチ操作可能なら true 、それ以外は false を返却する
 */
const isTouchDevice = () => typeof window.ontouchstart === "object";

const appInit = () => {
    const memoryWeakness = new MemoryWeakness();
    memoryWeakness.init();

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
