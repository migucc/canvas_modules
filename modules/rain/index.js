var ww = window.innerWidth;
var wh = window.innerHeight;

var fps = 60;
var pointNum = 500;
var cs = [];
var c, ct;

init();

// 初始化canvas对象
function init() {
    c = document.getElementById('canvast');
    if(c && c.getContext) {
        ct = c.getContext('2d');
        c.width = ww;
        c.height = wh;

        initState();

        setInterval(loop, 1000/fps);
    }
}

// 设置初始化状态
function initState() {
    for(var i=0; i<pointNum; i++) {
        cs[i] = {
            x: Math.floor(ww * Math.random()),
            y: Math.floor(wh * Math.random()),
            speed: randomNum(3, 5),
            height: wh - randomNum(30, 60),
            // color: 'rgba(0, 255, 255, 1)',
            color: 'rgba(39, 222, 229, 1)',
            r: 0
        }
    }
}

// 更新状态
function updateState(i) {
    if(i === undefined) {
        return ;
    }
    var cy = cs[i].y + cs[i].speed;
    var cx = cs[i].x - cs[i].speed/20;

    if(cy > cs[i].height) {
        cs[i].r ++;
        ct.beginPath();
        ct.lineWidth = 1;
        ct.strokeStyle = 'rgba(39, 222, 229, 0.8)';
        // ct.arc(cs[i].x, cs[i].y, cs[i].r/2, 0, Math.PI*2, true);
        ct.moveTo(cs[i].x, cs[i].y - cs[i].r / 6);
        ct.bezierCurveTo(
            cs[i].x + cs[i].r / 2, cs[i].y - cs[i].r / 6,
            cs[i].x + cs[i].r / 2, cs[i].y + cs[i].r / 6,
            cs[i].x, cs[i].y + cs[i].r / 6);

        ct.bezierCurveTo(
            cs[i].x - cs[i].r / 2, cs[i].y + cs[i].r / 6,
            cs[i].x - cs[i].r / 2, cs[i].y - cs[i].r / 6,
            cs[i].x, cs[i].y - cs[i].r / 6);

        ct.stroke();

        if(cs[i].r > 50) {
            cs[i].x = Math.floor(ww * Math.random());
            cs[i].y = 0;
            cs[i].r = 0;
            cs[i].speed = randomNum(2.5, 4);
        }
    } else {
        cs[i].y = cy;
        cs[i].x = cx;
    }
}

// 绘制canvas
function loop() {

    ct.fillStyle = 'rgba(0, 0, 0, .3)';
    ct.fillRect(0, 0, c.width, c.height);

    for(var n=0; n<pointNum; n++) {
        updateState(n);

        // r属性记录了雨点落地时的半径（r==0表示还未落地）
        if(cs[n].r == 0) {
            ct.beginPath();
            ct.fillStyle = cs[n].color;
            ct.arc(cs[n].x, cs[n].y, 1.5, 0, Math.PI*2, true);
            ct.fill();
        }
    }
}

// 获取一个随机数
function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}
