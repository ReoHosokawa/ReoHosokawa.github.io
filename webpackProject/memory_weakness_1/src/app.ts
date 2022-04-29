import Linq from 'linq';
import { MemoryWeakness } from './memory_weakness';
import YuzuUser from './json/yuzu_user.json';
import "./scss/index.scss";


const appInit = () => {
    const memoryWeakness = new MemoryWeakness();
    memoryWeakness.init();
}

window.onload = appInit;
