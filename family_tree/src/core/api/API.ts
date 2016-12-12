/**
 * Created by Saco on 16/3/14.
 */
class Api {
    /**
     * 国际化资源管理
     */
    public static GlobalRes: GlobalRes;
    /**
     * 游戏socket中心
     */
    // public static GameSocket: GameSocket;
    /**
     * 模块管理
     */
    public static ModuleManager: ModuleManager;
    /**
     * 消息派发
     */
    // public static MessageCenter: MessageCenter;
    /**
     * 日期和时间工具类
     */
    public static DateUtil: DateUtil;
    /**
     * 资源加载管理模块
     */
    public static ResourceUtil: ResourceUtil;
    /**
     * 输出日志模块
     */
    public static Log: Log;
    /**
     * 游戏显示层级
     */
    public static Layers: Layers;
    /**
     * 视图管理
     */
    public static ViewManager: ViewManager;
    /**
     * 舞台
     */
    public static StageUtil: StageUtil;
    /**
     * urlLoaderpool
     */
    public static URLLoaderPool: URLLoaderPool;
    /**
     * TimerManager
     */
    public static TimerManager: TimerManager;
    /**
     * Gesture
     */
    public static Gesture: Gesture;
    /**
     *  Format util
     */
    public static NumberFormat: NumberFormat;
    /**
     *  textflow maker
     */
    public static TextFlowMaker: TextFlowMaker;
    /**
     * Arrayutil
     */
    public static ArrayUtil: ArrayUtil;
    /**
     * TipsManager
     */
    public static TipsManager: TipsManager;
    /**
     * DragManager
     */
    public static DragManager: DragManager;
    /**
     * Dialogue
     */
    public static Dialogue: Dialogue;
    /**
     * MathUtils
     */
    public static MathUtils: MathUtils;
    /**
     * Keyboard
     */
    public static Keyboard: Keyboard;

    /**
     * exclude valid value:GameSocket,Log,NumberFormat,DragManager,Gesture,Keyboard,URLLoaderPool
     * module excluded wouldnt be inited
     */
    public static Init(stage: egret.Stage, exclude?: string): void {
        Api.GlobalRes = new GlobalRes();
        Api.StageUtil = new StageUtil(stage);
        Api.ModuleManager = new ModuleManager();
        // Api.MessageCenter = new MessageCenter();
        Api.DateUtil = new DateUtil();
        Api.ResourceUtil = new ResourceUtil();
        Api.Layers = new Layers(stage);
        Api.ViewManager = new ViewManager();
        Api.TimerManager = new TimerManager();
        Api.ArrayUtil = new ArrayUtil();
        Api.TipsManager = new TipsManager();
        Api.Dialogue = new Dialogue();
        Api.MathUtils = new MathUtils();

        Api.URLLoaderPool = new URLLoaderPool();
        // Api.GameSocket = new GameSocket();
        Api.TextFlowMaker = new TextFlowMaker();
        Api.Log = new Log();
        Api.NumberFormat = new NumberFormat();
        Api.DragManager = new DragManager();
        Api.Gesture = new Gesture();
        Api.Keyboard = new Keyboard();
    }
}
