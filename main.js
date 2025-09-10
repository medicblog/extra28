// @ts-check
// 'use strict';
import shapes from './modules/shapes.js';
import {valuesClosure, rads} from './modules/values.js';

const {log,error,warn}=console;
(function main(R = 200, MW = 250, size = 10, vsize = 7) {
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
                const {style, clear, arcc, point, line} = shp;
                const [r, r9, r5, r2] = rads(R);                
                const values = valuesClosure(R);
                P.addEventListener(
                    'click',
                    (e) => {
                        e.stopPropagation();
                        const valuesArray = values(e.offsetX, e.offsetY);
                        if (!(
                            Array.isArray(valuesArray) && valuesArray.length === 2
                            && valuesArray.every((x) => Array.isArray(x))
                        )) {
                            warn('userEvent:failed');
                            return;
                        }
                        const [A, B] = valuesArray;
                        if (!(
                            A.length === vsize 
                            && A.every((x) => typeof x === 'number' && isFinite(x))
                            && B.length === size
                            && B.every((x) => typeof x === 'string' && x.length < 20)
                        ))
                        {
                            warn('userEvent:failed(2)');
                            return;
                        }
                        const [a, x, y, tg, ct, hp, bt] = A;
                        // draw
                        clear();
                        style();
                        if (a !== 0) {
                            style('rgba(255,255,255,.7)', r9);
                            arcc(r5, a);
                            style();
                            arcc(r2, a);
                            arcc(r, a);
                        }
                        line();
                        if (tg && ct) {
                            style('rgba(0,128,0,.8)');
                            if (bt === 1) {
                                line(r, tg, r, 0);
                                line(r, tg);
                                point(r, tg);
                            } else {
                                line(ct, r, 0, r);
                                line(ct, r);
                                point(ct, r);
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
                        arcc(hp);
                        style();
                        point(0, r);
                        point(r);
                        point();
                        // text
                        LIS.forEach((li, i) => {
                            li.textContent = B[i];
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
