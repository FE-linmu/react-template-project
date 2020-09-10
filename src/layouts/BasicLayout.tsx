import React, { useEffect } from 'react';
import { connect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';
import BottomNav from '@/components/BottomNav'; // 项目底部导航
import '@/static/iconfont/iconfont.css';
import styles from './BasicLayout.less';

interface BasicLayoutProps extends ConnectProps {
  user: UserModelState;
}
/*
 * React.FC 解释：
 * FC 是 FunctionComponent 的简写，这个类型定义了默认的 props（如 children）以及一些静态属性（如 defaultProps）
 */
const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { children, location, dispatch, user } = props;

  useEffect(() => {
    // 获取用户基本信息
    if (dispatch) {
      // dispatch 转给 models/user.ts 进行异步操作，user/fetchCurrent 中的"user"是 namespace，fetchCurrent 是 effects 里面的异步方法
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  const { pathname } = location;
  const showBottomNav = pathname !== '/login';
  return (
    <div className={styles.main}>
      <article>{children}</article>
      <footer>{showBottomNav && <BottomNav pathname={pathname} />}</footer>
    </div>
  );
};
// umi 中的 connect 方法和 react-redux 的是一样的
export default connect(({ user }: ConnectState) => ({ user }))(BasicLayout);
