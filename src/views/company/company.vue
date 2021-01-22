<template>
  <el-main>
    <el-form
      :model="searchForm"
      :inline="true">
      <el-form-item label="公司名称">
        <el-input v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          @click="searchData"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataSource"
      :header-cell-style="{background:'#41A1FF', color:'#fff', textAlign:'center'}"
      border>
      <el-table-column
        label="公司名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address">
      </el-table-column>
      <el-table-column
        label="负责人"
        prop="manager">
      </el-table-column>
      <el-table-column
        label="联系方式"
        prop="phone"></el-table-column>
      <el-table-column
        label="操作"
        width="160px">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            @click="editTab(scope.row)">
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="delItem(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:1em; text-align:center">
      <el-pagination
        :page-sizes="[10,20,50]"
        :page-size="pageSize"
        :total="totalcount"
        :current-page="pageNum"
        @current-change="handelCurrentChange"
        @size-change="handelSizeChange"
        layout="total,sizes,prev,pager,next,jumper">
      </el-pagination>
    </div>
  </el-main>
</template>
<script>
import { getCompany } from '../../api/company'
export default {
  data() {
    return {
      searchForm: {
        name: ''
      },
      dataSource: [],
      pageSize: 10,
      pageNum: 1,
      totalcount: null,
      labelWidth: '100px'
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      const params = {
        name: this.searchForm.name,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      getCompany(params).then((response) => {
        console.log(response)
        if (response.code === '000000') {
          this.dataSource = response.list
          this.totalcount = response.total
        } else {
          this.$message.error('获取列表失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    searchData() {
      this.handelCurrentChange(1)
    },
    handelCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.getTableList()
    },
    handelSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTableList()
    }
  }
}
</script>
