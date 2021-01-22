<template>
  <el-main>
    <el-form
      :model="searchForm"
      ref="searchForm"
      :inline="true"
      class="demo-form-inline">
      <el-form-item label="用户名" label-width="labelWidth">
        <el-input v-model="searchForm.user" :style="inputWidth"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="searchData()">查询</el-button>
        <el-button type="success" size="medium" @click="addTab()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataSource"
      :header-cell-style="{background:'#41A1FF',color:'#fff',textAlign:'center'}"
      border>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="国家" prop="country"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="创建时间" prop="create_time"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editTab(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align: center;margin-top:1em">
      <el-pagination
        :page-sizes="[10,20,50,100]"
        :page-size="pageSize"
        :current-page="pageNum"
        :total="totalcount"
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <!-- 新增 -->
    <add-dialog
      :add="add"
      @closeDialog="closeDialog('add')"
      @success="success('add')">
    </add-dialog>
    <!-- 编辑 -->
    <edit-dialog
      :edit="edit"
      :editMsg="editMsg"
      @closeDialog="closeDialog('edit')"
      @success="success('edit')">
    </edit-dialog>
  </el-main>
</template>
<script>
// var func = require("../../utils/methods")
import { getUserList, delUser } from '../../api/user'
import addDialog from './addUser'
import editDialog from './editUser'
export default {
  components: {
    'add-dialog': addDialog,
    'edit-dialog': editDialog
  },
  data() {
    return {
      searchForm: {
        user: ''
      },
      inputWidth: 'width:220px',
      labelWidth: '100px',
      dataSource: [],
      pageNum: 1,
      pageSize: 10,
      totalcount: 0,
      add: false,
      edit: false,
      editMsg: {}
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      const params = {
        name: this.searchForm.user,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      getUserList(params).then((response) => {
        console.log(response)
        if (response.code === '000000') {
          this.dataSource = response.list
          this.totalcount = response.total
        }
      })
    },
    searchData() {
      this.pageNum = 1
      this.getTableList()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.getTableList()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTableList()
    },
    delItem(id) {
      this.$confirm('确定删除该条数据', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delUser(id).then((response) => {
          this.$message.success('删除成功')
          this.handleCurrentChange(1)
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message.info('已取消！')
      })
    },
    addTab() {
      this.add = true
    },
    closeDialog(type) {
      if (type === 'add') {
        this.add = false
      } else if (type === 'edit') {
        this.edit = false
      }
    },
    success(type) {
      if (type === 'add') {
        this.add = false
      } else if (type === 'edit') {
        this.edit = false
      }
      this.handleCurrentChange(1)
    },
    editTab(item) {
      this.editMsg = item
      this.edit = true
    }
  }
}
</script>
