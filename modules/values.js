// @ts-check
import _base from './base.js';
import {fix, isNum, isStr} from './xutils.js';

const {PI,acos,hypot,round,abs} = Math;
const {radius, mwidth, nsize, lsize} = _base;


function rads(r = radius) {
    return [r, .9 * r, .5 * r, .2 * r];
}

// const [lsize, nsize] = [10, 7];
function checkResult(x = [[0],[0]]) {
    return (
        Array.isArray(x) && x.length === 2
        && x.every((u) => Array.isArray(u))
        && (x[0].length === nsize && x[0].every((u) => isNum(u)))
        // @ts-ignore
        && (x[1].length === lsize && x[1].every((u) => isStr(u)))
    );
}

function valuesClosure(rd = radius) {
    const A = Array(nsize).fill(0);
    const B = Array(lsize).fill('0');

    return (ox = 0, oy = 0) => {
        let [x, y] = [
            ( 1) * (ox - rd),
            (-1) * (oy - rd),
        ];

        let hp = hypot(x, y);

        if (hp < .05 * rd || hp > rd) {
            return null;
        }
        console.log('values: rad passed');
        // if (hp >= .05 * rd && hp <= rd) {
        let _cos = x / hp;
        let _sin = y / hp;
        let a = _sin >= 0 ? 0 : 1;
        a = (1 - 2*a) * (acos(_cos) - a * (2*PI));
        let _x = fix(rd * _cos);
        let _y = fix(rd * _sin);
        let _tg = _x !== 0 ? fix(_y/_x) : 0;
        let _ct = _y !== 0 ? fix(_x/_y) : 0;
        A[0] = fix(a);
        A[1] = _x;
        A[2] = _y;
        A[3] = fix(_tg * rd);
        A[4] = fix(_ct * rd);
        A[5] = round(hp);
        A[6] = abs(_tg) <= 1 ? 1 : 0;

        B[0] = `${A[0]} rad`;
        B[1] = `${A[1]}`;
        B[2] = `${A[2]}`;
        B[3] = `${_tg}`;
        B[4] = `${fix((hp / rd) * 100)}%`;
        B[5] = `${round(rd * a)}`;
        B[6] = `${fix(_cos)}`;
        B[7] = `${fix(_sin)}`;
        B[8] = `${round((a / PI) * 180)}°`;
        B[9] = `${fix((a / (2 * PI)) * 100)}%`;
        const result = [A,B];
        if (!checkResult(result)) {
            return null;
        }
        return result;
    };
}

export {valuesClosure, rads};
