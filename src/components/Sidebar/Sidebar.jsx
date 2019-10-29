import React from 'react';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import {List, message, Layout, Spin} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Input} from 'antd';
import 'react-virtualized/styles.css';
import {Actions} from 'store';
import classNames from 'classnames';
const {Sider} = Layout;

const cityList = window.cityList;

let timeOut;
class WmSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      data: [],
    };
  }
  loadedRowsMap = {};

  componentDidMount () {
    let filterWorker = new Worker('webWorker.js');
    filterWorker.onmessage = this.workerResponse;
    console.log(cityList);
    this.setState({data: cityList, filterWorker})
  }

  onClickCity = (city) => {
    if (!this.props.loading) {
      this.props.loadCity(city.id);
      this.props.toggleSidebar();
    }
  }
  sidebarBreakpoint = collapsed => {
    console.log(collapsed)
    this.props.setSidebarCollapsed(collapsed)
  }

  handleChange = (e) => {
    e.persist();
    let {filtering} = this.props;
    if (!filtering) {
      this.setState({[e.target.name]: e.target.value});
      if (timeOut) {
        clearTimeout(timeOut);
      }
      timeOut = setTimeout(() => {
        this.props.setFilteringData(true);
        this.state.filterWorker.postMessage({list: cityList, filter: e.target.value});
        clearTimeout(timeOut);
      }, 500);
    }
  }

  workerResponse = (e) => {
    this.setState({data: e.data.result});
    this.props.setFilteringData(false);
  }

  handleInfiniteOnLoad = ({startIndex, stopIndex}) => {
    let {data} = this.state;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 19) {
      message.warning('Virtualized List loaded all');
      this.setState({
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

  isRowLoaded = ({index}) => !!this.loadedRowsMap[index];

  renderItem = ({index, key, style}) => {
    const {data} = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style} className={'wm-sidebar-list-item'} onClick={e => this.onClickCity(item)}>
        {`${item.name} - ${item.country}`}
      </List.Item>
    );
  };

  render () {
    let {filtering, sidebarCollapsed} = this.props;
    const {data} = this.state;
    console.log(sidebarCollapsed);
    return (
      <Sider
        theme="dark"
        className="wm-sider"
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={this.sidebarBreakpoint}
        trigger={null}
        collapsible
        collapsed={sidebarCollapsed}>
        <div className='wm-sidebar' >
          <div className='wm-sidebar-search'>
            <Input
              size='large'
              placeholder='Start type city'
              name='filterValue'
              value={this.state.filterValue}
              onChange={this.handleChange}
            />
          </div>

          <div ref={ref => this.scrollTarget = ref} className={classNames('wm-sidebar-list', {'loading': filtering})}>
            <Spin spinning={filtering}>
              <List
                size='small'
                bordered
              >
                <WindowScroller
                  scrollElement={this.scrollTarget}
                >
                  {({height, isScrolling, onChildScroll, scrollTop}) => (
                    <AutoSizer disableHeight>
                      {({width}) => (
                        <VList
                          autoHeight
                          height={height}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          overscanRowCount={2}
                          rowCount={data.length}
                          rowHeight={30}
                          rowRenderer={this.renderItem}
                          scrollTop={scrollTop}
                          width={width}
                        />
                      )}
                    </AutoSizer>
                  )}
                </WindowScroller>
              </List>
            </Spin>
          </div>
        </div>
      </Sider>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadCity: Actions.loadCity,
    setDisplayName: Actions.setDisplayName,
    setData: Actions.setData,
    setLoadingData: Actions.setLoadingData,
    setFilteringData: Actions.setFilteringData,
    toggleSidebar: Actions.toggleSidebar,
    setSidebarCollapsed: Actions.setSidebarCollapsed
  }, dispatch);
}

function mapStateToProps ({form, sidebar}) {
  return {
    sidebarCollapsed: sidebar.collapsed,
    filtering: form.filtering
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WmSidebar);
