// 对于用户操作得接口管理
import axios from '@/axios';

export default {
  login(params) {
    console.log(params);
    return axios.post('/passport/login', params);
  },
};
