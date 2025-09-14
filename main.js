// @ts-check
// 'use strict';
import shapes from './modules/shapes.js';
import list from './modules/list.js';
import {valuesClosure, rads} from './modules/values.js';

const {log,error,warn}=console;
(function main() {
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
                const [r, r9, r5, r2] = rads();
                const app = document.getElementById('app');
                if (!(
                    app instanceof HTMLElement
                )) {
                    throw new Error('root:failed');
                }

                const shp = shapes(
                    app.querySelector('canvas')?.getContext('2d')
                );

                const lst = list(
                    app.querySelector('#list')?.querySelectorAll('li')
                );

                const P = app.querySelector('#plan');

                if (!(
                    shp && typeof shp === 'object'
                    && lst
                    && P instanceof HTMLElement
                    && P.offsetWidth === 2 * r
                    && P.offsetHeight === P.offsetWidth
                ))
                {
                    throw new Error('elements:failed');
                }                                
                const values = valuesClosure();
                const {style, clear, arcc, point, line} = shp;
                /*-----------------------------------------------------------*/
                /*-----------------------------------------------------------*/
                P.addEventListener(
                    'click',
                    (e) => {
                        e.stopPropagation();
                        console.clear();
                        const valuesArray = values(e.offsetX, e.offsetY);
                        log(valuesArray);
                        if (!valuesArray) {
                            warn('userEvent:failed');
                            return;
                        }
                        // values
                        const [A, B] = valuesArray;
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
                        lst.forEach((li, i) => {
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
