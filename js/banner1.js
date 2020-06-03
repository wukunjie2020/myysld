//类：轮播图
//左进右出

class Banner {
    constructor(obj) {
        //属性
        //设定一个默认值
        let defaultObj = {
            boxDom: null, //轮播图的容器
            imgBox: null, //图片的容器
            doudouBox: null, //豆豆的容器
            width: 1366,
            height: 688,
            left: 1366,
            imgs: [],
            hrefs: [],
            transEffect: "move", //过渡效果

            myTimer: null,
            index: 0,
            timeSpace: 2000,

            //豆豆相关属性：
            btnPosition: "bottom",
            btnSize: 20,
            btnSpace: 20,
            btnColor: "pink",
            btnHighColor: "red",
            isCircle: true
        }

        for (let key in defaultObj) {
            if (obj[key] != undefined) {
                this[key] = obj[key];
            } else {
                this[key] = defaultObj[key];
            }
        }
        this.render();
        this.addEvent();
        this.autoPlay();
    }

    //方法
    //创建所有dom元素
    render() {
        //1.创建图片部分
        //（1）容器
        this.imgBox = document.createElement("div");
        this.imgBox.style.cssText = `
            position:absolute;
            width:100%;
            height:100%;
            overflow:hidden;
        `;
        this.boxDom.appendChild(this.imgBox);

        //(2)图片
        for (let i in this.imgs) {
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = `
                position:absolute;
                width:100%;
                height:100%;
                left:100%;
            `;
            if (i == 0) {
                imgDom.style.left = 0;
            }
            this.imgBox.appendChild(imgDom);
        }

        //2.创建豆豆部分
        //（1）豆豆容器
        this.doudouBox = document.createElement("ul");
        this.doudouBox.style.cssText = `
            list-style: none;
            position: absolute;
            left:50%;
            transform: translateX(-50%);
            bottom: 20px;
        `;
        this.boxDom.appendChild(this.doudouBox);
        //(2)豆豆
        for (let i in this.imgs) {
            let liDom = document.createElement("li");
            liDom.style.cssText = `
                float: left;
                width: ${this.btnSize}px;
                height: ${this.btnSize}px;
                margin-left:${this.btnSpace}px;
                background-color: ${this.btnColor};
            `;
            if (this.isCircle) {
                liDom.style.borderRadius = "50%";
            }
            if (i == 0) {
                liDom.style.backgroundColor = this.btnHighColor;
            }
            this.doudouBox.appendChild(liDom);
        }
    }

    //添加事件
    addEvent() {
        this.boxDom.onmouseenter = () => {
            this.stopPlay();
        };
        this.boxDom.onmouseleave = () => {
            this.autoPlay();
        }
        let liDoms = this.doudouBox.children;
        for (let i = 0; i < liDoms.length; i++) {
            liDoms[i].onclick = () => {
                this.goImg(i);
            }
        }
        this.imgBox.onclick = () => {
            window.open(this.hrefs[this.index])
        }
    }

    //1.每隔一定时间换一张图片
    autoPlay() {
        this.myTimer = setInterval(() => {
            let outIndex = this.index; //2
            this.index = this.index + 1; //3

            this.showImg(outIndex);
        }, this.timeSpace)
    }

    //2.停止变换
    stopPlay() {
        window.clearInterval(this.myTimer);
    }

    //3.跳转到指定的图片
    goImg(transIndex) {
        if (this.index == transIndex) {
            return;
        }
        window.clearInterval(this.myTimer);
        //一、数据处理
        //1、计算
        let outIndex = this.index; //2
        this.index = transIndex;

        this.showImg2(outIndex);
    }

    showImg(outIndex) {
        //2、边界
        if (this.index > this.imgs.length - 1) {
            this.index = 0;
        }

        //改变外观
        let imgDoms = this.imgBox.children;
        leftRight(imgDoms[outIndex], imgDoms[this.index], this.timeSpace / 4);
        let liDoms = this.doudouBox.children;
        liDoms[outIndex].style.backgroundColor = this.btnColor;
        liDoms[this.index].style.backgroundColor = this.btnHighColor;
    }

    showImg2(outIndex) {
        if (this.index > this.imgs.length - 1) {
            this.index = 0;
        }
        let imgDoms = this.imgBox.children;
        if (outIndex > this.index) {
            rightLeft(imgDoms[outIndex], imgDoms[this.index], this.timeSpace / 4)
        } else if (outIndex < this.index) {
            leftRight(imgDoms[outIndex], imgDoms[this.index], this.timeSpace / 4);
        }
        let liDoms = this.doudouBox.children;
        liDoms[outIndex].style.backgroundColor = this.btnColor;
        liDoms[this.index].style.backgroundColor = this.btnHighColor;
    }
}