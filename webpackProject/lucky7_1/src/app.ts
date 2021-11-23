import './scss/index.scss';

interface Lucky7Elements {
    messageArea: HTMLDivElement;
    remainingCount: HTMLLabelElement;
    score: HTMLSpanElement;
    btnSpin: HTMLButtonElement;
    btnStop: HTMLButtonElement;
    btnReset: HTMLButtonElement;
    imgCoin: HTMLImageElement;
    spins: NodeListOf<HTMLSpanElement>;
}

interface PointList {
    [key: number]: number
}

/**
 * 7 の数に応じて加算されるポイントの一覧
 */
const POINT_LIST: PointList = {
    0: 0,
    1: 5,
    2: 20,
    3: 100
};

/**
 * スピン実行最大回数
 */
const SPIN_MAX_COUNT = 20;

/**
 * メッセージエリアにデフォルトで出す文字列
 */
const DEFALT_MESSAGE = 'スピンして 7 が出たらポイントゲット！';

/**
 * 指定された時間、処理をストップさせる関数
 * @param ms 停止したい時間（ミリ秒）
 * @returns なし
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * スピン要素の文字色を赤色に変更する関数
 * @param spins スピン要素群
 */
const setSpinFontColorRed = (spins: NodeListOf<HTMLSpanElement>) => {
    spins.forEach(spin => spin.style.color = 'red');
};
// const setSpinFontColorRed2 = (...spins: HTMLSpanElement[]) => {
//     for (const spin of spins) {
//         spin.style.color = 'red';
//     }
// };

/**
 * スピン要素の文字色を金色に変更する関数
 * @param spins スピン要素群
 */
const setSpinFontColorGold = (spins: NodeListOf<HTMLSpanElement>) => {
    spins.forEach(spin => spin.style.color = 'gold');
};
// const setSpinFontColorGold2 = (...spins: HTMLSpanElement[]) => {
//     for (const spin of spins) {
//         spin.style.color = 'gold';
//     }
// };

/**
 * スピン要素にセットされた 7 の数をカウントする関数
 * @param spins スピン要素群
 * @returns 7 のカウント数
 */
const countNumberOfSeven = (spins: NodeListOf<HTMLSpanElement>): number => {
    const spinArray = Array.from(spins);
    return spinArray.reduce((acc, spin) => Number(spin.textContent) === 7 ? acc + 1 : acc, 0);
}
// const countNumberOfSeven2 = (...spins: HTMLSpanElement[]): number => {
//     return spins.reduce((acc, spin) => Number(spin.textContent) === 7 ? acc + 1 : acc, 0);
// };

/**
 * コイン画像の表示 ON / OFF を切り替える関数
 * @param imgCoin コイン画像表示要素
 */
const toggleCoinImageOnOff = (imgCoin: HTMLImageElement) => {
    const isVisible = imgCoin.style.visibility === 'visible';
    imgCoin.style.visibility = !isVisible ? 'visible' : 'hidden';
};

const reset = (elements: Lucky7Elements) => {
    // リセット
    elements.messageArea.textContent = DEFALT_MESSAGE;
    elements.remainingCount.textContent = SPIN_MAX_COUNT.toString();
    elements.score.textContent = '0';
    elements.btnSpin.disabled = false;
    elements.btnStop.disabled = true;
    elements.btnReset.disabled = true;
    elements.imgCoin.style.visibility = 'hidden';

    elements.spins.forEach(spin => spin.textContent = "");
};

const appInit = () => {
    // メッセージ表示エリア
    const messageArea = <HTMLDivElement>document.getElementById('messageArea');
    // スピン要素
    // const spin1 = <HTMLSpanElement>document.getElementById('spin1');
    // const spin2 = <HTMLSpanElement>document.getElementById('spin2');
    // const spin3 = <HTMLSpanElement>document.getElementById('spin3');
    const spins = <NodeListOf<HTMLSpanElement>>document.querySelectorAll(".spinLabel");
    // スピン残回数表示要素
    const remainingCount = <HTMLLabelElement>document.getElementById('remainingCount');
    // スコア表示要素
    const score = <HTMLSpanElement>document.getElementById('score');
    // コイン画像表示要素
    const imgCoin = <HTMLImageElement>document.getElementById('imgCoin');
    // 「スピン」ボタン
    const btnSpin = <HTMLButtonElement>document.getElementById('btnSpin');
    // 「ストップ」ボタン
    const btnStop = <HTMLButtonElement>document.getElementById('btnStop');
    // 「リセット」ボタン
    const btnReset = <HTMLButtonElement>document.getElementById('btnReset');

    let spinInterval: NodeJS.Timeout | null = null;

    btnSpin.addEventListener('click', () => {
        btnSpin.disabled = true;
        btnStop.disabled = false;
        btnReset.disabled = true;
        imgCoin.style.visibility = 'hidden';
        // スピン要素の文字色を金色に変更する
        setSpinFontColorGold(spins);

        spinInterval = setInterval(() => {
            spins.forEach(spin => {
                const rnd = Math.floor(Math.random() * 9);
                spin.textContent = rnd.toString();
            });
            // const rnd1 = Math.floor(Math.random() * 9);
            // const rnd2 = Math.floor(Math.random() * 9);
            // const rnd3 = Math.floor(Math.random() * 9);
            // spin1.textContent = rnd1.toString();
            // spin2.textContent = rnd2.toString();
            // spin3.textContent = rnd3.toString();
        }, 10);
    });

    btnStop.addEventListener('click', async () => {
        btnStop.disabled = true;
        if (spinInterval) {
            clearInterval(spinInterval);
        }

        // 7 の数をカウントする
        const numberOfSeven = countNumberOfSeven(spins);
        // 加算ポイント数を取得する
        const addPoint = POINT_LIST[numberOfSeven];
        // 現在のスコアを取得する
        const currentScore = Number(score.textContent);
        // 合計スコアを更新する
        score.textContent = (currentScore + addPoint).toString();

        // 現在の残り回数を取得する
        const currentRemainingCount = Number(remainingCount.textContent);
        // 残り回数を 1 減らす
        remainingCount.textContent = (currentRemainingCount - 1).toString();

        if (numberOfSeven === 3) {
            // スピン要素が 3 つとも 7 だった場合、文字色を赤に変更する
            setSpinFontColorRed(spins);
        }

        if (numberOfSeven > 0) {
            // 7 が 1 つでも出ていた場合、コイン画像を出現させる
            for (let i = 0; i <= 6; i++) {
                // setTimeout(toggleCoinImageOnOff, 100, imgCoin);
                await sleep(100);
                toggleCoinImageOnOff(imgCoin);
            }
        }

        btnReset.disabled = false;

        if (currentRemainingCount === 1) {
            // 現在の残り回数が 1 だった場合は、ゲーム終了とする
            messageArea.textContent = `あなたの最終スコアは ${score.textContent} ポイントです！`;
            return;
        }

        btnSpin.disabled = false;
    });

    const elements: Lucky7Elements = {
        messageArea: messageArea,
        spins: spins,
        remainingCount: remainingCount,
        score: score,
        imgCoin: imgCoin,
        btnSpin: btnSpin,
        btnStop: btnStop,
        btnReset: btnReset,
    };

    btnReset.addEventListener('click', () => {
        const spinNumber = Number(remainingCount.textContent);
        if (spinNumber !== 0 && !window.confirm('まだ途中ですが、リセットしてもよろしいですか？')) {
            return;
        }

        reset(elements);
    });

    // 初回読み込み時の初期化処理
    reset(elements);
};

window.onload = appInit;
