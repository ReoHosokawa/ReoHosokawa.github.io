/**
 * 指定された数値の先頭を 0 埋めする
 * @param target 対象の数値
 * @param len 0 埋めする桁数
 * @returns 0 埋めした後の値
 */
const zeroPadding = (target: number, length: number): string => String(target).padStart(length, "0");

/**
 * 指定された時間、処理を停止する
 * @param ms 処理を停止する時間（ミリ秒）
 * @returns なし
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
