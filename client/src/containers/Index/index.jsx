import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Content from '../Content/index';
import * as action from '../../redux/actions/login';
import './index.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@connect(state => ({ login: state.login }))
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '/',
    };
  }

  render() {
    const { login, dispatch } = this.props;
    console.log('this.props', this.props);
    const { userInfo } = login;

    const handleClick = (e) => {
      this.setState({
        url: e.key,
      });
    };

    const doExit = () => {
      dispatch(action.logout());
    };
    return (
      <div className="main">
        <div className="top">
          <Menu mode="horizontal" className="main-top-bar">
            <span className="main-top-bar-title">餐饮供应链系统</span>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="user" />
                  {userInfo.nickname || '未登录'}
                </span>
              }
            >
              <MenuItemGroup>
                <Menu.Item key="userCenter">
                  <Icon type="home" />
                  个人中心
                </Menu.Item>
                <Menu.Item key="exit" onClick={doExit}>
                  <Icon type="logout" />
                  退出登录
                </Menu.Item>
              </MenuItemGroup>
            </SubMenu>
          </Menu>
        </div>
        <div className="body">
          <div className="main-body-menu">
            <Menu
              onClick={handleClick}
              style={{ width: 256 }}
              defaultSelectedKeys={['/shop/info']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="database" />
                    <span>基础信息配置</span>
                  </span>
                }
              >
                <Menu.Item key="/shop/info">门店档案</Menu.Item>
                <Menu.Item key="/hq/info">总部档案</Menu.Item>
                <Menu.Item key="/supply/info">供应商档案</Menu.Item>
                <Menu.Item key="/goods/info">物品档案</Menu.Item>
                <Menu.Item key="/baseinfo/prRelations">采购关系配置</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="shop" />
                    <span>门店管理</span>
                  </span>
                }
              >
                <Menu.Item key="/shop/pr">请购</Menu.Item>
                <Menu.Item key="/shop/selfPr">自采</Menu.Item>
                <Menu.Item key="/shop/selfPrAcceptance">自采验收</Menu.Item>
                <Menu.Item key="/shop/dispatchAcceptance">配送验收</Menu.Item>
                <Menu.Item key="/shop/inDepot">入库管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="home" />
                    <span>总部管理</span>
                  </span>
                }
              >
                <Menu.Item key="/hq/orders">订单管理</Menu.Item>
                <Menu.Item key="/hq/dispatchOrders">配送订单</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="car" />
                    <span>供应商管理</span>
                  </span>
                }
              >
                <Menu.Item key="/supply/orders">订单管理</Menu.Item>
                <Menu.Item key="/supply/dispatchOrders">发货管理</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="main-body-cont" >
            <Content src={this.state.url} />
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Main;
