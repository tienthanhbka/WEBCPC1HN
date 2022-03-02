<template>
  <div class="login">
    <el-card>
        <div style="display:inline-block">
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input
            v-model="model.username"
            placeholder="Username"
            prefix-icon="fas fa-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
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
            >Login</el-button
          >
        </el-form-item>
        <a class="forgot-password" href="https://oxfordinformatics.com/"
          >Forgot password ?</a
        >
      </el-form>
        </div>
        <div>
            sdfa
        </div>
    </el-card>
    
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>



input:-webkit-autofill { 
  -webkit-box-shadow:200px 200px 100px white inset; 
  box-shadow:200px 200px 100px white inset; 
}
</style>
