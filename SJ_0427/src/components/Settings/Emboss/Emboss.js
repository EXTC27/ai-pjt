import React, { Component } from 'react';

class Emboss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Strength: 0.5,
      WhiteLevel: 0.5,
      Direction: '',
      Blend: false,
    };
  }

  componentDidUpdate() {
    var dir = document.getElementById('Direction');
    var option = dir.options[dir.selectedIndex].value;
    var flag = document.getElementById('Blend');
    this.setState({
      Direction: option,
    });
    if (flag.checked) {
      this.setState({
        Blend: true,
      });
    } else this.setState({ Blend: false });

    flag.checked = this.state.Blend;

    this.props.store.onChangeOption(option);
    this.props.store.onChangeBlend(this.state.Blend);
    this.props.store.onChangeEmboss();
  }

  onChangeStrength = (m) => {
    this.setState({
      Strength: m,
    });
    this.props.store.onChangeStrength(m);
  };

  onChangeWhiteLevel = (m) => {
    this.setState({
      WhiteLevel: m,
    });
    this.props.store.onChangeWhiteLevel(m);
  };

  componentDidMount() {
    this.setState({
      Strength: this.props.store.Strength,
      WhiteLevel: this.props.store.WhiteLevel,
      Direction: this.props.store.Direction,
      Blend: this.props.store.Blend,
    });
  }

  render() {
    return (
      <div id="controls">
        Strength:
        <input
          id="Strength"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={this.state.Strength || 0.5}
          onChange={(e) => this.props.onChangeStrength(Number(e.target.value))}
        />
        WhiteLevel:
        <input
          id="WhiteLevel"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={this.state.WhiteLevel || 0.5}
          onChange={(e) =>
            this.props.onChangeWhiteLevel(Number(e.target.value))
          }
        />
        Direction:
        <select id="Direction" value={this.state.Direction} defaultValue="top">
          <option value="top">top</option>
          <option value="top-left">top-left</option>
          <option value="top-right">top-right</option>
          <option value="left">left</option>
          <option value="right">right</option>
          <option value="bottom">bottom</option>
          <option value="bottom-left">bottom-left</option>
          <option value="bottom-right">bottom-right</option>
        </select>
        Blend:
        <input id="Blend" type="checkbox" checked />
      </div>
    );
  }
}

export default Emboss;
