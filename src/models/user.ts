import { Effect, Reducer } from 'umi';
import { queryCurrent, queryDetail, fakeAccountLogout } from '@/services/user';
import { fakeAccountLogin } from '@/services/login';
import { Toast } from 'antd-mobile';
import Icon from '@ant-design/icons/lib/components/AntdIcon';
// 当前用户的接口
interface CurrentUser {
  name?: string; // ？：表示该属性或参数为可选项
  icon?: string;
  userid?: string;
}

// 详细用户信息的接口
interface DetailUser {
  name: string;
  icon: string;
  userid: string;
  email: string;
  phone: string;
  address: string;
  signature?: string; // ?:表示该属性或参数为可选项
  title?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  country: string;
}

export interface UserModelState {
  currentUser: CurrentUser;
  detail:
    | DetailUser
    | {
        name: string;
        icon: string;
      }; // | 是联合类型，表示 detail 可以是空或者 DetailUser 接口中的信息或者...
}

// 定义用户模型接口
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    login: Effect;
    queryDetail: Effect;
    logout: Effect;
  };
  reducers: {
    saveUser: Reducer<UserModelState>;
    clearUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user', // 每一个模块定义一个值，不同的模块是不同的
  state: {
    currentUser: {},
    detail: {
      name: '',
      icon: '',
    },
  },
  // 副作用，处理异步任务（可理解为 Vuex 中的 actions）
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveUser',
        payload: { currentUser: { ...response } },
      });
    },
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.status === 1) {
        yield put({
          type: 'saveUser',
          payload: { currentUser: { ...response } },
        });
      } else {
        Toast.fail(response.msg || '系统开小差，请稍后再试~');
      }
    },
    *queryDetail(_, { call, put }) {
      const response = yield call(queryDetail);
      yield put({ type: 'saveUser', payload: { detail: { ...response } } });
    },
    *logout(_, { call, put }) {
      const response = yield call(fakeAccountLogout);
      yield put({
        type: 'clearUser',
        payload: { currentUser: {}, detail: { name: '', icon: '' } },
      });
    },
  },
  // 同步修改共享的 state 值
  reducers: {
    saveUser(state, action) {
      return { ...state, ...action.payload };
    },
    clearUser(state, action) {
      return { ...action.payload };
    },
  },
};
export default UserModel;
