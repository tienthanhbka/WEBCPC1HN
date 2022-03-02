
 

<template>
<div style="background: #2c3e50;height: 100%">
  <div class="login">
    <el-card >
     <div >
       <div style="float:left"> <img
          style="max-height:90px;max-width:90px;"
          src="@/assets/cpc1hn-logo.png"
          alt
          srcset
        /></div>
       <div style="float:left">
         <h2> Sổ tay nhân viên </h2>
       </div>
         <div style="clear: both;">

       </div>
        
        </div>
        <div style="margin-top:20px;font-size: 13px; "> Đăng nhập bằng tài khoản sổ tay</div>
        <div style="margin-top:20px;">
          
           <el-form
        class="login-form"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="fas fa-user"
             id="el-username"
          ref="username"
          v-model="loginForm.username"
          placeholder="Số điện thoại"
          name="username"
          type="text"
          tabindex="1"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="fas fa-lock"
             auto-complete="on"
          id="el-password"
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Mật khẩu"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
            @click.native.prevent="handleLogin"
            >Đăng nhập</el-button
          >
        </el-form-item>
        <div class="forgot-password">
          <a  href="https://www.facebook.com/groups/2198461923574074/?epa=SEARCH_BOX"
          ><i class="fab fa-facebook-square"></i> Nhóm hỗ trợ</a>
        </div>
         <div class="forgot-password">
          <a  href="http://it-cpc1hn.simplesite.com/440898866"
          ><i class="fas fa-file-invoice"></i> Tài liệu hướng dẫn</a>
        </div>
          
      </el-form>
        </div>
     
     
    </el-card>
    
  </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (value==null || value == '') {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 0) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      usernameN: "",
      passwordN: "",
      loginForm: {
        username: "",
        password: ""
      },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      // },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {
      if(this.isMobile()){
      this.$message({
        message: "Hãy chọn 'Menu' -> 'Trang web cho máy tính' để xem tốt hơn",
        type: "warning"
      });
      }
      
      
    },
  methods: {
  
  	isMobile: function() {
    	var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
    },
    usernameValchange(val) {
      console.log(val);
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    
    handleLogin() {
      if (this.loginForm.username == null || this.loginForm.username == "") {
        this.loginForm.username = document.getElementById("el-username").value;
      }
      if (this.loginForm.password == null || this.loginForm.password == "") {
        this.loginForm.password = document.getElementById("el-password").value;
      }

      if (this.loginForm.username != null && this.loginForm.username != "") {
        if (this.loginForm.password != null && this.loginForm.password != "") {
          // this.$refs.loginForm.validate(valid => {
          //   if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
          //   } else {
          //     console.log('error submit!!')
          //     return false
          //   }
          // })
        } else {
          this.$message({
            message: "Nhập lại mật khẩu",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "Nhập lại số điện thoại",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style scoped>

.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}

.login-button {
  width: 100%;
  margin-top: 25px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}


