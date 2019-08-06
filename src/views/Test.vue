<template>
  <div class="test">
    <div v-if="isNaN($store.getters.getAverage) != true">平均值: {{$store.getters.getAverage}}</div>
    <div v-else>平均值: 加载中...</div>
    <button @click="update"   v-loading.fullscreen="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">加载更多</button>
    <!-- <div class="list" v-for="item in dataList" :key="item.id">
      <div>{{item.id}}</div>
      <div>{{item.data}}</div>
      <div>{{item.time}}</div>
    </div>-->
    <div class="my_table"  id = "wrapper">
       <div>
         <el-table :data="dataList"  border style="width: 100%" >
      <el-table-column  align="center" type="index" width="180"></el-table-column>
      <el-table-column prop="id" align="center" label="ID" width="180"></el-table-column>
      <el-table-column prop="data" align="center" label="data" width="180"></el-table-column>
      <el-table-column prop="time" align="center" label="time" :formatter="formatTime"></el-table-column>
    </el-table>
       </div>
    </div>
  
  </div>
</template>

<script>
import moment from 'moment';
import mock from "../mock.js";
export default {
  name: "test",
  data() {
    return {
      dataList: [],
      average: "",
      fullscreenLoading : false,
      loading : null
    };
  },
  computed: {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      mock().then(backData => {
        
        this.fullscreenLoading= false;
        this.dataList = [...this.dataList,...backData];
        
        this.$store.dispatch("getDataCall", this.dataList);
      });
    },
    formatTime(row,column) {
      return moment(row.time).format("YYYY-MM-DD hh:mm:ss");
    },
    update() {
      this.fullscreenLoading=true;
      this.getData();
    }
  
  }
};
</script>

<style scoped lang="less">
.test {
  .list {
    display: flex;
    flex-direction: row;
  }
  button {
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: blue;
    padding: 10px;
    font-size: 15px;
    color: white;
    width: 100%;
  }
  .my_table{
    height:500px;
    position:relative;
  }
}
</style>
