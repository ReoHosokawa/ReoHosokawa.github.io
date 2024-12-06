/**
 * 1 行あたりのカード枚数
 */
const CARD_COUNT_PER_ONE_ROW = 5;

/**
 * カードテーブルの最大行数
 */
const CARD_TABLE_MAX_ROW_NUMBER = 4;

/**
 * 各ターンで選択可能なカードの枚数
 */
const SELECTABLE_NUMBER = 2;

/**
 * 最大ペア数
 */
const MAX_PAIR_NUMBER = 10;

/**
 * トランプの画像（ジョーカー）を示す番号
 */
const JOKER_NUMBER = 14;

/**
 * ジョーカーを示す絵札番号
 */
const JOKER_TYPE = 4;

/**
 * トランプ画像の開始番号
 */
const START_CARD_NUMBER = 1;

/**
 * トランプ画像の終了番号
 */
const END_CARD_NUMBER = 14;

/**
 * 画像フォルダのパス
 */
const IMAGE_FOLDER_PATH = "./images/";

/**
 * トランプ画像の拡張子
 */
const IMAGE_EXTENSION = ".gif";

/**
 * 裏向きトランプ画像のファイル名
 */
const DEFAULT_CARD_FILE_NAME = "z02";

/**
 * ライフ画像のファイル名
 */
const LIFE_IMAGE_FILE_NAME = "lifeImage.png";

/**
 * 最大ミス可能回数
 */
const MAX_MISS_NUMBER = 7;

/**
 * ライフエリア要素のクラス名
 */
const LIFE_IMAGE_CLASS_NAME = "life-image";

/**
 * カードの絵札（スペード、ハート、ダイヤ、クラブ、ジョーカー）別 key と value の一覧
 */
const CARD_TYPE_LIST = [
    { "key": "Spade", "value": "s" },
    { "key": "Heart", "value": "h" },
    { "key": "Diamond", "value": "d" },
    { "key": "Club", "value": "c" },
    { "key": "Joker", "value": "x" },
];

/**
 * 正解時にセットするクラス名
 */
const HIT_CLASS_NAME = "hit";

/**
 * 不正解時にセットするクラス名
 */
const MISS_CLASS_NAME = "miss";

/**
 * グレーアウトデザインを適用するためのクラス名
 */
const GRAY_OUT_CLASS_NAME = "gray-out";

/**
 * 選択中のカード情報初期値
 */
const DEFAULT_SELECTED_CARD_NUMBERS = {
    first: -1,
    second: -1,
};
