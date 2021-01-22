<template>
  <div class="index">
    <form >
        <input type="text" name="name" v-model="name"><br>
        <input type="number" name="age" v-model="age"><br>
        <a href="javascript:;" @click="addUser">提交</a><br>
        <a href="javascript:;" @click="query">查询</a>
    </form>
  </div>
</template>
<script>
import { add, getUserList } from '../api/user'
export default {
  name: 'HelloWorld',
  data () {
    return {
      name:'',
      age:null
    }
  },
  methods:{
      addUser(){
          if(!this.name || !this.age){
            //   this.$message.warning('请完善信息');
              return;
          }
          const params ={
              name: this.name,
              age: this.age,
          }
        //   axios({
        //       method:'post',
        //       url:'/api/user/addUser',
        //       params:params
        //   }).then(response =>{
        //       console.log(response)
        //   })
        //   this.$http({method:'post',url:'/api/user/addUser',params:params}).then(response =>{
        //       console.log(response);
        //   })
        add(params).then(response =>{
            console.log(response)
        })
      },
    //   查询全部
        query(){
            getUserList().then(response =>{
                console.log(response)
            })
        },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
