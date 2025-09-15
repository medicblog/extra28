const fix = (n = 0, p = 2) => +(n.toFixed(p));
const isNum = (x = 0 , max = 24) => typeof x === 'number' && isFinite(x) && String(x).length < max;                
const isStr = (x = '', max = 24) => typeof x === 'string' && x.length < max;
const isArrF = (x) => Array.isArray(x) && x.length > 0;
const isArrNum = (x = [0], max = 24) => isArrF(x) && x.every((i) => isNum(i, max));
const isArrStr = (x = [''], max = 24) => isArrF(x) && x.every((i) => isStr(i, max));
const isObj = (x = {}) => x && typeof x === 'object' && !Array.isArray(x);
export {
    fix,
    isNum,
    isStr,
    isArrNum,
    isArrStr,
    isObj
};
