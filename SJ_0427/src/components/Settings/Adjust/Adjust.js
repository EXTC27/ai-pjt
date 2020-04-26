import React, { Component } from 'react';
import { AdjustConsumer } from '../../contexts/AdjustContext';

class Adjust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      saturation: 0,
      value: 0,
    };
  }
  componentDidMount() {
    this.setState({
      hue: this.props.hue,
      saturaion: this.props.saturation,
      value: this.props.value,
    });
  }

  onChangeHue = (m) => {
    this.setState({
      hue: m,
    });
    this.props.onChangeHue(m);
  };
  onChangeSaturation = (m) => {
    this.setState({
      saturation: m,
    });
    this.props.onChangeSaturation(m);
  };
  onChangeValue = (m) => {
    this.setState({
      value: m,
    });
    this.props.onChangeValue(m);
  };

  render() {
    return (
      <div>
        <div id="controls">
          <input
            id="hue"
            type="range"
            min="0"
            max="259"
            step="1"
            value={this.state.hue || 150}
            onChange={(e) => this.onChangeHue(Number(e.target.value))}
          />
          <br />
          <input
            id="saturation"
            type="range"
            min="-2"
            max="10"
            step="0.1"
            value={this.state.saturation || 0}
            onChange={(e) => this.onChangeSaturation(Number(e.target.value))}
          />
          <br />

          <input
            id="value"
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={this.state.value || 0}
            onChange={(e) => this.onChangeValue(Number(e.target.value))}
          />
        </div>
      </div>
    );
  }
}

const AdjustContainer = () => (
  <AdjustConsumer>
    {({ state, actions }) => (
      <Adjust
        hue={state.hue}
        saturaion={state.saturaion}
        value={state.value}
        onChangeHue={actions.onChangeHue}
        onChangeSaturation={actions.onChangeSaturation}
        onChangeValue={actions.onChangeValue}
      />
    )}
  </AdjustConsumer>
);

export default AdjustContainer;
