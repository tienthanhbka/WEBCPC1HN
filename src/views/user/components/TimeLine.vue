<template>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
</head>
<body>
 <div class="demo">
        <div class="container">
            <div class="row text-center">
                <h1 class="heading-title">Lộ trình công danh của {{listPosition[0].EmployeeName}} </h1>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="main-timeline">
                        <div v-for="item in listPosition" :key="item" class="timeline">
                            <div class="timeline-content">
                                <span class="date">
                                    <span class="day">{{ Date.parse(item.DateStart).toString('dd/MM') }}</span>
                                    <span class="month">{{ Date.parse(item.DateStart).toString('yyyy') }}</span>
                                    <!-- <span class="year">{{ Date.parse(item.DateStart).toString('MM') }}</span> -->
                                </span>
                                <h2 class="title">{{item.Title}}</h2>
                                <p class="description">{{ item.Description }}</p>
                            </div>
                        </div>

                        <!-- <div class="timeline">
                            <div class="timeline-content">
                                <span class="date">
                                    <span class="day">12<sup>th</sup></span>
                                    <span class="month">Apr</span>
                                    <span class="year">2017</span>
                                </span>
                                <h2 class="title">Web Development</h2>
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus, quam non pellentesque consequat, massa justo elementum nunc, ac efficitur tortor nunc sit amet dolor.</p>
                            </div>
                        </div> -->

                        <!-- <div class="timeline">
                            <div class="timeline-content">
                                <span class="date">
                                    <span class="day">14<sup>th</sup></span>
                                    <span class="month">Apr</span>
                                    <span class="year">2017</span>
                                </span>
                                <h2 class="title">Brand Building</h2>
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus, quam non pellentesque consequat, massa justo elementum nunc, ac efficitur tortor nunc sit amet dolor.</p>
                            </div>
                        </div> -->

                        <!-- <div class="timeline">
                            <div class="timeline-content">
                                <span class="date">
                                    <span class="day">16<sup>th</sup></span>
                                    <span class="month">Apr</span>
                                    <span class="year">2017</span>
                                </span>
                                <h2 class="title">Responsive Design</h2>
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus, quam non pellentesque consequat, massa justo elementum nunc, ac efficitur tortor nunc sit amet dolor.</p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

</template>
<script>
import { GetEmployeeDecisionTypePosition } from '@/api/employeeInfor'

export default {
    data(){
        return{
            listPosition:[]
        }
    },
    methods:{

    },
    created(){

        if(this.$route.params.id != null){
             GetEmployeeDecisionTypePosition({EmployeeID: this.$route.params.id}).then(res=>{
                this.listPosition = res.Data
            })
        } else {
             GetEmployeeDecisionTypePosition().then(res=>{
                this.listPosition = res.Data
            })
        }
      
       
    }
}
</script>

<style scoped>
    .demo{ background: #25303b;
padding: 100px 0;}
.heading-title
{
	margin-bottom: 100px;
	color: #fff;
}
.main-timeline{
    width: 80%;
    margin: 20px auto;
    position: relative;
}

.main-timeline:before{
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: rgba(255,255,255,0.2);
    margin: 0 0 0 -1px;
    position: absolute;
    top: 0;
    left: 50%;
}

.main-timeline .timeline{
    width: 100%;
    margin-bottom: 20px;
    position: relative;
}

.main-timeline .timeline:after{
    content: "";
    display: block;
    clear: both;
}

.main-timeline .timeline-content{
    width: 40%;
    float: left;
    margin: 5px 0 0 0;
    border-radius: 6px;
}

.main-timeline .date{
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #25303b;
    padding: 5px 0;
    margin: 0 0 0 -36px;
    position: absolute;
    top: 0;
    left: 50%;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    border: 2px solid rgba(255,255,255,0.2);
    box-shadow: 0 0 0 7px #25303b;
}

.main-timeline .date span{
    display: block;
    text-align: center;
}

.main-timeline .day,
.main-timeline .year{
    font-size: 10px;
}

.main-timeline .month{
    font-size: 18px;
}

.main-timeline .title{
    padding: 15px;
    margin: 0;
    font-size: 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: -1px;
    border-radius: 6px 6px 0 0;
    position: relative;
}

.main-timeline .title:after{
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: 20px;
    right: -5px;
    transform: rotate(-45deg);
}

.main-timeline .description{
    padding: 15px;
    margin: 0;
    font-size: 14px;
    color: #656565;
    background: #fff;
    border-radius: 0 0 6px 6px;
}

.main-timeline .timeline:nth-child(2n+2) .timeline-content{
    float: right;
}

.main-timeline .timeline:nth-child(2n+2) .title:after{
    left: -5px;
}

.main-timeline .timeline:nth-child(1) .title,
.main-timeline .timeline:nth-child(1) .title:after{
    background: #9f84c4;
}

.main-timeline .timeline:nth-child(2) .title,
.main-timeline .timeline:nth-child(2) .title:after{
    background: #02a2dd;
}

.main-timeline .timeline:nth-child(3) .title,
.main-timeline .timeline:nth-child(3) .title:after{
    background: #58b25e;
}

.main-timeline .timeline:nth-child(4) .title,
.main-timeline .timeline:nth-child(4) .title:after{
    background: #eab715;
}

@media only screen and (max-width: 990px){
    .main-timeline{ width: 100%; }
}

@media only screen and (max-width: 767px){
    .main-timeline:before,
    .main-timeline .date{
        left: 6%;
    }
    .main-timeline .timeline-content{
        width: 85%;
        float: right;
    }
    .main-timeline .title:after{
        left: -5px;
    }
}

@media only screen and (max-width: 480px){
    .main-timeline:before,
    .main-timeline .date{
        left: 12%;
    }
    .main-timeline .timeline-content{
        width: 75%;
    }
    .main-timeline .date{
        width: 60px;
        height: 60px;
        margin-left: -30px;
    }
    .main-timeline .month{
        font-size: 14px;
    }
}@charset "utf-8";
/* CSS Document */


</style>