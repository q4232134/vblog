<template>
  <div>
    <el-backtop target=".blog"></el-backtop>
    <el-container :style="{height:fullHeight + 'px'}">
      <el-header>
        <el-menu style="text-align: right; font-size: 12px; height: 60px;"
                 :default-active="activeIndex2"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>

          <el-button v-if="$store.getters.isLogined"
                     type="primary" icon="el-icon-s-custom"
                     @click="loginVisible = true">登录
          </el-button>
          <el-button v-if="$store.getters.isLogined"
                     style="margin-top: 11px;margin-right: 20px"
                     type="primary" icon="el-icon-star-on"
                     @click="registVisible = true">注册
          </el-button>
          <el-menu-item  v-if="!$store.getters.isLogined" index="1">{{ $store.getters.getUser.username }}</el-menu-item>
          <el-dropdown v-if="!$store.getters.isLogined" @command="handleCommand">
            <span class="el-dropdown-link">{{ $store.getters.getUser.username }}<i
                class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginOut">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu>

      </el-header>
      <el-main class="blog" style="height: 100%">
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-distance="20px"
            :infinite-scroll-disabled="disabled">
          <el-row>
            <el-col :span="11" v-for="temp in tableData" :key="temp.id"
                    style="padding: 5px;margin: 5px">
              <el-card :body-style="{ padding: '0px' }" :header="temp.title"
                       @onclick="onItemClick(temp)" shadow="hover">
                <BlogItem :data="temp"/>
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
    onItemClick(data) {
      console.log(data.url)
      // let { href } = this.$router.resolve({ path: '/help-center' })
      // window.open(href, data.url)
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
      return document.documentElement.clientHeight - 20
    }
  },
};
</script>