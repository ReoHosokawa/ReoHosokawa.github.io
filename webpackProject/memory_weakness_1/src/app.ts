import { MemoryWeakness } from './memory_weakness';
import "./scss/index.scss";


const appInit = () => {
    const memoryWeakness = new MemoryWeakness();
    memoryWeakness.init();
}

window.onload = appInit;
