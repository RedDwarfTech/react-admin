import BaseMethods from "js-wheel/dist/src/utils/data/BaseMethods";

export function getOptions(dicType:string,initialState:any): API.Dictionary[]|undefined {
    if(initialState&&initialState.dictionary&&initialState.dictionary.length>0){
        // https://stackoverflow.com/questions/4775722/how-can-i-check-if-an-object-is-an-array
        if(Object.prototype.toString.call(initialState.dictionary) === '[object Array]') {
            let dic = initialState.dictionary.filter(((item: { dict_type: string; }) => item.dict_type === dicType));
            return dic;
        }
    }
    return undefined;
}

/**
 * 
 * why pass the initial state parameter?
 * https://stackoverflow.com/questions/53472795/uncaught-error-rendered-fewer-hooks-than-expected-this-may-be-caused-by-an-acc
 * 
 * @param dicType 
 * @param key 
 * @param initialState 
 * @returns 
 */
export function getDictRenderText(dicType:string,key:number,initialState:any):string{
    let filteredDic:Array<API.Dictionary>|undefined = getOptions(dicType,initialState)?.filter((item)=>item.key === key);
    if(BaseMethods.isNull(filteredDic)){
        return "未知";
    }
    return filteredDic?.[0].show_value;
}

export function getDictPair(dicType:string,initialState:any): any{
    let filteredDic = getOptions(dicType,initialState)?.filter((item)=>item.dict_type === dicType);
    let dicMap = {};
    filteredDic?.forEach(item =>{
        dicMap[item.key] = item.show_value;
    })
    return dicMap;
}



