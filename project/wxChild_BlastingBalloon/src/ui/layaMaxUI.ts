/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui.test {
    export class BigUI extends Laya.Scene {
		public _list:Laya.List;
        public static  uiView:any ={"type":"Scene","props":{"x":0,"width":630,"height":751},"compId":2,"child":[{"type":"List","props":{"y":0,"x":4,"width":619,"var":"_list","vScrollBarSkin":" ","spaceY":7,"repeatX":1,"height":751,"elasticEnabled":true},"compId":3,"child":[{"type":"bigItem","props":{"runtime":"view/bigItem.ts","renderType":"render"},"compId":5}]}],"loadList":[],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(BigUI.uiView);
        }
    }
    REG("ui.test.BigUI",BigUI);
    export class BigItemUI extends Laya.View {
		public img_head:Laya.Image;
		public text_name:Laya.Label;
		public text_score:Laya.FontClip;
		public rankNum:Laya.Sprite;
        public static  uiView:any ={"type":"View","props":{"width":619,"height":141},"compId":2,"child":[{"type":"Sprite","props":{"y":0,"x":0,"texture":"rank/排行栏.png"},"compId":36},{"type":"Sprite","props":{"y":77,"x":171,"width":93,"texture":"rank/头像框描边.png","pivotY":50,"pivotX":50,"name":"contour","height":92},"compId":37},{"type":"Image","props":{"y":32,"x":127,"width":80,"var":"img_head","skin":"rank/头像.png","name":"","height":80},"compId":3,"child":[{"type":"Sprite","props":{"y":0,"x":-1,"width":82,"texture":"rank/头像框.png","renderType":"mask","height":82},"compId":26}]},{"type":"Label","props":{"y":83,"x":291,"width":131,"var":"text_name","valign":"middle","text":"老王哥","strokeColor":"#642b1a","stroke":1,"pivotY":19,"pivotX":66,"overflow":"visible","name":"","height":38,"fontSize":27,"font":"Microsoft YaHei","color":"#642b1a","align":"left"},"compId":4},{"type":"FontClip","props":{"y":72,"x":493,"width":47,"var":"text_score","value":"9","spaceX":-15,"skin":"rank/0123456789.png","sheet":"0123456789","pivotY":19,"pivotX":24,"name":"","height":37,"align":"center"},"compId":17},{"type":"Sprite","props":{"y":14,"x":6,"var":"rankNum","name":"rankNum"},"compId":30,"child":[{"type":"FontClip","props":{"y":64,"x":54,"width":70,"value":"45","spaceX":-16,"skin":"rank/名次.png","sheet":"0123456789","pivotY":23,"pivotX":35,"name":"rankNum_Num","height":45,"align":"center"},"compId":31},{"type":"Image","props":{"y":22,"x":16,"visible":false,"skin":"rank/NO1.png","name":"rankNum_pic","alpha":0},"compId":32}]},{"type":"Sprite","props":{"y":57.5,"x":521,"texture":"rank/关.png","name":"guan"},"compId":38}],"loadList":["rank/排行栏.png","rank/头像框描边.png","rank/头像.png","rank/头像框.png","rank/0123456789.png","rank/名次.png","rank/NO1.png","rank/关.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(BigItemUI.uiView);
        }
    }
    REG("ui.test.BigItemUI",BigItemUI);
}