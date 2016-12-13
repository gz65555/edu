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
            text: 'mother'
        },
        {
            drag_img: 'image_12_png',
            text: 'father'
        },
        {
            drag_img: 'image_14_png',
            text: 'brother'
        },
        {
            drag_img: 'image_16_png',
            text: 'sister'
        },
        {
            drag_img: 'image_22_png',
            text: 'grandmother'
        },
        {
            drag_img: 'image_24_png',
            text: 'grandfather'
        },
    ];
    GameData.pic_mapping = [
        {
            text: 'mother',
            normal: 'rabbit_11_png',
            select: 'rabbit1_11_png',
            randomKey: 1
        },
        {
            text: 'father',
            normal: 'rabbit_09_png',
            select: 'rabbit1_09_png',
            randomKey: 1
        },
        {
            text: 'brother',
            normal: 'rabbit_17_png',
            select: 'rabbit1_17_png',
            randomKey: 1
        },
        {
            text: 'sister',
            normal: 'rabbit_14_png',
            select: 'rabbit1_14_png',
            randomKey: 1
        },
        {
            text: 'grandmother',
            normal: 'rabbit-19_png',
            select: 'rabbit1-19_png',
            randomKey: 1
        },
        {
            text: 'grandfather',
            normal: 'rabbit_06_png',
            select: 'rabbit1_06_png',
            randomKey: 1
        }
    ];
    GameData.score = 0;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
