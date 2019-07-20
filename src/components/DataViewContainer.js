import React from 'react';
import { ShotChart } from './ShotChart';
import { CountSlider } from "./CountSlider";
import _ from 'lodash';
import { Radio, Row, Col, Switch } from 'antd';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
  state = {
    minCount: 2,
    chartType: 'hexbin',
    displayToolTip: true,
  }

  onCountSliderChange = (count) => {
    this.setState({ minCount: Number(count) || 2 });
  }

  onChartTypeChange = (e) => {
    this.setState({ chartType: e.target.value });
  }

  onTooltipChange = (displayToolTip) => {
    this.setState({ displayToolTip });
  }

  render() {
    return (
      <div className="data-view">
        <ShotChart
          playerId={this.props.playerId}
          minCount={this.state.minCount}
          chartType={this.state.chartType}
          displayToolTip={this.state.displayToolTip}
        />
        <div className="filters">
          {this.state.chartType === 'hexbin'?
            <CountSlider
              minCount={this.state.minCount}
              onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
            /> : null
          }
          <br/>
          <Row className="chart-type-radio">
            <Col span={12} offset={3}>
              <RadioGroup onChange={this.onChartTypeChange} value={this.state.chartType}>
                <Radio value="hexbin">Hexbin</Radio>
                <Radio value="scatter">Scatter</Radio>
              </RadioGroup>
            </Col>
            <Col span={6}>
              {/* Tooltip:{' '} */}
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                onChange={this.onTooltipChange}
                defaultChecked
              />
            </Col>
          </Row>
          <br/>
        </div>
      </div>
    );
  }
}
