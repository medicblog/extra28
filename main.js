// @ts-check
'use strict';
const {log,error,warn}=console;
(function main(R = 200, MW = 250) {
    log(`%cradius : ${R} - mwidth : ${MW}`,'color:grey');
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
        },
        {
            once: true
        }
    );
})();

log('%c[main:end]','font-weight:bold;color:grey');
