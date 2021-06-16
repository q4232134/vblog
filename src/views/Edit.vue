<template>
  <div class="edit">
    <el-form :model="blogForm" :rules="rrs" label-width="60" ref="ref">
      <el-main class="container">
        <el-form-item prop="content">
          <mavon-editor class="editor" v-model="blogForm.content" boxShadow='true'/>
        </el-form-item>
      </el-main>
    </el-form>
    <el-footer style="vertical-align: central;text-align: right">
      <el-button type="primary"
                 @click="commit(value)">提交
      </el-button>
      <el-button type="warning"
                 @click="commit(value)">取消
      </el-button>
    </el-footer>
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100%;
}

.editor {
  height: 500px;
}
</style>

<script>

export default {
  name: 'edit',
  data() {
    return {
      blogForm: {
        content: ""
      }, rrs: {
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'},
          {min: 3, max: 800, message: '长度在 3 到 800 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    commit(value) {
      this.$refs.ref.validate().then((it) => {
        if (it) {
          console.log(value);
        }
      })
    }
  },
}
</script>
