<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-container style="margin:10px;padding:10px">
        <el-header
            style="text-align: right; font-size: 12px; padding-right: 40px;height: 40px;vertical-align:center">
          <el-button type="primary" icon="el-icon-s-custom" @click="dialogFormVisible = true">登录
          </el-button>
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="登录" :visible.sync="dialogFormVisible" width="20%">
      <el-form :model="form" :rules="rrs" label-width="60" ref="ref">
        <el-form-item prop="name">
          <el-input v-model="form.name" autocomplete="false" placeholder="用户名"
                    prefix-icon="el-icon-s-custom">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input style="margin-top: 10px" v-model="form.password" autocomplete="false"
                    show-password prefix-icon="el-icon-menu" placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px;">
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm('form')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
</style>

<script>
export default {
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
      dialogFormVisible: true,
      form: {
        name: 'admin',
        password: 'admin'
      },
      rrs: {
        name: [
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
        console.log(it)
      })

    },
    resetForm(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>