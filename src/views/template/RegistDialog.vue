<template>
  <div>
    <el-dialog title="注册" :visible.sync="dialogFormVisible" width="20%"
               :close-on-click-modal="false" @close="onClosed">
      <el-form :model="form" :rules="rrs" label-width="60" ref="ref">
        <el-form-item prop="loginname">
          <el-input v-model="form.loginname" autocomplete="false" placeholder="用户名"
                    prefix-icon="el-icon-s-custom">
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username" autocomplete="false" placeholder="昵称"
                    prefix-icon="el-icon-s-custom">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input style="margin-top: 10px" v-model="form.password" autocomplete="false"
                    show-password prefix-icon="el-icon-menu" placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="form.password2" autocomplete="false"
                    show-password prefix-icon="el-icon-menu" placeholder="确认密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" autocomplete="false"
                    prefix-icon="el-icon-s-promotion" placeholder="邮箱">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px;">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RegistDialog",
  props: [
    'dialogFormVisible',
  ],
  data() {
    var validateComfirmPwd = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error('确认密码与新密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        loginname: 'admin',
        username: '管理员',
        password: 'admin',
        password2: 'admin',
        email: '1111@qq.com'
      },
      rrs: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'},
        ],
        password2: [
          {required: true, message: '请再次输入密码', trigger: 'change'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'},
          {validator: validateComfirmPwd, trigger: 'blur'}
        ]
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ref.validate().then((it) => {
        if (it) {
          this.$axios.post("/user/regist", this.form).then(it => {
            this.$message({
              message: it.data.msg,
              type: 'success'
            });
            this.onClosed()
          })
        }
      })

    },
    resetForm() {
      this.$emit('onRegister', false)
    },
    onClosed() {
      this.$emit('onClosed')
    }
  }
};
</script>
