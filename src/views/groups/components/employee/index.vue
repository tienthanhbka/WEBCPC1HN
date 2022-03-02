<template>
    <div>
        <el-card >
  
  <div>
      <div style="display:inline-block">
          <h2>Login</h2>
      <el-form
        class="login-form"
  
        ref="form"
      
      >
        <el-form-item prop="username">
          <el-input
           
            placeholder="Username"
            prefix-icon="fas fa-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
           
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-button"
            type="primary"
            native-type="submit"
            block
            >Login</el-button
          >
        </el-form-item>
        <a class="forgot-password" href="https://oxfordinformatics.com/"
          >Forgot password ?</a
        >
      </el-form>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div style="display:inline-block">
          
      </div>
  </div>
</el-card>
    </div>
</template>
<script>
import login from './login'
export default {
    components:{
        login
    }
}
</script>