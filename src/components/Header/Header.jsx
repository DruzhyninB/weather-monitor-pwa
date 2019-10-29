import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Layout, Typography, Icon} from 'antd';
import {Actions} from 'store';
const {Header: AntHeader} = Layout;
const {Title} = Typography;
class Header extends React.Component {

  render () {
    let {selectedCity,sidebarCollapsed} = this.props;
    return (
      <AntHeader className="wm-header">
        <Icon
          className="wm-header-trigger"
          type={sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggleSidebar}
        />
        <Title level={2}  className="wm-header-city" style={{margin: 0}}>
          {selectedCity.name}
        </Title>
      </AntHeader>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    toggleSidebar: Actions.toggleSidebar
  }, dispatch);
}

function mapStateToProps ({form,sidebar}) {
  return ({
    selectedCity: form.selectedCity,
    sidebarCollapsed: sidebar.collapsed
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
