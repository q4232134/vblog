<template>
  <el-card :body-style="{ padding: '0px' }" :header="data.title" shadow="hover">
    <el-container style="border-radius: 15px;border:1px">
      <el-aside width="150px"
                style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-image style="height: 90%;padding-top: 5px;" fit="contain"
                  :src="getFilePath( data.imageUrl)"/>
      </el-aside>
      <el-container>
        <el-main style="">
          <div class="sub-title"
               style="width:100%;word-wrap: break-word;text-align: start;text-indent: 20px;">
            {{ data.content }}
          </div>
        </el-main>
        <el-footer style="height: 40px">
          <div style="padding: 14px;text-align:end">
            <time class="time" style="font-size: 4px;color: gray">
              {{ data.createTime }}
            </time>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </el-card>
</template>
<script>
export default {
  name: 'BlogItem',
  props: ["data"],
  methods: {
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
  }
}
</script>
