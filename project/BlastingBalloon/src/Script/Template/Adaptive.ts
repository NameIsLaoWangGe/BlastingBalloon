/**
 * number.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
 * 2.适配模块
 */
export module Adaptive {
    /**
     * 当前界以场景Y轴居中适配，povitX和povitY需要居中
     * @param self 当前界面的prefab
     */
    export function interface_Center(self): void {
        self.width = 750;
        self.pivotX = self.width / 2;
        self.pivotY = self.height / 2;
        self.pos(375, Laya.stage.height / 2);
    }

    /**
     * 界面内子元素以当前界面Y轴居中适配，povitX和povitY需要居中
     * @param child 界面内子节点
     * @param parent 当前界面
     * @param location 所在位置的比例
    */
    export function child_Center(child, parent, location): void {
        child.y = location - (Laya.stage.height / 2 - parent.height / 2);
    }

    /**
      * 界面背景以当前界面Y轴居中适配,背景的povit和界面需相同
      * @param background 背景
      * @param parent 当前界面
     */
    export function background_Center(background, parent): void {
        background.y = background.y - (Laya.stage.height / 2 - parent.height / 2);
        background.width = Laya.stage.width;
        background.height = Laya.stage.height;
    }





}

export default Adaptive;