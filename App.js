import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  PanResponder,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { transformOrigin, rotateXY, rotateXZ } from './Utils';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = {
  container: {
    left: WIDTH / 2 - 50,
    top: HEIGHT / 2 - 50,
    width: 100,
    height: 100,
    backgroundColor: "transparent"
  },
  rectangle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    alignItems:"center",
    justifyContent:"center",
  }
};

export default class Cube extends Component {

  constructor(props){

    super(props);

    // index
    // 0 = front side
    // 1 = bottom side
    // 2 = back side
    // 3 = top side

    this.state = {
      index : 0
    }

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this)
    });
  }

  handlePanResponderMove (e, gestureState) {
    const { dx, dy } = gestureState;

    const origin = { x: 0, y: 0, z: -50 };

    
    let matrix = rotateXY(0, dy);
    transformOrigin(matrix, origin);
    let zindex = matrix[5] <= 0 ? 1 : 2;
    const mFront = matrix;
    const posFront = matrix[5];

    this.refViewFront.setNativeProps({style: {zIndex:zindex,transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(0 + 180, dy);
    transformOrigin(matrix, origin);
    zindex = matrix[5] <= 0 ? 2 : 1;
    const mBack = matrix;
    const posBack = matrix[5];

    this.refViewBack.setNativeProps({style: {zIndex:zindex,transform: [{perspective: 1000}, {matrix: matrix},{rotateX:"180deg"},{rotateY:"180deg"}]}});

    matrix = rotateXZ(0, dy - 90);
    transformOrigin(matrix, origin);
    zindex = matrix[5] <= 0 ? 1 : 2;
    const mTop = matrix;
    const posTop = matrix[5];
    this.refViewTop.setNativeProps({style: {zIndex:zindex,transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(-0, dy + 90);
    transformOrigin(matrix, origin);
    zindex = matrix[5] <= 0 ? 1 : 2;
    const mBottom = matrix;
    const posBottom = matrix[5];
    this.refViewBottom.setNativeProps({style: {zIndex:zindex,transform: [{perspective: 1000}, {matrix: matrix}]}});

    // matrix = rotateXY(0 + 90, dy);
    // transformOrigin(matrix, origin);
    // zindex = matrix[5] <= 0 ? 1 : 2;
    // this.refViewRight.setNativeProps({style: {zIndex:zindex,transform: [{perspective: 1000}, {matrix: matrix}]}});

    // matrix = rotateXY(0 - 90, dy);
    // transformOrigin(matrix, origin);
    // zindex = matrix[5] <= 0 ? 1 : 2;
    // this.refViewLeft.setNativeProps({style: {zIndex:zindex,transform: [{perspective: 1000}, {matrix: matrix}]}});
    

    // You can change the key with what you need
    const index = {

      // example
      // A:posTop

      top:posTop,
      front:posFront,
      bottom:posBottom,
      back:posBack*-1,
    }

    const m = {
      top : mTop,
      front : mFront,
      bottom : mBottom,
      back : mBack,
    }

    // console.log(m);

    this.setState({
      index:index
    })
  }

  // renderLeft(color) {
  //   return (
  //     <View
  //       ref={component => this.refViewRight = component}
  //       style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
  //       {...this.panResponder.panHandlers}
  //     >
  //       <Text>Left</Text>
  //     </View>
  //   )
  // }

  // renderRight(color) {
  //   return (
  //     <View
  //       ref={component => this.refViewLeft = component}
  //       style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
  //       {...this.panResponder.panHandlers}
  //     >
  //       <Text>Right</Text>
  //     </View>
  //   )
  // }

  renderFront(color) {
    return (
      <View
        ref={component => this.refViewFront = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      >
        <Text>Front</Text>
      </View>
    )
  }

  renderBack(color) {
    return (
      <View
        ref={component => this.refViewBack = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
        >
        <Text>Back</Text>
      </View>
    )
  }

  renderTop(color) {
    return (
      <View
        ref={component => this.refViewTop = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
        >
        <Text>Top</Text>
      </View>
    )
  }

  renderBottom(color) {
    return (
      <View
        ref={component => this.refViewBottom = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
        >
        <Text>Bottom</Text>
      </View>
    )
  }
  
  getFrontSide(){

    const pos = this.state.index;
    const values = Object.values(pos);
    const keys = Object.keys(pos);

    const max = Math.max(...values);

    const front = keys.filter(key => {
      if (pos[key] == max) {
        return key
      }
    })

    return front[0]+" is on the front"
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          {/* {this.renderRight('#e5afb9')}
          {this.renderLeft('#b5bce2')} */}
          {this.renderBack('#8697df')}
          {this.renderFront('#4c72e0')}
          {this.renderTop('#de7c92')}
          {this.renderBottom('#d1426b')}
        </View>
        <View style={{
          zIndex:1000,
        }} >
          <Text>Position</Text>
          <Text>
            {
              JSON.stringify(this.state.index)
            }
          </Text>
          <Text>On Front</Text>
          <Text>{this.getFrontSide()}</Text>
        </View>
      </View>
    );
  }
}