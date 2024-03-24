
/**
 * 神経衰弱用 DOM 要素
 */
export interface MemoryWeaknessDomItems {
    /**
     * カード画像要素群
     */
    cardImages: HTMLImageElement[];

    /**
     * ライフ画像表示領域要素
     */
    lifeArea: HTMLDivElement;

    /**
     * ペア数表示要素
     */
    pairCountArea: HTMLDivElement;

    /**
     * ミス数表示要素
     */
    missCountArea: HTMLDivElement;

    /**
     * メッセージ表示要素
     */
    messageArea: HTMLDivElement;

    /**
     * リセットボタン要素
     */
    resetButton: HTMLButtonElement;
}
