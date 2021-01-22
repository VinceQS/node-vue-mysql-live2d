<template>
  <div class="">
    <p>websocket即时通讯</p>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card style="min-height:600px">
          <el-row :gutter="10">
            <el-col :span="18">
              <el-aside class="messageTab">
                <ul class="">
                  <template>
                    <li class="lineMsg clearfix" v-for="(item, index) in messageList" :key="index" :class="{ 'isMy': item.id===myId }">
                      <div>
                        <p>{ { item.name } } { { item.time } }</p>
                        <p class="msg">{ { item.message } }</p>
                      </div>
                    </li>
                  </template>
                </ul>
              </el-aside>
              <div class="sendTab">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="textarea"
                  maxlength="200"
                  rows="4"
                  clearable
                  show-word-limit>
                </el-input>
                <div class="foot-right">
                  <el-button :disabled="!textarea" @click="sendMessage" size="small" type="primary">发 送</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <el-aside class="usersTab">
                <ul class="users">
                  <li v-for="(item, index) in users" :key="index" :class="{ 'online': item.online }">{ { item.name } }</li>
                </ul>
              </el-aside>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="min-height:600px"></el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import store from '@/store'
var ws
export default {
  data() {
    return {
      users: [
        { id: 101, name: '张三', online: true }, { id: 102, name: '李四', online: true }, { id: 103, name: '王五', online: true }, { id: 104, name: '赵柳', online: true },
        { id: 111, name: '吴桂花', online: true }, { id: 112, name: '李思敏', online: false }, { id: 113, name: '网老李', online: false }, { id: 114, name: '赵飞', online: false },
        { id: 121, name: '周凯', online: false }, { id: 122, name: '李进', online: false }, { id: 123, name: '马谡', online: false }, { id: 124, name: '陈旭', online: false },
        { id: 131, name: '孙思邈' }, { id: 132, name: '华佗', online: false }, { id: 133, name: '马伊克', online: false }, { id: 134, name: '牛犇犇', online: false }
      ],
      messageList: [],
      textarea: '',
      first: true // 是否是第一次收到服务器返回的 信息
    }
  },
  computed: {
    myId() {
      return store.getters.userInfo.id
    }
  },
  beforeMount() {
    // ws.close()
  },
  mounted() {
    ws = new WebSocket('ws://localhost:6666')
    // 与服务器建立websocket连接
    console.log(ws.readyState)
    ws.onmessage = (msg) => {
      console.log('服务器推送', JSON.parse(msg.data))
      if (this.first) {
        this.messageList = JSON.parse(msg.data)
        this.first = false
      } else {
        this.messageList.push(JSON.parse(msg.data))
      }
      // ws.close()
    }
  },
  beforeDestroy() {
    // ws.close()
  },
  methods: {
    sendMessage() {
      const news = {
        id: store.getters.userInfo.id,
        name: store.getters.userInfo.name,
        message: this.textarea,
        isFirst: false
      }
      ws.send(JSON.stringify(news))
      // ws.close()
    }
  }
}
</script>
<style lang="scss">
  .usersTab {
    height:600px;
    width: 250px !important;
    padding: 5px;
    border: 1px solid #e3e3e3;
    &::-webkit-scrollbar{
      width: 4px;
    }
    &::-webkit-scrollbar-thumb{
      background: #dddddd;
      background-clip: padding-box;
    }
    &::-webkit-scrollbar-track-piece{
      background: #f8f8f8
    }
    .users {
      padding-right: 6px;
      li {
        width: 100% !important;
        cursor: pointer;
        margin-bottom: 4px;
        background: #e9e7e7;
        line-height: 24px;
        text-indent: 8px;
        color: #8f8f8f;
        &:hover {
          color: #6b6767;
          background: #d8d6d6;
         }
       }
      li:last-child {
        margin-bottom: 0;
       }
      li.online{
        background: #b4b0b0;
        color: #f1ff34;
        &:hover {
          background: #a09d9d;
          color: #e5f12f;
        }
      }
    }
  }
  .messageTab {
    height: 450px;
    width: 100% !important;
    padding: 10px;
    border: 1px solid #e3e3e3;
    &::-webkit-scrollbar{
      width: 4px;
    }
    &::-webkit-scrollbar-thumb{
      background: #dddddd;
      background-clip: padding-box;
    }
    &::-webkit-scrollbar-track-piece{
      background: #f8f8f8
    }
    ul .lineMsg{
      line-height: 20px;
      margin-bottom: 5px;
      width: 100%;
      div {
        float: left;
        max-width: 45%;
        p {
          margin: 0;
          padding: 0;
          font-size: 12px;
        }
        p.msg{
          padding-left: 5px;
        }
      }
    }
    .lineMsg.isMy{
      text-align: right;
      div {
        float: right;
      }
    }
  }
  .sendTab {
    width: 100%;
    height: 140px;
    margin-top: 10px;
  }
  .foot-right {
    text-align: right;
    margin-top: 10px;
  }
</style>
