import React from 'react';
import {connect} from 'react-redux';
import {
  Layout,
  Empty,
  Tabs,
  Typography,
  Spin,
  Descriptions
} from 'antd';
import moment from 'moment'
import classNames from 'classnames';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import _ from 'underscore';

am4core.useTheme(am4themes_animated);
const {Content: AntContent} = Layout;
const {TabPane} = Tabs;
const {Text } = Typography;

class Content extends React.Component {

  componentDidUpdate (oldProps) {
    if (!_.isEqual(oldProps.data, this.props.data)) {
      if (!this.chart) {
        this.generate();
      } else {
        this.chart.data = this.props.data;
      }
    }
  }

  componentDidMount () {
    if (this.props.data.length) {
      this.generate();
    }
  }

  generate () {
    let chart = am4core.create("amChart", am4charts.XYChart);
    chart.paddingLeft = 0
    chart.paddingLeft = 0

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // Set date label formatting
    dateAxis.renderer.minGridDistance = 120;
    dateAxis.baseInterval = {timeUnit: "hour", count: 3}
    dateAxis.dateFormats.setKey("hour", "MMMM dd HH:mm");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let seriesTemperature = chart.series.push(new am4charts.LineSeries());
    seriesTemperature.dataFields.dateX = "date";
    seriesTemperature.dataFields.valueY = "value";
    seriesTemperature.tooltipText = "Temperature: {valueY.value} °C";

    let seriesClouds = chart.series.push(new am4charts.LineSeries());
    seriesClouds.dataFields.dateX = "date";
    seriesClouds.dataFields.valueY = "clouds";
    seriesClouds.tooltipHTML = "Clouds: {valueY.value}%";

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(seriesTemperature);
    chart.scrollbarX = scrollbarX;
    chart.data = this.props.data;
    this.chart = chart;
  }
  componentWillUnmount () {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render () {
    const {data, loading, selectedCity} = this.props;
    console.log(selectedCity);
    return (
      <AntContent className="wm-content">
        <Spin spinning={loading} wrapperClassName="wm-content-spinner">
          <Tabs defaultActiveKey="1" className="wm-content-tabs">
            <TabPane tab="Info" key="1" className="wm-content-tab"forceRender>
              {!data.length ?
                <Empty
                  description={
                    <Text>
                      Select city from list
                    </Text>
                  } />
                :
                <div style={{width:'100%',height:'100%'}}>
                  <Descriptions
                    bordered
                    column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}
                  >
                    <Descriptions.Item label="City">{selectedCity.name}</Descriptions.Item>
                    <Descriptions.Item label="Country">{selectedCity.country}</Descriptions.Item>
                    <Descriptions.Item label="Timezone">{selectedCity.name}</Descriptions.Item>
                    <Descriptions.Item label="Lat&Lon">{selectedCity.coord?`${selectedCity.coord.lat}, ${selectedCity.coord.lon}`:null}</Descriptions.Item>
                  </Descriptions>
                </div>
              }
            </TabPane>
            <TabPane tab="Temperature" key="2" className="wm-content-tab" forceRender>
              {!data.length ?
                <Empty description={
                  <Text>
                    Select city from list
                </Text>
                } />
                :
                <div className="wm-graph">
                  <div className={classNames('wm-graph-wrapper')}>
                    <div id="amChart"></div>
                  </div>
                </div>
              }
            </TabPane>
          </Tabs>
        </Spin>
      </AntContent>
    );
  }
}


function mapStateToProps ({form}) {
  return ({
    data: form.data,
    selectedCity: form.selectedCity,
    loading: form.loading
  });
}

export default connect(mapStateToProps)(Content);
