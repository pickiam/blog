<template>
    <div class="container">
        <div class="leftSiderBar">
            <transition enter-active-class="animated bounceInLeft">
                <div class="site" v-show="toggle">他山之石，可以攻玉</div>
            </transition>
            <div class="canvas">
                <canvas id="Canvas"></canvas>
            </div>
            <ul class="target">
                <li v-for="(item, index) in headerList" :key="index" @click="goTarget(item[1])">{{item[0]}}</li>
            </ul>
        </div>
        <div class="conContainer">
            <div class="conNormal">
                <transition>
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import { accessControl } from '../api/index.js'
    export default {
        name: 'Main',
        data () {
            return {
                toggle: false,
                canvas: '',
                ctx: '',
                points: [],
                startX: 0,
                waveWidth: 0.055, // 波浪宽度，数越小越宽
                waveHeight: 4, // 波浪高度， 数越大越高
                xOffset: 0, // 水平位移
                width: 200,
                height: 200,
                speed: 0.04,
                nowRange: 0,
                rangeValue: 0.6,
                colors: ['#DBB77A', '#BF8F3B'],
                waveWidth2: 0.03, 
                waveHeight2: 3, 
                colors2: ['rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)'],
                xOffset2: 2, 
                speed2: 0.02, 
                headerList: [['主页', 'blogList'], ['添加新随笔', 'edit'], ['文章管理', 'artMan'], ['标签', 'tag'], ['关于', 'about']],

            }
        },
        mounted () {
            // if (localStorage.getItem('token') && this.$store.state.perInfo === '') {
            //     this.$store.commit('setPerInfo',localStorage.getItem('token'))
            // }
            this.toggle = true;
            this.canvas = document.getElementById('Canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.drawCircle();
            this.animate();
        },
        methods: {
           async goTarget (params) {
                if (params === 'blogList' || params === 'about') {
                    this.$router.push({name: params})
                }else if (localStorage.getItem('token') === null && (params === 'edit' || params === 'tag' || params === 'artMan')) {
                    // let response = await accessControl(localStorage.getItem('token'));
                    this.$router.push({name: 'login'})
                } else {
                    try {
                        let response = await accessControl(localStorage.getItem('token'));
                        if (response.data.success) {
                            this.$router.push({name: params});
                        } else {
                            this.$router.push({name: 'login'}); 
                        }
                    } catch (error) {
                        console.log(error)
                        this.$router.push({name: 'login'}); 
                    }
                    // console.log(response)
        
                }
            },
            drawSin () {
                this.ctx.beginPath();
                for (let x = this.startX; x < this.startX + this.width; x += 100 / this.width ) {
                    const y = this.waveHeight * Math.sin((this.startX + x) * this.waveWidth + this.xOffset);
                    const y2 = this.waveHeight2 * Math.sin((this.startX + x) * this.waveWidth2 + this.xOffset2);
                    this.points.push([x, (1 - this.nowRange) * this.height + y]);
                    this.ctx.lineTo(x, (1 - this.nowRange) * this.height + y2);
                    this.ctx.lineTo(x, (1 - this.nowRange) * this.height + y);
                }
                this.ctx.lineTo(this.width, this.height);
                this.ctx.lineTo(this.startX, this.height);
                this.ctx.lineTo(this.points[0][0], this.points[0][1]);
                this.ctx.fillStyle = this.getChartColor();
                this.ctx.fill();
                this.ctx.restore();
                // this.ctx.stroke();
            },
            RAF () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                    window.setTimeout(callback, 1000 / 60)
                }
            },
            getChartColor() {
                const radius = this.width / 2;
                const grd = this.ctx.createLinearGradient(radius, radius, radius, this.height);
                grd.addColorStop(0, this.colors2[0]);
                grd.addColorStop(1, this.colors2[1]);
                return grd;
            },
            animate () {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.xOffset += this.speed;
                this.xOffset2 += this.speed2;
                if (this.nowRange < this.rangeValue) {
                    this.nowRange += 0.01;
                }
                this.drawSin();
                this.RAF()(this.animate);
            },
            drawCircle() {
                const r = this.width / 2;
                const lineWidth = 5;
                const cR = r - (lineWidth);
                this.ctx.lineWidth = lineWidth;
                this.ctx.beginPath();
                this.ctx.strokeStyle = '#DBB77A';
                this.ctx.arc(r, r, cR, 0, 2 * Math.PI);
                this.ctx.stroke();
                this.ctx.clip();
                // this.isDrawCircle = true;
            }
        }

    }
</script>
<style lang="less" scoped>
    .container {
        width: 97%;
        min-width: 950px;
        text-align: left;
        margin: auto;
        .conContainer {
            float: right;
            width: 100%;
            margin: 0 0 0 -250px;
            background: transparent;
            border: solid 0px green;
            text-align: left;
            overflow-x: hidden;
        .conNormal {
            margin: 0 0 0 250px;
            padding-top: 35px;
            padding-bottom: 15px;
        }
        }
        .leftSiderBar {
            width: 230px;
            padding: 0px 0 0px 5px;
            float: left;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            position: relative;
            .canvas {
                width: 100%;
                height: 200px;
                text-align: center;
                margin-top: 150px;
                #Canvas {
                    width: 200px;
                    height: 200px;

                }
            }
            .site {
                position: absolute;
                color: #f35626;
                line-height: 30px;
                text-align: center;
                width: 100%;
                font-size: 20px;
                top: 70px;
                background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .target {
                list-style: none;
                margin-top: 20px;
                padding: 0;
                text-align: center;
                font-size: 14px;
                position: relative;
                z-index: 99999;
                li {
                    letter-spacing: 0.45px;
                    line-height: 20px;
                    &:hover {            
                        cursor: pointer;
                        color: #EB613b;
                    }
                }
            }
        }
    }
</style>

