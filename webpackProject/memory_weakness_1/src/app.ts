import { MemoryWeakness } from './memory_weakness';
import "./scss/index.scss";


const appInit = () => {
    const memoryWeakness = new MemoryWeakness();
    memoryWeakness.init();
}

window.onload = appInit;

// 範囲選択を無効化する
document.addEventListener("selectstart", (e: Event) => e.preventDefault());
document.addEventListener("touchstart", (e: TouchEvent) => e.preventDefault());
