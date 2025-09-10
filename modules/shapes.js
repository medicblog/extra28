// @ts-check
const pc = 2 * Math.PI;
function shapes(c, rd, mw) {
    console.log('%cshapes:called','color:slategrey');
    if (!(
        c instanceof CanvasRenderingContext2D
        && c.canvas.offsetWidth === 2 * mw
        && c.canvas.offsetHeight === c.canvas.offsetWidth
    )) {
        throw new Error('shapes:failed');
    }
    console.log('%c--shapes:success','color:blue');

    c.setTransform(1, 0, 0, -1, mw, mw);
    c.fillStyle = 'rgb(255,255,255)';
    c.strokeStyle = 'rgba(0,0,0,.8)';
    c.lineWidth = 2;

    return {
        style(s = 'rgba(0,0,0,.8)', l = 2) {
            c.strokeStyle = s;
            c.lineWidth = l;
        },
        clear() {
            c.clearRect(-mw, -mw, 2 * mw, 2 * mw);
        },
        arcc(r = rd, end = pc) {
            c.beginPath();
            c.arc(0, 0, r, 0, end, false);
            c.stroke();
        },
        point(x = 0, y = 0, r = 5) {
            c.beginPath();
            c.arc(x, y, r, 0, pc);
            c.fill();
            c.stroke();
        },
        line(x = rd, y = 0, xo = 0, yo = 0) {
            c.beginPath();
            c.moveTo(xo, yo);
            c.lineTo(x, y);
            c.stroke();
        },
    };
}

export default shapes;