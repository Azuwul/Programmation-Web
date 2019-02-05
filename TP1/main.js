var rects = [];

window.addEventListener("load", main);

function main (event) {

    console.log("main");
    var rect = randRect();
    factory("div", rect.x, rect.y, rect.w, rect.h);

    var combienDeRectangles = 10;

    for(var i = 0; i <= combienDeRectangles; i++) {

      var nouveauRectangle = randRect();
      while(hitTestAll(nouveauRectangle)) {
        nouveauRectangle = randRect();
      }

      rects.push(nouveauRectangle);
      factory("div", nouveauRectangle.x, nouveauRectangle.y, nouveauRectangle.w, nouveauRectangle.h);

    }

}


function factory (el, x, y, w, h) {

    var element = document.createElement(el);
    element.style.position = "absolute";
    element.style.width = w + "px";
    element.style.height = h + "px";
    element.style.left = x + "px";
    element.style.top = y + "px";
    element.style.backgroundColor = randomColor();
    document.body.appendChild(element);
}



function randomColor(){
    return "#" + Math.round(Math.random() * 0xFFFFFF).toString(16);
    }



function randRange(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;

}

function hitTestAll(rect) {

    for(var i = 0; i < rects.length; i++) {
      if(hitTest(rect, rects[i])) {
        return true;
      }

    }
    return false;
}

function hitTest(r1, r2) {
    return (((r1.x + r1.w >= r2.x) && (r1.x <= r2.x + r2.w)) && ((r1.y + r1.h >= r2.y) && (r1.y <= r2.y + r2.h)));

}



function randRect() {
    return {x: randRange(0, document.body.clientWidth), y: randRange(0, document.body.clientHeight), w: randRange(10, 200), h: randRange(10, 200)}
}

