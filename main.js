import values from './modules/values.js';
import shapes from './modules/shapes.js';
import list from './modules/list.js';
import plan from './modules/plan.js';
const {log,error,warn}=console;
(function main() {
    if (
        !window || typeof window !== 'object'
        || !('document' in window) || window.top !== window.self
    ){
        warn('window:failed');
        return;
    }
    window.addEventListener(
        'load',
        () => {
            try {
                const [r, r9, r5, r2] = values.radii();
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
                const pln = plan(
                    app.querySelector('#plan') ?? {}
                );
                if (!(shp && lst && pln)){
                    throw new Error('elements:failed');
                }
                const {style, clear, arcc, point, line} = shp;
                pln.addEventListener(
                    'click',
                    (e) => {
                        e.stopPropagation();
                        const valuesArray = values.getResult(e.offsetX, e.offsetY);
                        if (!valuesArray) {
                            warn('userEvent:failed');
                            return;
                        }
                        const {_texts} = valuesArray;
                        const {a, x, y, tg, ct, hp, btg} = valuesArray._values;
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
                            if (btg === 1) {
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
                        lst.forEach((li) => {
                            let text = 'N/A';
                            if (
                                li instanceof HTMLElement
                                && li.dataset.id
                                && Object.hasOwn(_texts, li.dataset.id) 
                            ) {
                                text = _texts[li.dataset.id];     
                            }
                            li.textContent = text;
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
