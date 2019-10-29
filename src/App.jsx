import React from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import Sidebar from 'components/Sidebar/Sidebar';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';

class App extends React.Component {

	render () {
		return (
			<Layout className="wm-layout">
				<Sidebar />
				<Layout className="wm-layout-content">
					<Header />
					<Content />
				</Layout>
			</Layout>
		);
	}
}


function mapStateToProps ({form}) {
	return ({
		loading: form.loading
	});
}

export default connect(mapStateToProps)(App);
