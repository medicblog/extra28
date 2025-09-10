// @ts-check
// 'use strict';
import shapes from './modules/shapes.js';

const {log,error,warn}=console;
(function main(R = 200, MW = 250, size = 10) {
    log(`%cradius : ${R} - mwidth : ${MW}`,'color:grey');
    // test('shapes : [10-09-2025 18:20:00]');
    if (
        !window || typeof window !== 'object'
        || !('document' in window) || window.top !== window.self
    )
    {
        warn('window:failed');
        return;
    }
    window.addEventListener(
        'load',
        (ew) => {
            log(`%cwindow:${ew.type}`,'color:purple;font-weight:bold');
            try {
                const box = document.getElementById('box');


                if (!(
                    box instanceof HTMLElement
                )) {
                    throw new Error('root:failed');
                }



                const shp = shapes(
                    box.querySelector('canvas')?.getContext('2d'),
                    R, MW
                );

                const P = box.querySelector('#plan');

                const LIS = document.getElementById('list')?.querySelectorAll('li');

                if (!(
                    shp && typeof shp === 'object'
                    && P instanceof HTMLElement
                    && P.offsetWidth === 2 * R
                    && P.offsetHeight === P.offsetWidth
                    && LIS instanceof NodeList
                    && LIS.length === size
                ))
                {
                    throw new Error('elements:failed');
                }
                log('%celements:success','color:blue');

                log('list elements :');
                log(LIS);

                const {style, clear, arcc, point, line} = shp;

                const [r9, r5, r2] = [.9 * R, .5 * R, .2 * R];

                /*---------------------*/
                // values (10)
                /*
                ang  px  py   tan  hpr
                arc  cos sin  dgr  prc
                */
  
                const {PI,acos,hypot,round,abs} = Math;

                function valuesClosure(rd) {
                    // rd = R
                    const fix = (n = 0, p = 2) => +(n.toFixed(p));
                    // const A = Array(size).fill(0);
                    // two arrays :
                    // - draw :
                    const A = Array(6).fill(0);
                    // - text :
                    const B = Array(10).fill('0');

                    return (ox, oy) => {
                        let [x, y] = [
                            ( 1) * (ox - rd),
                            (-1) * (oy - rd),
                        ];

                        let hp = hypot(x, y);                        
                        
                        if (hp >= .05 * rd && hp <= rd) {
                            let _cos = x / hp;
                            let _sin = y / hp;
                            let a = _sin >= 0 ? 0 : 1;
                            a = (1 - 2*a) * (acos(_cos) - a * (2*PI));
                            let _x = fix(rd * _cos);
                            let _y = fix(rd * _sin);
                            let _tg = _x !== 0 ? fix(_y/_x) : 0;
                            let _ct = _y !== 0 ? fix(_x/_y) : 0;


                            // ang & px & py
                            A[0] = fix(a);
                            A[1] = _x;
                            A[2] = _y;
                            // tgr & ctr
                            A[3] = _tg * R;
                            A[4] = _ct * R;
                            A[5] = round(hp);

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

                            return [A, B];
                        } else {
                            return null;
                        }
                    };
                }







                /*---------------------*/

                // const values = valuesClosure()

                const values = valuesClosure(R);
                log(values);





                

                P.addEventListener(
                    'click',
                    (e) => {
                        e.stopPropagation();

                        const valuesArray = values(e.offsetX, e.offsetY);

                        if (!(Array.isArray(valuesArray) && valuesArray.length === 2)) {
                            warn('userEvent:failed');
                            return;
                        }

                        const [a, x, y, tg, ct, hp] = valuesArray[0];
                        const txtArr = valuesArray[1];

                        // draw

                        clear();
                        style();
                        if (a !== 0) {
                            style('rgba(255,255,255,.7)', r9);
                            arcc(r5, a);
                            style();
                            arcc(r2, a);
                            arcc(R, a);
                        }
                        line();
                        if (tg && ct) {
                            style('rgba(0,128,0,.8)');
                            if (abs(tg) <= R) {
                                line(R, tg, R, 0);
                                line(R, tg);
                                point(R, tg);
                            } else {
                                line(ct, R, 0, R);
                                line(ct, R);
                                point(ct, R);
                            }
                        }
                        style('rgba(0,0,255,.8)');
                        line(x, y, 0, y);
                        line(x, 0);
                        style('rgba(255,0,0,.8)');
                        line(x, y, x , 0);
                        line(0, y);
                        style('rgba(0,0,255,.8)');
                        point(x, 0);
                        style('rgba(255,0,0,.8)');
                        point(0, y);
                        style();
                        line(x, y);
                        point(x, y, 7);
                        point(x, y, 3);
                        style('rgba(140,0,140,.5)');
                        arcc(Math.floor(hp));
                        style();
                        point(0, R);
                        point(R);
                        point();

                        // text

                        LIS.forEach((li, i) => {
                            li.textContent = txtArr[i];
                        });

                    },
                    false
                );
            } catch(err) {
                error(err);
            }
        },
        {
            once: true
        }
    );
})();

log('%c[main:end]','font-weight:bold;color:grey');
