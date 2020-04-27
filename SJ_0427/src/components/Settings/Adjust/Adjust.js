import React, { Component } from 'react';
class Adjust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      saturation: 0,
      value: 0,
    };
  }

  // componentDidUpdate() {
  //   console.log('Adjust.js에서 찍는 hue:' + this.props.store.hue);
  //   console.log('Adjust.js에서 찍는 saturation:' + this.props.store.saturation);
  //   console.log('Adjust.js에서 찍는 value:' + this.props.store.value);
  // }

  componentDidMount() {
    this.setState({
      hue: this.props.store.hue,
      saturation: this.props.store.saturation,
      value: this.props.store.value,
    });
  }

  onChangeHue = (m) => {
    this.setState({
      hue: m,
    });
    this.props.store.onChangeHue(m);
  };
  onChangeSaturation = (m) => {
    this.setState({
      saturation: m,
    });
    this.props.store.onChangeSaturation(m);
  };
  onChangeValue = (m) => {
    this.setState({
      value: m,
    });
    this.props.store.onChangeValue(m);
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

export default Adjust;
