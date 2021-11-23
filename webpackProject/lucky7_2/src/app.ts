import './scss/index.scss';
import './scss/buttons.scss';
import { Lucky7 } from './lucky7';


/**
 * ページ読み込み完了時に呼び出される関数
 */
const appInit = () => {
    // Lucky7 インスタンスの生成
    const lucky7 = new Lucky7();
    // イベントリスナーの登録
    lucky7.addEvent();

    // ゲーム初期化
    lucky7.init();
};

// ページ読み込み完了時に実行する処理を定義する
window.onload = appInit;
