<template>
  <div>
    <el-table
      :data="tableData"
      border
                style="width: 70%">
      <el-table-column
        fixed
        prop="bid"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="bookname"
        label="名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="bookauthor"
        label="作者"
        width="120">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size=pagesize
      :total=total
      @current-change="changePage"
    >
    </el-pagination>
  </div>

</template>

<script>
  export default {
    methods: {
      deleteBook(row){
        const  _this = this
        axios.delete('http://localhost:8080/book/delete/'+row.bid).then(function (resp) {
          _this.$alert('《' + row.bookname + '》删除成功！', 'OK',{
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              })
            }

          })
          window.location.reload()
        })
      },
      edit(row) {
        this.$router.push({
          path: '/update',
          query:{
            bid: row.bid
          }
        })
      },
      changePage(currentPage){
        const _this = this;
        axios.get('http://localhost:8080/book/findAll/'+(currentPage-1)+'/3').then(function (resp) {
          _this.tableData = resp.data.content
          _this.pagesize = resp.data.size
          _this.total = resp.data.totalElements
        })


      }
    },

    data() {
      return {
        pagesize: 1,
        total: 1,
        tableData: []
      }
    },
    created() {
      const _this = this;
      axios.get('http://localhost:8080/book/findAll/0/3').then(function (resp) {
        _this.tableData = resp.data.content
        _this.pagesize = resp.data.size
        _this.total = resp.data.totalElements
      })
    }
  }
</script>
