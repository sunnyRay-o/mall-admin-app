<template>
  <div class="logon-container">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-form-model-item ref="email" label="邮箱地址" prop="email">
        <a-input v-model="form.email" placeholder="请输入邮箱地址" />
      </a-form-model-item>
      <a-form-model-item ref="username" label="用户名" required prop="username">
        <a-input v-model="form.username" placeholder="请输入用户名" />
      </a-form-model-item>
      <a-form-model-item ref="password" label="密码" prop="password">
        <a-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        />
      </a-form-model-item>
      <a-form-model-item ref="code" label="验证码" prop="code" required>
        <a-input v-model="form.code" placeholder="请输入验证码" />
        <a-button @click="getCode">获取验证码</a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 20, offset: 10 }">
        <a-button @click="submitForm('ruleForm')">创建</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from "@/api/logon";

// const emailReg = /^[a-z\d_-]{5,}@[\w]+\.com$/gi;
// const passwordReg = /^[\w.+-]{6,16}$/gi;
export default {
  data() {
    // const validateEmail = (value, callback) => {
    //   if (emailReg.test(value)) {
    //     // 验证通过
    //     console.log("email");
    //     return true;
    //   }
    //   return callback(new Error("邮箱格式有误"));
    // };
    // const validatePassword = (value, callback) => {
    //   if (passwordReg.test(value)) {
    //     return callback();
    //   }
    //   return callback(new TypeError("格式有误"));
    // };
    return {
      form: {
        email: "",
        username: "",
        password: "",
        code: "",
      },
      rules: {},
      // rules: {
      //   email: [
      //     { required: true, message: "请填写邮箱地址", trigger: "blur" },
      //     {
      //       validator: validateEmail,
      //       message: "邮箱格式不正确",
      //       trigger: "blur",
      //     },
      //   ],
      //   username: [{ min: 6, max: 24, trigger: "blur" }],
      //   password: [
      //     {
      //       validator: validatePassword,
      //       message:
      //         "密码格式不正确，不能包含$,_等特殊字符，只能由英文字母，数字，_组成",
      //       trigger: "blur",
      //     },
      //   ],
      //   code: [
      //     {
      //       min: 4,
      //       max: 8,
      //       message: "验证码有误",
      //       trigger: "blur",
      //     },
      //   ],
      // },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          api.logon(this.form).then((resp) => {
            console.log(resp);
            this.$message.success("注册成功");
            this.$router.push({ name: "Login" });
            return true;
          });
        }
        this.$message.error("请填写相应信息");
        return false;
      });
    },
    async getCode() {
      await api.getCode(this.form.email);
    },
  },
};
</script>

<style lang="less" scoped>
.logon-container {
  width: 400px;
  padding: 50px;
  margin: 0 auto;
  .ant-row {
    margin: 0 0 10px 0;
  }
}
</style>
