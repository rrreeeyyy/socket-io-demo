import _ from 'underscore'
import * as Util from './js/utility.js';
import Map from './js/map.js';
import Avatar from './js/avatar.js';

var stage, map, myAvatar;
var others = [];


function initialize() {
    // canvasタグを取得
    var canvasElement = document.getElementById("my-canvas");
    // ステージの準備
    stage = new createjs.Stage(canvasElement);

    // マップ生成
    map = new Map();
    stage.addChild(map);

    // 自分のアバター
    myAvatar = new Avatar({
        cellX: 1,
        cellY: 1,
        image: '/img/pokemonrgb_various_sheet.png'
    });
    map.addChild(myAvatar);

    // キーボード入力を監視
    document.onkeydown = (e) => {
        var _dir = null;
        var _walkDisable = false;
        var nowX = myAvatar.getCellX(),
            nowY = myAvatar.getCellY();
        switch(e.keyCode) {
            case 38: 
                _dir = 'up';
                _walkDisable = map.validateCell(nowX, nowY - 1);
                break;
            case 37:
                _dir = 'left';
                _walkDisable = map.validateCell(nowX - 1, nowY);
                break;
            case 39:
                _dir = 'right';
                _walkDisable = map.validateCell(nowX + 1, nowY);
                break;
            case 40:
                _dir = 'down';
                _walkDisable = map.validateCell(nowX, nowY + 1);
                break;
            default: return;
        }
        myAvatar.walk(_dir, _walkDisable);
    };

    // キーボード入力終了を監視
    document.onkeyup = (e) => {
        myAvatar.stopWalk();
    };

    // 1コマ毎にupdate
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });
}


function addOtherAvatar() {

}


initialize();
