<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="图书名称" prop="bookname">
    <el-input v-model="ruleForm.bookname"></el-input>
  </el-form-item>
    <el-form-item label="作者" prop="bookauthor">
      <el-input v-model="ruleForm.bookauthor"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
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
            axios.post('http://localhost:8082/book/save',this.ruleForm).then(function (resp) {
              if (resp.data == 'success'){
                // _this.$message('添加成功')
                // _this.$router.push('/BookManager')
                _this.$alert('《' + _this.ruleForm.bookname + '》添加成功！', 'OK',{
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                    })
                  }

                })
                _this.resetForm('ruleForm')
              }else {
                _this.$alert('《' + _this.ruleForm.bookname + '》添加失败！')

              }
              console.log(resp)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
