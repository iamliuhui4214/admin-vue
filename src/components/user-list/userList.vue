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
      <el-button slot="append"
       icon="el-icon-search"
       @click="handleSearch"></el-button>
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
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="100">
        <template slot-scope="scope">
          <!-- 我们可以通过scope.row拿到当前期遍历对象 -->
          <!-- 也就是当前用户数组对象 -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
  </el-table>
  <!-- 每页多大 page-size="5" -->

  <!-- 如果还有 page-sizes="[1,2,3,4]" 就以他为准-->

  <!-- 一共有多少条记录:total="totalSize" -->

  <!-- current-page不是看第几页数据而是指定页码高亮  -->
  <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[1,2,3]"
  layout="total, sizes, prev, pager, next, jumper"
  :total="totalSize">
</el-pagination>
</div>
</template>

<script>

export default {
  async created () {
    // 用户列表组件一上来就加载第一页数据
    this.loadUsersByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [],
      totalSize: 1,
      currentPage: 1,
      pageSize: 1
    }
  },
  methods: {
    // 当我们点击切换每页大小的时候就会触发handleSizeChange方法
    // 我么要做的是在这里拿到用户选择的每页大小重新发起新的数据请求
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      // 每页大小发生变化我们就要重新加载第一页数据
      // 这一个参数1是给服务器接口用的
      this.loadUsersByPage(1, pageSize)

      // 页码改变之后不止要让数据到第一页，高亮效果也要到第一页
      this.currentPage = 1
    },

    // 当点击分页组件页码发生改变时会触发handleCurrentChange方法
    // 我们要做的是在这个方法中调用loadUsersByPage（当前页码）
    handleCurrentChange (currentPage) {
      // 将currentPage更新为最新点击数据
      // Element插件的页码发生改变的时候不会修改我们的数据currentPage
      // 我们这里让每一次改变的时候，手动将currentPage赋值为当前最新页码
      this.currentPage = currentPage

      // 代码改变请求当前页码对应数据
      this.loadUsersByPage(currentPage, this.pageSize)
    },
    async loadUsersByPage (page, pageSize = 1) {
      let res = await this.$http.get('/users', {
        params: { // 请求参数，对象会被转为k=v&k=v的形式拼接到请求路径问号后面发起请求
          pagenum: page,
          pagesize: pageSize,
          // 根据文本框的内容来搜索
          query: this.searchText
        }
      })
      const {total, users} = res.data.data
      this.tableData = users
      this.totalSize = total
    },
    handleSearch () {
      this.loadUsersByPage(1)
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
