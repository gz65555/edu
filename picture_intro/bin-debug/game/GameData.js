/**
 * Created by HuSong on 2016/12/10.
 */
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.config = [
        {
            drag_img: 'image_06_png',
            accept_img: '3_png',
            text: 'mother'
        },
        {
            drag_img: 'image_12_png',
            accept_img: '2_png',
            text: 'father'
        },
        {
            drag_img: 'image_14_png',
            accept_img: '1_png',
            text: 'brother'
        },
        {
            drag_img: 'image_16_png',
            accept_img: '4_png',
            text: 'sister'
        },
        {
            drag_img: 'image_22_png',
            accept_img: '6_png',
            text: 'grandmother'
        },
        {
            drag_img: 'image_24_png',
            accept_img: '5_png',
            text: 'grandfather'
        },
    ];
    GameData.score = 0;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
