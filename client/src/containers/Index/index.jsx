import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../../redux/actions/login';
import './index.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Main = ({ index, login, history, dispatch }) => {
  const { userInfo } = login;

  const handleClick = (e) => {
    console.log('click ', e);
  };

  const doExit = () => {
    dispatch(action.logout());
  };

  return (
    <div className="main">
      <Menu
        onClick={handleClick}
        mode="horizontal"
        className="main-top-bar"
      >
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="user" />
              {userInfo.nickname || '未登录'}
            </span>
          }
        >
          <MenuItemGroup>
            <Menu.Item key="userCenter"><Icon type="home" />个人中心</Menu.Item>
            <Menu.Item key="exit" onClick={doExit}><Icon type="logout" />退出登录</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>

      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Navigation One</span>
            </span>
          }
        >
          <MenuItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    index: state.index,
    login: state.login,
  };
}

Main.propTypes = {
  index: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Main);
