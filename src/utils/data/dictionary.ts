import { useModel } from "umi";

export function getOptions(dicType:string): API.Dictionary[]|undefined {
    const { initialState } = useModel('@@initialState');
    let dic = initialState?.dictionary?.filter((item => item.dict_type === 'JOB_STATUS'));
    return dic;
}
