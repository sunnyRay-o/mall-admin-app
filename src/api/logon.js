import axios from "@/axios";

export default {
  getCode(email) {
    console.log(email);
    return axios.post("/passport/getCode", {
      email,
    });
  },
  logon(form) {
    return axios.post("/passport/logon", form);
  },
};
