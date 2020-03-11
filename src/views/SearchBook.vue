<template>
  <el-form :inline="true" :model="book" class="demo-form-inline">
    <el-form-item label="书名">
      <el-input v-model="book.bookname" placeholder="书名"></el-input>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="book.bookauthor" placeholder="作者"></el-input>
    </el-form-item>
    <el-form-item label="查询内容">
      <el-input v-model="searchparam" placeholder="作者|书名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('book')">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        book: {
          bookname: '',
          bookauthor: ''
        },
        searchparam:''
      }
    },
    methods: {
      onSubmit(formName) {
        const _this = this
        axios.get('http://localhost:8080/book/searchQuery',this.searchparam).then(function (resp) {
          if (resp.data == 'success') {
            console.log(resp.data)

          } else {

          }
        })
      }
    }
  }






</script>

<style scoped>

</style>
