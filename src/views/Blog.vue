<template>
  <div>
    <el-backtop target=".blog"></el-backtop>
    <el-container :style="{height:fullHeight + 'px'}">
      <el-header style="float: right; font-size: 12px; height: 60px;background: #545c64;">
        <div style="float: right;width: 100%">
          <el-button-group v-if="$store.getters.isLogined"
                           style="margin-top: 11px;margin-right: 20px;float: right">
            <el-button type="primary" icon="el-icon-s-custom" @click="loginVisible = true">登录
            </el-button>
            <el-button type="primary" icon="el-icon-star-on" @click="registVisible = true">注册
            </el-button>
          </el-button-group>
          <div v-if="!$store.getters.isLogined"
               style="margin-right: 20px;float: right;display: flex;">
            <el-avatar style="margin-top: 11px"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-dropdown style="margin-left: 20px;margin-top:20px" v-if="!$store.getters.isLogined"
                         @command="handleCommand">
              <span class="el-dropdown-link">{{ $store.getters.getUser.username }}<i
                  class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginOut">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main class="blog" style="height: 100%">
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-distance="20px" :infinite-scroll-disabled="disabled">
          <el-row el-row :gutter="10">
            <el-col :xl="6" :lg="8" :sm="12" :xs="24" v-for="temp in tableData" :key="temp.id"
                    style="padding-top: 5px;margin-top: 5px;">
                <BlogItem :data="temp" @click.native="onItemClick(temp)" />
            </el-col>
          </el-row>
          <p v-if="loading">加载中...</p>
        </ul>
      </el-main>
    </el-container>
    <div>
      <el-dialog title="登录" :visible.sync="loginVisible" width="20%" :close-on-click-modal="false">
        <LoginView @onRegister="onRegister" @onLoginSuc="onLoginSuc"/>
      </el-dialog>
      <el-dialog title="注册" :visible.sync="registVisible" width="20%"
                 :close-on-click-modal="false">
        <RegistView @onBack="onRegistSuc" @onSuc="onRegistSuc"></RegistView>
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
import LoginView from "@/views/component/LoginView";
import RegistView from "@/views/component/RegistView";
import BlogItem from "@/views/component/BlogItem";

export default {
  components: {BlogItem, LoginView, RegistView},
  data() {
    return {
      tableData: [],
      lastPage: 1,
      itemNums: 0,
      loading: false,
      loginVisible: false,
      registVisible: false,
      page: 0,
      cHeight: window.innerHeight
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
    onItemClick(data) {
      let { href } = this.$router.resolve({ path: '/Edit/'+data.id })
      window.open(href, data.content)
    },
    getUserList() {
      this.$axios.post("/user/getUserList/0", this.form).then(it => {
        console.log(it)
      })
    },
    getBolgs(page) {
      this.loading = true
      this.$axios.post("/blog/all/" + page, this.form).then(it => {
        this.tableData.push(...it.data.data.content)
        this.lastPage = it.data.data.totalPages + 1
        this.itemNums = this.itemNums + it.data.data.size
        this.loading = false
      })
    },
    load() {
      this.getBolgs(this.page++)
    }
  },
  computed: {
    noMore() {
      return this.page >= this.lastPage
    },
    disabled() {
      return this.loading || this.noMore
    },
    fullHeight() {
      return this.cHeight - 20
    }
  }, mounted() {
    window.addEventListener('resize', () => {
      //监听浏览器窗口大小改变
      //浏览器变化执行动作
      this.cHeight = window.innerHeight
    });
  }
};
</script>