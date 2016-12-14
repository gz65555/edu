/**
 * Created by HuSong on 2016/12/13.
 */
class GameData {
    static START_CD = 3;
    static GAME_CD = 6;
    static SPEED_UP_CD = 8;
    static END_SPEED = 3;
    static MAX_INDEX = 9;
    static START_Y = 215;
    static END_Y = -200;

    static score = 0;

    static BALL_CONFIG = [
        {
            ballImg: 'image123_03_png',
            boomImg: 'image1234_29_png'
        },
        {
            ballImg: 'image123_05_png',
            boomImg: 'image1234_27_png'
        },
        {
            ballImg: 'image123_07_png',
            boomImg: 'image123_12_png'
        },
        {
            ballImg: 'image123_09_png',
            boomImg: 'image123_14_png'
        }
    ];

    static ALL_QUESTION = [
        {
            text:'punctual',
            show:'punctual',
            audio:'good_mp3'
        },
        {
            text:'doctor',
            show:'doctor',
            audio:'good_mp3'
        },
        {
            text:'librarian',
            show:'librarian',
            audio:'good_mp3'
        },
        {
            text:'organized',
            show:'organized',
            audio:'good_mp3'
        },
        {
            text:'cleaning lady',
            show:'cleaning\nlady',
            audio:'good_mp3'
        },
        {
            text:'football coach',
            show:'football\ncoach',
            audio:'good_mp3'
        },
        {
            text:'cook',
            show:'cook',
            audio:'good_mp3'
        },
        {
            text:'caring',
            show:'caring',
            audio:'good_mp3'
        },
        {
            text:'energetic',
            show:'energetic',
            audio:'good_mp3'
        },
    ];

    static QUESTIONS_MAP = {
        punctual: 1,
        energetic: 1,
        caring: 1,
        cook: 1,
        'football coach': 1,
        'cleaning lady': 1,
        organized: 1,
        doctor: 1,
        librarian: 1
    }
}