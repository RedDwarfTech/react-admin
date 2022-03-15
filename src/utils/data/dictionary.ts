import BaseMethods from "js-wheel/dist/src/utils/data/BaseMethods";

export function getOptions(dicType:string,initialState:any): API.Dictionary[]|undefined {
    let dic = initialState?.dictionary?.filter(((item: { dict_type: string; }) => item.dict_type === 'JOB_STATUS'));
    return dic;
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
export function getRenderText(dicType:string,key:number,initialState:any):string{
    let filteredDic:Array<API.Dictionary>|undefined = getOptions(dicType,initialState)?.filter((item)=>item.key === key);
    if(BaseMethods.isNull(filteredDic)){
        return "未知";
    }
    return filteredDic?.[0].show_value;
}

