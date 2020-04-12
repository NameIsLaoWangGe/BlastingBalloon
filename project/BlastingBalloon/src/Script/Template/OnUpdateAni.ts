
/**
* 1.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
* 2.在onUpdate里面反复运行的持续性动画
*/
export module OnUpdateAni {

    /**主界面的放大和缩小动画的初始状态*/
    export let magnify_shrink_change_start = 'magnify';
    /**
     * 主界面开始按钮的放大和缩小动画
     * @param aniSwitch 开关，定义节点所在脚本上，方便控制
     * @param node 节点
     * @param change 放大缩小的初始状态包括'magnify'和'shrink'，决定先放大还是缩小
     * @param shrinkScale 每次减小的值
     * @param magnifyScale 每次放大的值
     * @param minScale 最小所放量
     * @param maxScale 最大所放量
     */
    export function magnify_shrink_start(aniSwitch, node, shrinkScale, magnifyScale, minScale, maxScale): void {
        if (aniSwitch) {
            if (magnify_shrink_change_start === 'magnify') {
                node.scaleX += magnifyScale;
                node.scaleY += magnifyScale;
                if (node.scaleX > maxScale) {
                    magnify_shrink_change_start = 'shrink';
                }
            } else if (magnify_shrink_change_start === 'shrink') {
                node.scaleX -= shrinkScale;
                node.scaleY -= shrinkScale;
                if (node.scaleX < minScale) {
                    magnify_shrink_change_start = 'magnify';
                }
            }
        }
    }


    /**主界面的放大和缩小动画的初始状态*/
    export let magnify_shrink_change_Prop = 'magnify';
    /**
     * 道具放大和缩小动画
     * @param aniSwitch 开关，定义节点所在脚本上，方便控制
     * @param node 节点
     * @param change 放大缩小的初始状态包括'magnify'和'shrink'，决定先放大还是缩小
     * @param shrinkScale 每次减小的值
     * @param magnifyScale 每次放大的值
     * @param minScale 最小所放量
     * @param maxScale 最大所放量
     */
    export function magnify_shrink_Prop(aniSwitch, node, shrinkScale, magnifyScale, minScale, maxScale): void {
        if (aniSwitch) {
            if (magnify_shrink_change_Prop === 'magnify') {
                node.scaleX += magnifyScale;
                node.scaleY += magnifyScale;
                if (node.scaleX > maxScale) {
                    magnify_shrink_change_Prop = 'shrink';
                }
            } else if (magnify_shrink_change_Prop === 'shrink') {
                node.scaleX -= shrinkScale;
                node.scaleY -= shrinkScale;
                if (node.scaleX < minScale) {
                    magnify_shrink_change_Prop = 'magnify';
                }
            }
        }
    }

}
export default OnUpdateAni;