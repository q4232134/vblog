<template>
  <div>
    <el-container>
      <el-header>
        <router-link to="/">
          <img src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png"
               style="height: 60%; margin-top: 10px;">
        </router-link>
      </el-header>
      <el-main>
        <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
        </el-input>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
}
</script>
