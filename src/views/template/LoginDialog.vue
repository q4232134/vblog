<template>
  <div>
    <el-dialog title="登录" :visible.sync="formVisible" width="20%"  :close-on-click-modal="false"
               @close="onClosed">
      <el-form :model="form" :rules="rrs" label-width="60" ref="ref">
        <el-form-item prop="username">
          <el-input v-model="form.username" autocomplete="false" placeholder="用户名"
                    prefix-icon="el-icon-s-custom">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input style="margin-top: 10px" v-model="form.password" autocomplete="false"
                    show-password prefix-icon="el-icon-menu" placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px;">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="registForm">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "LoginDialog",
  props: [
    'dialogFormVisible',
  ],
  data() {
    return {
      formVisible: false,
      form: {
        username: 'admin',
        password: 'admin'
      },
      rrs: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ]
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ref.validate().then((it) => {
        if (it) {
          console.log(this.form.username)
          this.$axios.post("/login", this.form).then(it => {
            this.$store.commit('SET_TOKEN',it.headers['authorization'])
            this.$store.commit("SET_USERINFO", it.data.data)
            this.$message({
              message: it.data.msg,
              type: 'success'
            });
            this.onClosed()
          })
        }
      })

    },
    registForm() {
      this.$emit('onRegister',true)
    },
    onClosed() {
      this.$emit('onClosed')
    }
  },
  watch:{
    dialogFormVisible(val){
      this.formVisible = val
    }
  }
};
</script>
