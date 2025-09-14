// @ts-check
import _base from './globals/base.js';
import {fix, isNum, isArrNum, isArrStr} from './globals/utils.js';
const {PI,acos,hypot,round,abs} = Math;
const {radius, nsize, lsize} = _base;
const values = {
    radii(r = radius) {
        return [r, .9 * r, .5 * r, .2 * r];
    },
    getResult(ox = 0, oy = 0, r = radius) {
        if (!(isNum(ox) && isNum(oy))) {
            return null;
        }
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
        const result = {
            _values: {
                a: fix(a),
                x: _x,
                y: _y,
                tg: fix(_tg * r),
                ct: fix(_ct * r),
                hp: round(hp),
                btg: abs(_tg) <= 1 ? 1 : 0,
            },
            _texts: {
                ANG: `${fix(a)} rad`,
                PTX: `${_x}`,
                PTY: `${_y}`,
                TAN: `${_tg}`,
                HPR: `${fix((hp / r) * 100)}%`,
                ARC: `${round(r * a)}`,
                COS: `${fix(_cos)}`,
                SIN: `${fix(_sin)}`,
                DGR: `${round((a / PI) * 180)}°`,
                PRC: `${fix((a / (2 * PI)) * 100)}%`,
            },
        };
        const v_values = Object.values(result._values);
        const v_texts  = Object.values(result._texts);
        if (!(
            v_values.length === nsize
            && v_texts.length === lsize
            && isArrNum(Object.values(result._values))
            && isArrStr(Object.values(result._texts))
        )) {
            return null;
        }

        return result;
    }
};

export default values;
