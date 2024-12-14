
/**
 * 神経衰弱用 DOM 要素
 */
export interface MemoryWeaknessDomItems {

    /**
     * カード画像要素配置用要素群
     */
    cardAreas: HTMLLIElement[];

    /**
     * カード画像（表）要素群
     */
    frontCardImages: HTMLImageElement[];

    /**
     * カード画像（裏）要素群
     */
    backCardImages: HTMLImageElement[];

    /**
     * ライフ画像表示領域要素
     */
    lifeArea: HTMLDivElement;

    /**
     * ペア数表示要素
     */
    pairCountArea: HTMLDivElement;

    /**
     * メッセージ表示要素
     */
    messageArea: HTMLDivElement;
}
