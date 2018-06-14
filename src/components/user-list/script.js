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
        pageSize: 1,
        userForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        editUserForm: {
          username: '111',
          email: '222',
          mobile: '333'
        },
        dialogFormVisible: false, //控制添加用户对话框显示隐藏
        dialogEditFormVisible: false, //控制编辑用户对话框显示隐藏
        // 添加rules表单验证规则
        addUserFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        }
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
      },
      async handleStateChange (state, user) {
        // 拿到用户id
        // 拿到switch开关选中状态
        // 发送请求改变状态
        const {id: userId} = user
        const res = await this.$http.put(`/users/${userId}/state/${state}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: `用户状态${state ? '启用' : '禁用'}成功`
          })
        }
      },
      // 处理添加用户
      async handleAddUser () {
        // 1获取表单数据
        // 2表单验证
        // 3发送请求添加数据
        // 4根据响应做交互
        // 添加成功给出提示
        // 关闭对话框
        // 重新加载当前数据
        this.$refs['addUserForm'].validate(async (valid) => {
          if (!valid) {
            return false
          }
          // 代码执行到这里就表示代码验证通过了，我么就可以提交表单
          const res = await this.$http.post('/users', this.userForm)
          if (res.data.meta.status === 201) {
            // 添加成功提示消息
            this.$message({
              type: 'success',
              message: '添加用户成功'
            })
            // 关闭对话框
            this.dialogFormVisible = false
  
            // 重新加载用户列表数据
            this.loadUsersByPage(this.currentPage)
  
            // 清空表单内容
            for (let key in this.userForm) {
              this.userForm[key] = ''
            }
          }
        })
      },
      // 处理删除用户
      async handleDeleteUser (user) {
        this.$confirm('删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => { // 确认删除执行的代码
          const res = await this.$http.delete(`/users/${user.id}`)
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功重新加载用户数据
            this.loadUsersByPage(this.currentPage)
          }
        }).catch(() => { // 取消删除执行的代码
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 处理编辑用户
      async handleEditUser () {
        const {id: userId} = this.editUserForm
        const res = await this.$http.put(`/users/${userId}`,this.editUserForm)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '更新用户成功'
          })
          this.dialogEditFormVisible = false //关闭编辑页对话框
          this.loadUsersByPage(this.currentPage) //重新加载当前数据
        }

      },
      // 处理显示被编辑用户表单信息
      async handleShowEditForm (user) {
        this.dialogEditFormVisible = true
        const res = await this.$http.get(`/users/${user.id}`)
        this.editUserForm = res.data.data
      } 
    }
  }