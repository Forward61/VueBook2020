<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="图书编号" >
      <el-input v-model="ruleForm.bid" readonly></el-input>
    </el-form-item>
    <el-form-item label="图书名称" prop="bookname">
      <el-input v-model="ruleForm.bookname"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="bookauthor">
      <el-input v-model="ruleForm.bookauthor"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          bid: '',
          bookname: '',
          bookauthor: ''
        },
        rules: {
          bookname: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
          bookauthor: [
            { required: true, message: '请输入作者', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this

        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.put('http://localhost:8082/book/update',this.ruleForm).then(function (resp) {
              if (resp.data == 'success'){
                // _this.$message('添加成功')
                // _this.$router.push('/BookManager')
                _this.$alert('《' + _this.ruleForm.bookname + '》修改成功！', 'OK',{
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                    })
                  }

                })
                _this.$router.push('/BookManage')

              }else {
                _this.$alert('《' + _this.ruleForm.bookname + '》修改失败！')

              }
            })

          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){
      const  _this = this
      axios.get('http://localhost:8082/book/findById/'+this.$route.query.bid).then(function (resp) {
        _this.ruleForm = resp.data
        console.log(resp)
      })
    }
  }
</script>


