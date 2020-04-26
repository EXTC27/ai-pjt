import React, { Component, createContext } from 'react';

const Context = createContext(); // Context 를 만듭니다.

const { Provider, Consumer: AdjustConsumer } = Context;

// Provider 에서 state 를 사용하기 위해서 컴포넌트를 새로 만들어줍니다.
class AdjustProvider extends Component {
  state = {
    hue: 150,
    saturation: 0,
    value: 0,
    filterRef: React.createRef(),
  };

  actions = {
    onChangeHue: (m) => {
      this.setState({
        hue: m,
      });
    },
    onChangeSaturation: (m) => {
      this.setState({
        saturation: m,
      });
    },
    onChangeValue: (m) => {
      this.setState({
        value: m,
      });
    },
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

// 내보내줍니다.
export { AdjustProvider, AdjustConsumer };
