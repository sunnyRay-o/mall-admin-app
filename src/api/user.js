// 对于用户操作得接口管理
import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
};
