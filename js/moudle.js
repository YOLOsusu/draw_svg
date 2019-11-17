function createMoudle(obj) {
    // 外框参数
    let h = 60,
        w = 90,
        rx = obj.rx,
        ry = obj.ry;
    //两圆参数
    let cr = 5,
        cr2 = 10,
        cx1 = cx2 = rx + w / 2,
        cy1 = ry - cr,
        cy2 = ry + h + cr;
    //二方框参数
    let rx1 = rx,
        ry1 = ry,
        w1 = w,
        h1 = h / 2;
    let id = new Date().getTime();
    let hb = document.getElementById('hb');

    createG(`${id}-g1`, hb)
    let g1 = document.getElementById(`${id}-g1`);
    createRect(rx, ry, w, h, '#fff', g1, `${id}-A`, `${id}-rect`)
    createCircle(cx1, cy1, cr, g1, `${id}-circle`)
    createCircle(cx2, cy2, cr, g1, `${id}-circle`)
    createText(rx + 50, ry + 20, obj.text, g1, `${id}-text`)
    createG(`${id}-g2`, g1)
    let g2 = document.getElementById(`${id}-g2`);
    createRect(rx1, ry1, w1, h1, 'black', g2, `${id}-B`, `${id}-rect`)
    createText(rx + 20, ry + 10, 'text', g2, `${id}-text`)
    createText(rx + 50, ry + 10, '删除', g2, `${id}-text`)
    g2.style.display = 'none';

    let A = document.getElementById(`${id}-A`);
    let rect2 = document.getElementById(`${id}-B`);
    let circles = document.getElementsByClassName(`${id}-circle`);
    g2.onmouseover = function (e) {
        g2.style.display = 'block';
    }
    g2.onmouseout = function (e) {
        g2.style.display = 'none';
    }
    A.onmouseover = function (e) {
        g2.style.display = 'block';
    }
    A.onmouseout = function (e) {
        g2.style.display = 'none';
    }
    let texts = document.getElementsByClassName(`${id}-text`)
    for (let i = 0; i < texts.length; i++) {
        texts[i].onclick = function (e) {
            if (e.target.innerHTML == '删除') {
                let g = document.getElementById(`${id}-g1`);
                hb.removeChild(g)
            }
        }
    }
    // for (let i = 0; i < circles.length; i++) {

    //     circles[i].onmouseover = function (e) {
    //         for (let i = 0; i < circles.length; i++) {
    //             circles[i].setAttribute('r', cr2);
    //             if (i == 0) {
    //                 circles[i].setAttribute('cy', circles[i].cy.animVal.value - 5);
    //             } else {
    //                 circles[i].setAttribute('cy', circles[i].cy.animVal.value + 5);
    //             }
    //         }
    //     }
    //     circles[i].onmouseover = function (e) {
    //         for (let i = 0; i < circles.length; i++) {
    //             circles[i].setAttribute('r', cr);
    //             if (i == 0) {
    //                 circles[i].setAttribute('cy', circles[i].cy.animVal.value + 5);
    //             } else {
    //                 circles[i].setAttribute('cy', circles[i].cy.animVal.value - 5);
    //             }
    //         }
    //     }
    // }

    // A.onmousedown = drag();
    A.addEventListener('mousedown', function (e) { drag(e) });
    rect2.addEventListener('mousedown', function (e) { drag(e) });
    function drag(m1) {

        //event的兼容性
        let m = m1 || event;

        //获取鼠标按下的坐标
        let startX = m.clientX,
            startY = m.clientY;

        // 获取元素的left，top值
        var A_x = A.x.animVal.value,
            A_y = A.y.animVal.value;
        // 去掉提前保存原位置
        // let startTexts = {};
        // for (let key = 0; key < texts.length; key++) {
        //     startTexts[key] = {}
        //     startTexts[key].x = texts[key].x.animVal[0].value
        //     startTexts[key].y = texts[key].y.animVal[0].value
        // }
        // // let rect2 = document.getElementById(`${id}-B`)
        // let rx2 = rect2.x.animVal.value;
        // let ry2 = rect2.y.animVal.value;

        // let circles = document.getElementsByClassName(`${id}-circle`);
        // let startCircles = {}
        // for (let key = 0; key < circles.length; key++) {
        //     startCircles[key] = {}
        //     startCircles[key].x = circles[key].cx.animVal.value
        //     startCircles[key].y = circles[key].cy.animVal.value
        // }

        document.onmousemove = function (ev1) {
            let ev2 = ev1 || event;

            //获取鼠标移动时的坐标
            let endX = ev2.clientX;
            let endY = ev2.clientY;

            //计算出鼠标的移动距离
            let x = endX - startX;
            let y = endY - startY;

            //移动的数值与元素的left，top相加，得出元素的移动的距离
            var lt = A_x + x;
            var ls = A_y + y;
            let d = 2;
            lt = lt < d ? d : lt;
            lt = lt > 1094 - w - d ? 1094 - w - d : lt;
            ls = ls < cr * 2 + d ? cr * 2 + d : ls;
            ls = ls > 574 - cr - d ? 574 - cr - d : ls
            // //更改元素的left，top值
            A.setAttribute('x', lt)
            A.setAttribute('y', ls)

            for (let key = 0; key < texts.length; key++) {
                switch (key) {
                    case 0:
                        texts[key].setAttribute('x', lt + 50)
                        texts[key].setAttribute('y', ls + 20)
                        break;
                    case 1:
                        texts[key].setAttribute('x', lt + 15)
                        texts[key].setAttribute('y', ls + 10)
                        break;
                    case 2:
                        texts[key].setAttribute('x', lt + 50)
                        texts[key].setAttribute('y', ls + 10)
                        break;
                }

            }

            rect2.setAttribute('x', lt);
            rect2.setAttribute('y', ls);


            for (let key = 0; key < circles.length; key++) {
                circles[key].setAttribute('cx', lt + w / 2);
                if (key == 0) {
                    circles[key].setAttribute('cy', ls - 5);
                } else {
                    circles[key].setAttribute('cy', ls + h + 5);
                }

            }
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }


    }

}

function createRect(x, y, w, h, fill, obj, id, className) {
    var rectObj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    if (rectObj) {
        rectObj.setAttribute("x", x);
        rectObj.setAttribute("y", y);
        rectObj.setAttribute("width", w);
        rectObj.setAttribute("height", h);
        rectObj.setAttribute("id", id);
        rectObj.setAttribute("class", className);
        rectObj.setAttribute("style", `fill:${fill};stroke-width:1;stroke:rgb(0,0,0);`);
        obj.appendChild(rectObj);
    }
}

function createCircle(cx, cy, r, obj, className) {
    var circleObj = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    if (circleObj) {
        circleObj.setAttribute("cx", cx);
        circleObj.setAttribute("cy", cy);
        circleObj.setAttribute("r", r);
        circleObj.setAttribute("class", className);
        circleObj.setAttribute("style", "fill:#fff;stroke-width:1;stroke:rgb(0,0,0)");
        obj.appendChild(circleObj);
    }
}

function createText(x, y, text, obj, className) {
    var textObj = document.createElementNS("http://www.w3.org/2000/svg", "text");
    if (textObj) {
        textObj.setAttribute("x", x);
        textObj.setAttribute("y", y);
        textObj.textContent = text;
        textObj.setAttribute("class", className);
        textObj.setAttribute("style", `alignment-baseline:middle; text-anchor:middle; fill:red`);
        obj.appendChild(textObj);
    }
}

function createG(id, obj) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (g) {
        g.setAttribute("id", id);
        obj.appendChild(g);
    }
}

