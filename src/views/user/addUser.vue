<template>
    <el-dialog :visible.sync='addVisible' title="新增用户" width="1000px" :close-on-click-modal="false" :before-close="closeAdd">
        <el-form :model="addForm" ref="addForm" :rules="formRules" :inline="true">
            <el-form-item label="名称" prop="name" :label-width="labelWidth">
                <el-input v-model="addForm.name" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age" :label-width="labelWidth">
                <el-input type="number" v-model="addForm.age" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="description" :label-width="labelWidth">
                <el-input v-model="addForm.description" :style="inputWidth"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer" style="margin-top:2em">
            <el-button type="info" size="medium" @click="closeAdd">取消</el-button>
            <el-button type="primary" size="medium" @click="addSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { addUser } from '../../api/user'
export default {
  props: ['add'],
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
      addForm: {
        name: '',
        age: null,
        description: ''
      },
      formRules: {
        name: [{ required: true, message: '必填字段请输入', trigger: 'blur' }],
        age: [{ required: true, validator: isNum, trigger: 'blur' }]
      },
      labelWidth: '100px',
      inputWidth: 'width:360px',
      addVisible: false
    }
  },
  watch: {
    add() {
      if (!this.add) {
        this.$refs.addForm.resetFields()
      }
      this.addVisible = !this.addVisible
    }
  },
  methods: {
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addUser(this.addForm).then(response => {
            if (response.code === '000000') {
              this.$message.success('新增成功')
              this.$emit('success')
            } else {
              this.$message.error('新增失败')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    closeAdd() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .el-input__inner[type="number"]{
        padding-right:0 !important;
    }
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
            -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
