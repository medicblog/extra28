// @ts-check
// 'use strict';
import shapes from './modules/shapes.js';

const {log,error,warn}=console;
(function main(R = 200, MW = 250) {
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
                // const C = ;

                const shp = shapes(
                    box.querySelector('canvas')?.getContext('2d'),
                    R, MW
                );

                const P = box.querySelector('#plan');
                if (!(
                    shp && typeof shp === 'object'
                    && P instanceof HTMLElement
                    && P.offsetWidth === 2 * R
                    && P.offsetHeight === P.offsetWidth

                )) {
                    throw new Error('elements:failed');
                }
                log('%celements:success','color:blue');

                const {style, clear, arcc, point, line} = shp;

                const [r9, r5, r2] = [.9 * R, .5 * R, .2 * R];

                P.addEventListener(
                    'click',
                    (e) => {
                        e.stopPropagation();

                        /*values-----------------*/

                        let [mx, my] = [
                            ( 1) * (e.offsetX - R),
                            (-1) * (e.offsetY - R)
                        ];

                        let hp = Math.hypot(mx, my);
                        if (hp >= r2 && hp <= R) {
                            let _cos = mx / hp;
                            let _sin = my / hp;
                            let a = _sin >= 0 ? 0 : 1;
                            a = (1 - 2 * a) * (Math.acos(_cos) - 2 * a * Math.PI);
                            let x = +(R * _cos).toFixed(2);
                            let y = +(R * _sin).toFixed(2);
                            // tg && ct 
                            let tg = x !== 0 ? +(y / x).toFixed(2) : 0;
                            let ct = y !== 0 ? +(x / y).toFixed(2) : 0;

                            const [tgr, ctr] = [R * tg, R * ct];

                            /*draw----------------*/

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
                                if (Math.abs(tg) <= 1) {
                                    line(R, tgr, R, 0);
                                    line(R, tgr);
                                    point(R, tgr);
                                } else {
                                    line(ctr, R, 0, R);
                                    line(ctr, R);
                                    point(ctr, R);
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
                            line(mx, my);
                            point(mx, my);

                            style();
                            point(0, R);
                            point(R);
                            point();
                        } else {
                            warn('outside');
                        }
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
