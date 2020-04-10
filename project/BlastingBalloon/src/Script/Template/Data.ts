export module Data {

    export let levelsData: JSON;

    /**
     * 关卡数据表
     */
    export function dataLoading_Levels() {
        Laya.loader.load("Data/levelsData.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
    }

    export function onLoaded(): void {
        levelsData = Laya.loader.getRes("Data/levelsData.json")["RECORDS"];
        console.log(levelsData);
    }
}
export default Data;