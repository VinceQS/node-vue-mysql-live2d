<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="4">
        <ul class="title">
          <li>
            <a href="#第一章">第一章</a>
          </li>
          <li>
            <a href="#第二章">第二章</a>
          </li>
          <li>
            <a href="#第三章">第三章</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="20">
        <div style="width: 100%;height: 100%;">
          <ul>
            <li id="第一章" style="height: 300px;">
              <p>话说，天下之势，分久必合合久必分</p>
            </li>
            <li id="第二章" style="height: 300px;">
              <p>终于，到了第二章</p>
            </li>
            <li id="第三章" style="height: 300px">
              <p>要终结了</p>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss">
  .title {
    width: 100%;
    height: 300px;
    li {
      line-height: 30px;
      width: 100%;
    }
  }
</style>

