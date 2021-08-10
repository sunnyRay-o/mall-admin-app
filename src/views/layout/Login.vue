<template>
  <div class="login-container">
    <a-form-model
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="LogonForm"> 注册 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import user from "@/api/user";

export default {
  data() {
    const emailReg = /^[\w-]+@[\w]+(\.com|\.cn)(\.[a-z]+)?$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        // 邮箱为空
        return callback(new Error("请输入邮箱地址"));
      }
      if (!emailReg.test(value)) {
        // 邮箱格式不正确
        return callback(new Error("邮箱格式不正确，请检查后再次尝试输入"));
      }
      return callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        // 密码为空
        return callback(new Error("请输入密码"));
      }
      return callback();
    };
    return {
      loginForm: {
        password: "",
        email: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      return this.$refs[formName].validate((valid) => {
        if (valid) {
          user
            .login(this.loginForm)
            .then((res) => {
              this.$store.dispatch("asyncSetUserInfo", res);
              this.$router.push({
                name: "Home",
              });
            })
            .catch((error) => {
              this.$message.error(error);
            });
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
    LogonForm() {
      this.$router.push({
        name: "Logon",
      });
    },
  },
};
</script>

<style scoped lang="less">
@import url("~@/assets/css/login.less");
</style>
