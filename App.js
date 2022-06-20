import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { concat, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, Value, withSpring } from 'react-native-reanimated';
import FlipCard from 'react-native-flip-card'

export default function App() {

  const [index,setIndex] = useState(0);
  const character = ["A","B","C","D"];
  const color = ["red","green","blue","yellow"];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={{
        width:200,
        height:200,
      }} >
        <FlipCard
        flip={true}
          friction={6}
          perspective={1000}
          onFlipStart={()=>{
            setIndex(index + 1 < 4 ? index + 1 : 0)
          }}
        >
          {/* Face Side */}
          <View style={{
            backgroundColor:color[index],
            width:200,
            height:200,
            alignItems:"center",
            justifyContent:"center"
          }}>
            <Text style={{fontSize:100}} >{character[index]}</Text>
          </View>
          {/* Back Side */}
          <View style={{
            backgroundColor:color[index],
            width:200,
            height:200,
            alignItems:"center",
            justifyContent:"center"
          }}>
            <Text style={{fontSize:100}} >{character[index]}</Text>
          </View>
        </FlipCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
