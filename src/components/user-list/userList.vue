<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-breadcrumb class="user-list-breadcrumb"
      separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row class="user-list-search">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
       <el-button type="success" plain>成功按钮</el-button>
    </el-col>
  </el-row>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="电话">
      </el-table-column>
  </el-table>
  <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="4"
  :page-sizes="[100, 200, 300, 400]"
  :page-size="100"
  layout="total, sizes, prev, pager, next, jumper"
  :total="400">
</el-pagination>
</div>
</template>

<script>
import {getToken} from '@/assets/js/auth'

export default {
  async created () {
    let token = getToken()
    let res = await this.$http.get('/users', {
      headers: {
        // 配置请求头携带身份令牌
        Authorization: token
      },
      params: { // 请求参数，对象会被转为k=v&k=v的形式拼接到请求路径问号后面发起请求
        pagenum: 1,
        pagesize: 5
      }
    })
    this.tableData = res.data.data.users
  },
  data () {
    return {
      searchText: '',
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}

.user-list-search {
  margin-bottom: 10px;
}
</style>
