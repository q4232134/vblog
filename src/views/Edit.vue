<template>
  <div v-loading="fullscreenLoading" class="edit">
    <el-form :model="blogForm" :rules="rrs" label-width="60" ref="ref">
      <el-header style="height: 100%">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-image
                style="width: 400pt; height: 100pt"
                :src="blogForm.imageUrl"
                fit="cover"></el-image>
          </el-col>
          <el-col :span="10">
            <el-row :gutter="20" style="width: 600pt">
              <el-col :span="10">
                <el-form-item prop="title" style="width: 100%">
                  <el-input type="text" placeholder="请输入标题" v-model="blogForm.title" maxlength="80"
                            show-word-limit>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="imageUrl" style="width: 100%">
                  <el-input type="text" placeholder="请输入图片url" v-model.lazy="blogForm.imageUrl"
                            show-word-limit>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="description">
              <el-input type="textarea" placeholder="请输摘要" v-model="blogForm.description"  style="width: 500pt; height: 80pt"
                        maxlength="500" :autosize="{ minRows: 4, maxRows: 4}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="container">
        <el-form-item prop="content">
          <mavon-editor class="editor" v-model="blogForm.content" boxShadow="true"/>
        </el-form-item>
      </el-main>
    </el-form>
    <el-footer style="vertical-align: central;text-align: right">
      <el-button v-preventReClick type="primary" @click="commit()">{{ this.saveBtnDes }}</el-button>
      <el-button v-preventReClick v-if="blogForm.status!==2" type="warning" @click="publish(2)">发布
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
  height: 400px;
}
</style>

<script>

export default {
  name: 'edit',
  data() {
    return {
      fullscreenLoading: false,
      commitLoading: false,
      blogForm: {
        id: "",
        title: "",
        description: "",
        content: "",
        imageUrl: "",
        status: 2,
      }, rrs: {
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'},
          {min: 3, max: 5000, message: '长度在 3 到 5000 个字符', trigger: 'blur'}
        ], description: [
          {required: true, message: '请输入描述', trigger: 'blur'},
        ], title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
        ], imageUrl: [
          {required: true, message: '请输入图片地址', trigger: 'blur'},
        ],
      }
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id == null) return;
    this.fullscreenLoading = true;
    this.$axios.post('/blog/info/' + id).then(it => {
      this.blogForm = it.data.data
      this.fullscreenLoading = false;
    })
  },
  methods: {
    commit() {
      this.commitLoading = true
      this.$refs.ref.validate().then((it) => {
        if (it) {
          this.$axios.post("/blog/edit", this.blogForm).then(it => {
            this.$message({
              message: it.data.msg,
              type: 'success'
            });
            this.commitLoading = false
          })
        }
      })
    },
    publish(value) {
      this.$axios.post("/blog/publish/"+this.blogForm.id+'/'+value).then(it => {
        this.blogForm.status = it.data.data
        this.$message({
          message: it.data.msg,
          type: 'success'
        });
      })
    }
  },
  computed: {
    saveBtnDes() {
      if (this.blogForm.id.length === 0) return '保存';
      else return '修改';
    }
  }
}
</script>
