<template>
  <el-dialog :visible.sync="editVisible" title="编辑用户" width="1000px" :close-on-click-modal="false" :before-close="clseEdit">
    <el-form :model="editForm" ref="editForm" :rules="formRules" :inline="true">
      <el-form-item label="名称" prop="name" :label-width="labelWidth">
        <el-input v-model="editForm.name" :style="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age" :label-width="labelWidth">
        <el-input v-model="editForm.age" :style="inputWidth" type="number"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address" :label-width="labelWidth">
        <el-input v-model="editForm.address" :style="inputWidth"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" slot="footer" style="margin-top:1em">
      <el-button type="info" size="medium" @click="clseEdit">取消</el-button>
      <el-button type="primary" size="medium" @click="editSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateUser } from '../../api/user'
export default {
  props: ['edit', 'editMsg'],
  data() {
    const isNum = function(rule, value, callback) {
      const reg = /^[1-9]\d*$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入一个数字'))
      }
    }
    return {
      editVisible: false,
      editForm: {
        id: null,
        name: '',
        age: null,
        address: ''
      },
      labelWidth: '100px',
      inputWidth: 'width:360px',
      formRules: {
        name: [{ required: true, message: '必填字段请输入', trigger: 'blur' }],
        age: [{ required: true, validator: isNum, trigger: 'blur' }]
      }
    }
  },
  watch: {
    edit() {
      if (!this.edit) {
        this.$refs.editForm.resetFields()
      } else {
        this.editForm.id = this.editMsg.id
        this.editForm.name = this.editMsg.name
        this.editForm.age = this.editMsg.age
        this.editForm.address = this.editMsg.address
      }
      this.editVisible = !this.editVisible
    }
  },
  methods: {
    clseEdit() {
      this.$emit('closeDialog')
    },
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          updateUser(this.editForm).then(response => {
            if (response.code === '000000') {
              this.$message.success('修改成功！')
              this.$emit('success')
            } else {
              this.$message.error('修改失败！')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
