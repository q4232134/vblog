<template>
  <div>
    <el-container style="margin:10px;padding:10px">
      <el-header
          style="text-align: right; font-size: 12px; height: 40px;vertical-align:center">
        <el-button v-if="$store.getters.isLogined"
                   type="primary" icon="el-icon-s-custom"
                   @click="loginVisible = true">登录
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
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
          <el-row>
            <el-col :span="11" :data="tableData" :key="o" v-for="i in 10"
                    style="padding: 5px;margin: 5px">
              <el-card :body-style="{ padding: '0px' }" :header=" tableData[i].title">
                <el-container direction="horizontal" style="border-radius: 15px;border:1px">
                  <el-aside width="150px" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                    <el-image  style="height: 90%;padding-top: 5px;" fit="contain" :src="getFilePath( tableData[i].imageUrl)"/>
                  </el-aside>
                  <el-main>
                    <div>{{ tableData[i].content }}</div>
                    <div style="padding: 14px;">
                      <time class="time" style="font-size: 4px;color: gray">{{ tableData[i].createTime }}</time>
                      <el-button type="text" class="button">操作按钮</el-button>
                    </div>
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </ul>
      </el-main>
    </el-container>
    <div>
      <el-dialog title="登录" :visible.sync="loginVisible" width="20%" :close-on-click-modal="false">
        <LoginView @onRegister="onRegister" @onLoginSuc="onLoginSuc"/>
      </el-dialog>
      <el-dialog title="注册" :visible.sync="registVisible" width="20%"
                 :close-on-click-modal="false">
        <RegistView @onBack="onRegister" @onSuc="onRegistSuc"></RegistView>
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
    this.getBolgs(0)
    return {
      tableData: [],
      lastPage: 1,
      loading: false,
      loginVisible: false,
      registVisible: false,
      page: 0
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
    },
    getBolgs(page) {
      if (this.noMore) return
      this.loading = true
      this.$axios.post("/blog/all/" + page, this.form).then(it => {
        this.tableData.push(...it.data.data.content)
        this.lastPage = it.data.data.totalPages + 1
        this.loading = false
      })
    },
    load() {
      this.getBolgs(this.page++)
    },
    getFilename(url) {
      if (url) {
        let m = url.toString().match(/\/[a-zA-Z0-9.]*$/);
        if (m && m.length > 0) {
          return m[0];
        }
      }
      return "";
    },
    getFilePath(url) {
      return "./cnbeta" + this.getFilename(url)
    }
  },
  computed: {
    noMore() {
      return this.page >= 1
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
};
</script>