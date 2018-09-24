<template>
  <div id="app">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            dots: [],
            extendDis: 5, // 可超出屏幕边界距离
            lineDis: 100, // 连线的距离
            dotsCount: 150, // 生成粒子的数量
            // 鼠标位置
            warea: {
                x: null,
                y: null
            },
            canvas: '',
            ctx: '',
            rgb: '0'
        }
    },
    mounted () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.canvas.height = window.innerHeight || doucment.documentElement.clientHeight || document.body.clientHeight;
        window.onmousemove = function (e) {
            e = e || window.event;
            // Object.assign(this.warea, {x: , y: e.clientY - this.canvas.offsetTop})
            this.warea = {x: e.clientX - this.canvas.offsetLeft, y: e.clientY - this.canvas.offsetTop};

        };
        window.onmouseleave = function () {
            this.warea = {
                x: null,
                y: null
            }
        };
        this.init();
        setTimeout(() => {
            this.animate()
        }, 100);
    },
    methods: {
        // 生成粒子，x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
        init () {
             for (let i = 0; i < this.dotsCount; i++) {
                let x = Math.random() * (canvas.width + 2 * this.extendDis) - this.extendDis;
                let y = Math.random() * (canvas.height + 2 * this.extendDis) - this.extendDis;
                let xa = (Math.random() * 2 - 1) / 1.5;
                let ya = (Math.random() * 2 - 1) / 1.5;
                this.dots.push({
                    x: x,
                    y: y,
                    xa: xa,
                    ya: ya
                });
            }
        },
        //
        RAF () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60)
            }
        },
        // 连线
        drawLine (ndots) {
            this.dots.forEach((dot) => {
                this.move(dot);
                for (let i = 0; i < ndots.length; i++) {
                    if (dot == ndots[i] || ndots[i].x == null || ndots[i].y == null) continue;
                    let xc = dot.x - ndots[i].x;
                    let yc = dot.y - ndots[i].y;
                    if (xc > this.lineDis || yc > this.lineDis || (xc * xc + yc * yc) > this.lineDis * this.lineDis) continue;
                   
                    if (ndots[i] == this.warea && (xc * xc + yc * yc) < 20000) {
                        dot.x -= xc * 0.01;
                        dot.y -= yc * 0.01;
                    }
                    this.ctx.beginPath();
                    this.ctx.lineWidth = (this.lineDis * this.lineDis - (xc * xc + yc * yc)) / (this.lineDis * this.lineDis * 2);
                    this.ctx.strokeStyle = 'rgba(' + this.rgb + ', ' + this.rgb + ', ' + this.rgb + ', 1)';
                    this.ctx.moveTo(dot.x, dot.y);
                    this.ctx.lineTo(ndots[i].x, ndots[i].y);
                    this.ctx.stroke();
                };
                ndots.splice(ndots.indexOf(dot), 1)
            })
        },
        // 粒子运动
        move (dot) {
            dot.x += dot.xa;
            dot.y += dot.ya;
            dot.xa *= (dot.x > this.canvas.width + this.extendDis || dot.x < - this.extendDis) ? -1 : 1;
            dot.ya *= (dot.y > this.canvas.height + this.extendDis || dot.y < - this.extendDis) ? -1 : 1;
            this.ctx.fillStyle = 'rgba(' + this.rgb + ', ' + this.rgb + ', ' + this.rgb + ', 1';
            this.ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
        },

        animate () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawLine([this.warea].concat(this.dots));
            this.RAF()(this.animate);
        }
    }
};
</script>
<style lang="less">
    body {
        color: #000;
        background: url(./static/images/bg.gif) left top;
        font-family: Verdana,Arial,Helvetica,sans-serif;
        font-size: 9pt;
        min-height: 101%;
        line-height: 1.5;
    }
    ul, li {
        list-style-type: none;
    }
    li {
        padding: 10px 20px;
    }
    p {
        margin: 0;
        padding: 0;
    }
    #canvas {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: -99;
    }
</style>

