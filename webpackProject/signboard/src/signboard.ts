

/**
 * サインボードクラス
 */
export class Signboard {

    // -------------------------------------
    // 構築・消滅
    // -------------------------------------
    public constructor() {
        this.displayPanel = <HTMLDivElement>document.getElementById("displayPanel");
        this.controlPanel = <HTMLInputElement>document.getElementById("controlPanel");
        this.textBox = <HTMLInputElement>document.getElementById("textBox");
        this.applyButton = <HTMLInputElement>document.getElementById("applyButton");
        this.clearButton = <HTMLInputElement>document.getElementById("clearButton");
    }

    // -------------------------------------
    // パブリックメソッド
    // -------------------------------------

    /**
     * イベント処理を追加する
     */
    public AddEvent = () => {
        this.applyButton.addEventListener("click", this.ApplyButtonClick, false);
        this.clearButton.addEventListener("click", this.ClearText, false);
        
        window.onresize = this.SetPosition;
        document.body.onclick = this.SwitchPanel;
        this.controlPanel.onclick = (event: Event) => event.cancelBubble = true;
    }

    /**
     * 保存したメッセージを読み込む
     * @returns 
     */
    public LoadText = () => {
        const storage = localStorage;
        if (typeof storage === "undefined") {
            return;
        }

        const text = storage.getItem("text");
        if (!text) {
            return;
        }

        this.SetText(text);
    }

    // -------------------------------------
    // プライベートメソッド
    // -------------------------------------

    /**
     * 「表示」ボタンが押下された時に呼び出されるメソッド
     */
     private ApplyButtonClick = () => {
        const text = this.textBox.value;
        this.SetText(text);
        this.SaveText(text);
    }

    /**
     * メッセージの表示位置を設定する
     */
     private SetPosition = () => {
        const bodyHeight = document.body.clientHeight;
        const divHeight = this.displayPanel.clientHeight;
        this.displayPanel.style.top = `${(bodyHeight - divHeight) / 2}px`;
    }

    /**
     * 操作用領域の表示・非表示を切り替える
     */
    private SwitchPanel = () => {
        const visibility = this.controlPanel.style.visibility;
        this.controlPanel.style.visibility = visibility === "hidden"
            ? "visible"
            : "hidden";
    }

    /**
     * 入力されたメッセージを消去する
     */
    private ClearText = () => {
        this.displayPanel.textContent = "";
    }

    /**
     * 指定されたメッセージをローカルストレージに保存する
     * @param text 対象のメッセージ
     * @returns 
     */
    private SaveText = (text: string) => {
        const storage = localStorage;
        if (typeof storage === "undefined") {
            return;
        }

        storage.setItem("text", text);
    }

    /**
     * 指定された文字列を画面に表示する
     * @param text 対象の文字列
     */
    private SetText = (text: string) => {
        this.displayPanel.textContent = text;

        this.displayPanel.style.fontSize = this.GetFontSize(text);
        this.SetPosition();
        this.SwitchPanel();
    }

    /**
     * 指定された文字列に合う文字サイズを取得する
     * @param text 対象の文字列
     * @returns 文字サイズ
     */
    private GetFontSize = (text: string): string => {
        if (text.length < 6) {
            return "72px";
        }

        if (text.length < 11) {
            return "48px";
        }

        return "36px";
    }

    // -------------------------------------
    // フィールド変数
    // -------------------------------------

    /**
     * メッセージ表示領域
     */
    private displayPanel: HTMLDivElement;

    /**
     * 画面操作領域
     */
    private controlPanel: HTMLDivElement;

    /**
     * メッセージ入力用テキストボックス
     */
    private textBox: HTMLInputElement;

    /**
     * 「表示」ボタン
     */
    private applyButton: HTMLInputElement;

    /**
     * 「消去」ボタン
     */
    private clearButton: HTMLInputElement;
}