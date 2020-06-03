//功能：匀速运动
//参数：
//dom对象、样式属性名、步长、时间间隔、起点、终点、方向
//返回值：无
function move(domObj, attr, step, timeSpace, startValue, endValue, direction) {
    let currValue = startValue;

    let myTimer = setInterval(function() {

        //数据处理
        //1.计算
        currValue += direction * step;

        //2.边界
        if (direction > 0 ? currValue >= endValue : currValue <= endValue) {
            currValue = endValue;
            clearInterval(myTimer);
        }

        //改变外观
        var temp = currValue;
        if (attr != "opacity") {
            temp += "px";
        }
        domObj.style[attr] = temp;

    }, timeSpace)
}

//功能：匀速运动
//参数：
// dom对象，样式属性名，终点，总时长
// 返回值：无
function move02(domObj, attr, endValue, timeLong) {
    //计算起始位置
    let startValue = parseFloat(getStyle(domObj, attr));
    //计算方向
    let direction = startValue < endValue ? 1 : -1;
    //计算时间间隔
    let timeSpace = 10; //现在的默认值
    let stepCount = timeLong / timeSpace;
    //计算步长
    let step = Math.abs(endValue - startValue) / stepCount;

    move(domObj, attr, step, timeSpace, startValue, endValue, direction);
}

//多属性运动的封装
//功能：匀速运动
//参数：
//dom对象,{样式属性名1：终点1,样式属性名1：终点2},总时长
//返回值：无
function move03(domObj, endObj, timeLong) {
    //计算起始位置
    let startObj = {}
    for (let key in endObj) {
        startObj[key] = parseFloat(getStyle(domObj, key));
    }

    //计算方向
    let directionObj = {};
    for (let key in endObj) {
        directionObj[key] = startObj[key] < endObj[key] ? 1 : -1;
    }

    //时间间隔
    let timeSpace = 10;
    let stepCount = timeLong / timeSpace;

    //步长
    let stepObj = {};
    for (let key in endObj) {
        stepObj[key] = Math.abs(endObj[key] - startObj[key]) / stepCount;

    }

    //运动
    let currObj = {};

    for (let key in endObj) {
        currObj[key] = startObj[key];
    }

    let myTimer = setInterval(function() {
        //数据处理
        //1.计算
        for (let key in endObj) {
            currObj[key] += directionObj[key] * stepObj[key];
        }
        //2.边界
        for (let key in endObj) {
            if (directionObj[key] > 0 ? currObj[key] >= endObj[key] : currObj[key] <= endObj[key]) {
                currObj[key] = endObj[key];
                clearInterval(myTimer);
            }
            //改变外观
            for (let key in endObj) {
                var temp = currObj[key];
                if (key != "opacity") {
                    temp += "px";
                }
                domObj.style[key] = temp;
            }

        }
    }, timeSpace)
}

//两张图片的淡入淡出
//参数
//淡出图片、淡入图片、时长
//返回值：无

function fadeInout(outImg, inImg, timeLong) {
    let currOpacity = 0;
    let timeSpace = 10;
    let step = 1 / (timeLong / timeSpace);

    let myTimer = setInterval(function() {
        currOpacity += step;
        if (currOpacity >= 1) {
            currOpacity = 1;
            window.clearInterval(myTimer);
        }
        inImg.style.opacity = currOpacity;
        outImg.style.opacity = 1 - currOpacity;
    }, timeSpace)
}

//两张图片的左出右进
//参数
//左出图片、右入图片、时长
//返回值：无
function leftRight(outImg, inImg, timeLong) {
    let currLeft = 0;
    let timeSpace = 10;
    let step = 1366 / (timeLong / timeSpace);

    let myTimer = setInterval(function() {
        currLeft = currLeft - step;
        if (currLeft < -1366) {
            currLeft = -1366
            window.clearInterval(myTimer);
        }
        inImg.style.left = 1366 + currLeft + "px";
        outImg.style.left = currLeft + "px";
    }, timeSpace)
}


function rightLeft(outImg, inImg, timeLong) {
    let currLeft = -1366;
    let timeSpace = 10;
    let step = 1366 / (timeLong / timeSpace);

    let myTimer = setInterval(function() {
        currLeft = currLeft + step;
        if (currLeft >= 0) {
            currLeft = 0;
            window.clearInterval(myTimer);
        }
        inImg.style.left = currLeft + "px";
        outImg.style.left = 1366 + currLeft + "px";
    }, timeSpace)
}