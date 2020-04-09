/**
 * 骨骼动画模板设置，通过骨骼动画模板创建的骨骼动画，必须立即给与一个播放的动画，否则无法显示
 */
export module SkTemplete {
    /**
     * 气球动画加载模板
     */
    export let baoolonTemplet: Laya.Templet
    /**
     * 创建气球骨骼动画模板
     */
    export function createBaoolonTemplet(): void {
        Laya.loader.load([{ url: "Skeleton/balloon.png" }, { url: "Skeleton/balloon.sk" }], Laya.Handler.create(this, function () {
            // 创建动画模板
            baoolonTemplet = new Laya.Templet();
            baoolonTemplet.on(Laya.Event.COMPLETE, this, parseComplete_Balloon);
            baoolonTemplet.on(Laya.Event.ERROR, this, onError_Balloon);
            baoolonTemplet.loadAni("Skeleton/balloon.sk");
        }))
    }

    export function onError_Balloon(): void {
        console.log('模板气球骨骼动画加载错误！');
    }

    export function parseComplete_Balloon(): void {
        console.log('模板气球骨骼动画加载成功！');
    }



}
export default SkTemplete;