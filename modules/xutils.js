// @ts-check
const isNum = (x = 0 , max = 24) => typeof x === 'number' && isFinite(x) && String(x).length < max;                
const isStr = (x = '', max = 24) => typeof x === 'string' && x.length < max;
const fix = (n = 0, p = 2) => +(n.toFixed(p));

export {isNum, isStr, fix};