<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-container style="margin:10px;padding:10px">
        <el-header
            style="text-align: right; font-size: 12px; padding-right: 40px;height: 40px;vertical-align:center">
          <el-button v-if="$store.getters.isLogined"
                     type="primary" icon="el-icon-s-custom"
                     @click="loginVisible = true">登录
          </el-button>
          <el-button
              type="primary" icon="el-icon-s-custom"
              @click="getUserList">测试
          </el-button>
          <el-dropdown v-if="!$store.getters.isLogined" @command="handleCommand">
            <span class="el-dropdown-link">{{ $store.getters.getUser.username }}<i
                class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginOut">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <div>
      <el-dialog title="登录" :visible.sync="loginVisible" width="20%" :close-on-click-modal="false">
        <LoginView @onRegister="onRegister" @onLoginSuc="onLoginSuc"/>
      </el-dialog>
      <el-dialog title="注册" :visible.sync="registVisible" width="20%"
                 :close-on-click-modal="false">
        <RegistView  @onBack="onRegister" @onSuc="onRegistSuc"></RegistView>
      </el-dialog>
    </div>
  </div>
</template>


<style>
.el-header {
  color: #333;
  height: 100px;
}

.el-aside {
  color: #333;
}

.el-dropdown-link {
  font-size: 16px;
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 16px;
}
</style>

<script>
import LoginView from "@/views/template/LoginView";
import RegistView from "@/views/template/RegistView";

export default {
  components: {LoginView, RegistView},
  data() {
    // function Item(date = '2016-05-', name = '王小虎', address = '上海市普陀区金沙江路 1518 弄') {
    // };
    let item = {date: '2016-05-', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'};
    let fill = Array(10).fill(item);
    // fill.forEach((it, i) => {
    //   it.date = it.date + i
    // })
    return {
      tableData: fill,
      loginVisible: false,
      registVisible: false,
    }
  },
  methods: {
    onRegister(flag) {
      this.loginVisible = !flag;
      this.registVisible = flag;
    },
    onLoginSuc() {
      this.loginVisible = false
    },
    onRegistSuc() {
      this.registVisible = false
    },
    handleCommand(command) {
      switch (command) {
        case "loginOut":
          this.$store.commit("REMOVE_INFO")
      }
      this.$message('您已退出登录');
    },
    getUserList() {
      this.$axios.post("/user/getUserList/0", this.form).then(it => {
        console.log(it)
      })
    }
  }
};
</script>