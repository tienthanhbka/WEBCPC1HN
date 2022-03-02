<template>
    <div class="company-container">
        <div class="company-header">
            <div class="company-name">CPC1 HÀ NỘI</div>
            <div class="company-slogan">Tiên phong công nghệ Dược phẩm</div>
        </div>
        <el-card class="about-me">
            <div class="about-me-title">Về chúng tôi.</div>
            <div class="about-me-content">Công ty Cổ phần CPC1 Hà Nội là một trong những công ty hàng đầu trong việc áp dụng công nghệ cao vào trong quá trình sản xuất Dược phẩm. Đem tới những sản phẩm thuốc chất lượng cao, đáp ứng nhu cầu </div>
        </el-card>


        <div class="more-info">
            <div class="more-info-header">Tầm nhìn</div>
            <div class="more-info-title">Từ sự thấu hiểu - chúng tôi sẽ đem lại sự lựa chọn tuyệt vời cho sức khỏe của bạn.</div>
            <el-row>
                <el-col :xs="24" :sm="12" :md="6">
                    <div class="more-info-item" style="border-bottom: 3px solid red">
                        <div class="more-info-item-image">
                            <img src="@/assets/img/gift.png" alt="mission" class="image">
                        </div>
                        <div class="more-info-item-title">Chất lượng</div>
                        <div class="more-info-item-content">Đem lại những sản phẩm chất lượng nhất cho cộng đồng</div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="6">
                    <div class="more-info-item"  style="border-bottom: 3px solid green">
                        <div class="more-info-item-image">
                            <img src="@/assets/img/computer.png" alt="mission" class="image">
                        </div>
                        <div class="more-info-item-title">Hiện Đại</div>
                        <div class="more-info-item-content">Áp dụng các công nghệ hiện đại để tạo ra những sản phẩm đi đầu thế giới</div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="6">
                    <div class="more-info-item"  style="border-bottom: 3px solid blueviolet">
                        <div class="more-info-item-image">
                            <img src="@/assets/img/fast.png" alt="mission" class="image">
                        </div>
                        <div class="more-info-item-title">Kịp thời</div>
                        <div class="more-info-item-content">Kịp thời cung cấp các sản phẩm chăm sóc sức khỏe cho xã hội</div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="6" class="more-info-item-col">
                    <div class="more-info-item" style="border-bottom: 3px solid orange">
                        <div class="more-info-item-image" >
                            <img src="@/assets/img/internet.png" alt="mission" class="image">
                        </div>
                        <div class="more-info-item-title">Vươn tầm</div>
                        <div class="more-info-item-content">Đưa thương hiệu thuốc Việt Nam vươn tầm thế giới</div>  
                    </div>
                </el-col>
        </el-row>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>

    

    .company-container {
        background: rgba(49, 49, 49, 0.05);
        // min-height: 100vh
    }

    .company-header {
        background: rgb(199, 189, 189);
        height: 500px;
        max-height: 50vh;
        background-image: url("https://cpc1hn.com.vn/wp-content/uploads/%E1%BA%A2nh/ve-chung-toi.jpg");

        .company-name {
            color: rgb(250, 58, 58);
            text-align: center;
            font-size: 40px;
            font-family: 'Times New Roman', Times, serif;
            padding-top: 30px
            
        }

        .company-slogan {
            color: rgb(250, 58, 58);
            text-align: center;
            font-size: 30px;
            font-family: 'Times New Roman', Times, serif;
        }
    }

    .about-me{
        margin-left: 20px;
        margin-right: 20px;
        margin-top: -100px;
        height: 300px;

        .about-me-title{
            color: #000;
            font-size: 40px;
            font-family: 'Times New Roman', Times, serif;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 30px
        }

        .about-me-content {
            text-align: center;
        }
    }

    .more-info-item-col{
        height: 300px;
    }
    .more-info {
        width: 100%;
        margin-right: 20px;

        .more-info-header{
            font-size: 60px;
            color: #000;
            text-align: center;
            // font-style: bold;
            font-family: 'Times New Roman';
            margin-top: 100px
        }

        .more-info-title {
            font-size: 20px;
            color: grey;
            margin-bottom: 50px;
            text-align: center
        }
        .more-info-item{
            height: 300px;
            background-color: #fff;
            max-height: 50vh;
            margin: 20px;
            margin-bottom: 75px;

            .more-info-item-title {
                text-align: center;
                font-size: 20px;
                margin-bottom: 20px;
            }

            .more-info-item-content {
                text-align: center;
                margin: 20px
            }

            .more-info-item-image {
                width: 100%;
                height: 150px;
                padding-left: calc((100% - 75px)/2);
                padding-top: 40px;
                // background-color: #000;
                margin-top: 50px;
                margin: auto;

                .image {
                    width: 75px;
                    height: 75px;
                    vertical-align: center;
                    float: left;
                }
            }
        }
    }
</style>
