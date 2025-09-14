// @ts-check
import _base from './base.js';
import {fix, isNum, isStr} from './xutils.js';

const {PI,acos,hypot,round,abs} = Math;
const {radius, mwidth, nsize, lsize} = _base;

function checkResult(x = [[0],[0]]) {
    return (
        Array.isArray(x) && x.length === 2
        && x.every((u) => Array.isArray(u))
        && (x[0].length === nsize && x[0].every((u) => isNum(u)))
        // @ts-ignore
        && (x[1].length === lsize && x[1].every((u) => isStr(u)))
    );
}

const values = {
    radii(r = radius) {
        return [r, .9 * r, .5 * r, .2 * r];
    },
    getResult(ox = 0, oy = 0, r = radius) {
        if (!(isNum(ox) && isNum(oy))) {
            return null;
        }
        const A = Array(nsize).fill(0);
        const B = Array(lsize).fill('0');
        let [x, y] = [
            ( 1) * (ox - r),
            (-1) * (oy - r),
        ];
        let hp = hypot(x, y);
        if (hp < .05 * r || hp > r) {
            return null;
        }
        let _cos = x / hp;
        let _sin = y / hp;
        let a = _sin >= 0 ? 0 : 1;
        a = (1 - 2*a) * (acos(_cos) - a * (2*PI));
        let _x = fix(r * _cos);
        let _y = fix(r * _sin);
        let _tg = _x !== 0 ? fix(_y/_x) : 0;
        let _ct = _y !== 0 ? fix(_x/_y) : 0;
        A[0] = fix(a);
        A[1] = _x;
        A[2] = _y;
        A[3] = fix(_tg * r);
        A[4] = fix(_ct * r);
        A[5] = round(hp);
        A[6] = abs(_tg) <= 1 ? 1 : 0;
        B[0] = `${A[0]} rad`;
        B[1] = `${A[1]}`;
        B[2] = `${A[2]}`;
        B[3] = `${_tg}`;
        B[4] = `${fix((hp / r) * 100)}%`;
        B[5] = `${round(r * a)}`;
        B[6] = `${fix(_cos)}`;
        B[7] = `${fix(_sin)}`;
        B[8] = `${round((a / PI) * 180)}°`;
        B[9] = `${fix((a / (2 * PI)) * 100)}%`;
        const result = [A,B];
        if (!checkResult(result)) {
            return null;
        }
        return result;
    }
};

export default values;
