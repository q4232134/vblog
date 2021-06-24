<template>
  <div>
    <el-header style="height: 100%">
      <el-image
          style="width: 400pt; height: 100pt"
          src="https://img2.baidu.com/it/u=1830203777,4012531609&fm=26&fmt=auto&gp=0.jpg"
          fit="cover"></el-image>
    </el-header>
    <el-main style="width: 100%">
      <LoginView :dialog-form-visible="loginVisible" @onRegister="onRegister"
                 @onLoginSuc="onLoginSuc"></LoginView>

      <el-dialog title="注册" :visible.sync="registVisible" width="20%"
                 :close-on-click-modal="false">
        <RegistView :dialog-form-visible="registVisible" @onSuc="onRegistSuc" @onBack = "onBack"></RegistView>
      </el-dialog>
    </el-main>
  </div>
</template>

<style>
</style>

<script>
import LoginView from "@/views/template/LoginView";
import RegistView from "@/views/template/RegistView";
import router from "@/router";

export default {
  components: {LoginView, RegistView},
  data() {
    return {
      loginVisible: true,
      registVisible: false,
    }
  },
  methods: {
    onRegister(flag) {
      this.loginVisible = !flag;
      this.registVisible = flag;
    },
    onLoginSuc() {
      router.push("/")
    },
    onBack() {
      this.registVisible = false;
    }
  }
};
</script>