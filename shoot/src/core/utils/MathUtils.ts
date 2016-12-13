/**
 * Created by Saco on 16/4/18.
 */
class MathUtils {
    private PI: number = 3.14;
    public angleToArc(angle: number): number {
        return angle / 180 * this.PI;
    }

    public distance(p1x: number, p1y: number, p2x: number, p2y: number): number {
        var total = Math.pow((p2x - p1x), 2) + Math.pow((p2y - p1y), 2);
        return Math.sqrt(total);
    }

    public pointDistance(p1: egret.Point, p2: egret.Point): number {
        return this.distance(p1.x, p1.y, p2.x, p2.y);
    }

    public getArc(startX: number, startY: number, endX: number, endY: number): number {
        return Math.atan2(endY - startY, endX - startX);
    }

    public getAngle(startX: number, startY: number, endX: number, endY: number): number {
        return Math.atan2(endY - startY, endX - startX) / this.PI * 180;
    }
}
