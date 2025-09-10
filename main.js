// @ts-check
// 'use strict';
import test from './modules/shapes.js';

const {log,error,warn}=console;
(function main(R = 200, MW = 250) {
    log(`%cradius : ${R} - mwidth : ${MW}`,'color:grey');
    test('shapes : [10-09-2025 18:20:00]');
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
                const C = box?.querySelector('canvas')?.getContext('2d');
                const P = box?.querySelector('#plan');
                if (!(
                    C instanceof CanvasRenderingContext2D
                    && P instanceof HTMLElement
                    && C.canvas.offsetWidth === 2 * MW
                    && C.canvas.offsetHeight === C.canvas.offsetWidth
                    && P.offsetWidth === 2 * R
                    && P.offsetHeight === P.offsetWidth

                )) {
                    throw new Error('elements:failed');
                }
                log('%celements:success','color:blue');
                C.setTransform(1, 0, 0, -1, MW, MW);
                C.fillStyle = 'white';
                C.strokeStyle = 'rgba(0,0,0,.8)';
                C.lineWidth = 2;
                P.addEventListener(
                    'click',
                    (e) => {
                        e.stopPropagation();

                        let [mx, my] = [
                            ( 1) * (e.offsetX - R),
                            (-1) * (e.offsetY - R)
                        ];

                        let hp = Math.hypot(mx, my);
                        if (hp >= .2 * R && hp <= R) {
                            C.clearRect(-MW, -MW, 2 * MW, 2 * MW);
                            C.beginPath();
                            C.arc(mx, my, 5, 0, 2 * Math.PI);
                            C.fill();
                            C.stroke();
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
