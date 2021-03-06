import { useRef, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { rotateXY, rotateXZ, transformOrigin } from "./Utils";

export default function App(params) {

    const [posX,setPosX] = useState(20);
    const [index,setIndex] = useState({});

    const scrollUp = ()=>{
        const origin = { x: 0, y: 0, z: -50 };

        let matrix = rotateXY(0, posX + 90);
        transformOrigin(matrix, origin);
        let zindex = matrix[5] <= 0 ? 1 : 2;
        zFront.value = zindex;
        const posFront = matrix[5];
        matrixFront.value = matrix;

        matrix = rotateXY(0, posX + 90 - 90);
        transformOrigin(matrix, origin);
        zindex = matrix[5] <= 0 ? 1 : 2;
        zTop.value = zindex;
        const posTop = matrix[5];
        matrixTop.value = matrix;

        matrix = rotateXZ(0, posX + 90 + 90);
        transformOrigin(matrix, origin);
        zindex = matrix[5] <= 0 ? 1 : 2;
        const posBottom = matrix[5];
        zBottom.value = zindex;
        matrixBottom.value = matrix;

        matrix = rotateXY(0 + 180, posX + 90);
        transformOrigin(matrix, origin);
        zindex = matrix[5] <= 0 ? 2 : 1;
        const posBack = matrix[5];
        zBack.value = zindex;
        matrixBack.value = matrix;

        setPosX(posX + 90)

        // You can change the key with what you need
        const data = {

            // example
            // A:posTop
    
            top:posTop,
            front:posFront,
            bottom:posBottom,
            back:posBack*-1,
        }

        setIndex(data);
    }

    const scrollDown = ()=>{
        const origin = { x: 0, y: 0, z: -50 };

        let matrix = rotateXY(0, posX - 90);
        transformOrigin(matrix, origin);
        let zindex = matrix[5] <= 0 ? 1 : 2;
        zFront.value = zindex;
        const posFront = matrix[5];
        matrixFront.value = matrix;

        matrix = rotateXY(0, posX - 90 - 90);
        transformOrigin(matrix, origin);
        zindex = matrix[5] <= 0 ? 1 : 2;
        zTop.value = zindex;
        const posTop = matrix[5];
        matrixTop.value = matrix;

        matrix = rotateXZ(0, posX - 90 + 90);
        transformOrigin(matrix, origin);
        zindex = matrix[5] <= 0 ? 1 : 2;
        const posBottom = matrix[5];
        zBottom.value = zindex;
        matrixBottom.value = matrix;

        matrix = rotateXY(0 + 180, posX - 90);
        transformOrigin(matrix, origin);
        zindex = matrix[5] <= 0 ? 2 : 1;
        const posBack = matrix[5];
        zBack.value = zindex;
        matrixBack.value = matrix;

        // You can change the key with what you need
        const data = {

            // example
            // A:posTop
    
            top:posTop,
            front:posFront,
            bottom:posBottom,
            back:posBack*-1,
        }

        setIndex(data);

        setPosX(posX - 90)
    }

    // Front Side Start
    const frontRef = useRef();
    const matrixFront = useSharedValue(
        [
            1,
            0,
            0,
            0,
            0,
            0.9593228768052128,
            -0.2823112077799437,
            0,
            0,
            0.2823112077799437,
            0.9593228768052128,
            0,
            0,
            14.115560388997183,
            -2.033856159739358,
            1,
        ]
    )

    const zFront = useSharedValue(1);

    const mFrontStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {matrix:withSpring(matrixFront.value)}
            ],
            zIndex:zFront.value
        }
    })

    const frontSide = ()=>{
        return(
            <Animated.View
            ref={frontRef}
            style={[
                styles.rectangle,
                {
                    backgroundColor:"red",
                },
                mFrontStyle
            ]} >
                <Text>Front</Text>
            </Animated.View>
        )
    }
    // Front side end

    // Top side start
    const topRef = useRef();
    const matrixTop = useSharedValue(
        [
            1,
            0,
            0,
            0,
            0,
            0.2823112077799437,
            0.9593228768052128,
            0,
            0,
            -0.9593228768052128,
            0.2823112077799437,
            0,
            0,
            -47.96614384026064,
            -35.88443961100282,
            1,
        ]        
    )

    const zTop = useSharedValue(2);

    const mTopStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {matrix:withSpring(matrixTop.value)}
            ],
            zIndex:zTop.value
        }
    })

    const topSide = ()=>{
        return(
            <Animated.View
            ref={topRef}
            style={[
                styles.rectangle,
                {
                    backgroundColor:"green",
                },
                mTopStyle
            ]} >
                <Text>Up</Text>
            </Animated.View>
        )
    }
    // Top side end

    // Bottom side start
    const bottomRef = useRef();
    const matrixBottom = useSharedValue(
        [
            1,
            0,
            0,
            0,
            0,
            -0.28231120777994356,
            -0.9593228768052128,
            0,
            0,
            0.9593228768052128,
            -0.28231120777994356,
            0,
            0,
            47.96614384026064,
            -64.11556038899718,
            1,
        ]  
    )

    const zBottom = useSharedValue(1);

    const mBottomStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {matrix:withSpring(matrixBottom.value)}
            ],
            zIndex:zBottom.value
        }
    })

    const bottomSide = ()=>{
        return(
            <Animated.View
            ref={bottomRef}
            style={[
                styles.rectangle,
                {
                    backgroundColor:"blue",
                },
                mBottomStyle
            ]} >
                <Text>Bottom</Text>
            </Animated.View>
        )
    }
    // Bottom side end

    // Back side start
    const backRef = useRef();
    const matrixBack = useSharedValue(
        [
            -1,
            -3.4573151697113135e-17,
            -1.1748316904283344e-16,
            0,
            0,
            0.9593228768052128,
            -0.2823112077799437,
            0,
            1.2246467991473532e-16,
            -0.2823112077799437,
            -0.9593228768052128,
            0,
            6.123233995736766e-15,
            -14.115560388997183,
            -97.96614384026064,
            1,
        ],         
    )

    const zBack = useSharedValue(1);

    const mBackStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {matrix:withSpring(matrixBack.value)},
                {rotateX:"180deg"},
                {rotateY:"180deg"}
            ],
            zIndex:zBack.value
        }
    })

    const backSide = ()=>{
        return(
            <Animated.View
            ref={backRef}
            style={[
                styles.rectangle,
                {
                    backgroundColor:"yellow",
                },
                mBackStyle
            ]} >
                <Text>Back</Text>
            </Animated.View>
        )
    }
    // Back side end

    const getFrontSide = ()=>{
        const pos = index;
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

    return(
        <View style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        }} >
            <StatusBar barStyle="dark-content" />

            <View style={{
            zIndex:1000,
            }} >
                <Text>Position</Text>
                <Text>
                    {
                        JSON.stringify(index)
                    }
                </Text>
                <Text>On Front</Text>
                <Text>{getFrontSide()}</Text>
            </View>

            <TouchableOpacity style={{
                padding:10,
                backgroundColor:"blue",
                paddingHorizontal:30,
            }} onPress={()=>{
                scrollDown();
            }} >
                <Text style={{color:"white"}} >Scroll Up</Text>
            </TouchableOpacity>
            
            {/* The cube */}
            <View style={{
                marginVertical:100,
                width:100,
                height:100,
            }} >
                {bottomSide()}
                {topSide()}
                {frontSide()}
                {backSide()}
            </View>

            <TouchableOpacity style={{
                padding:10,
                backgroundColor:"blue",
                paddingHorizontal:30,
            }} onPress={()=>{
                scrollUp()
            }} >
                <Text style={{color:"white"}} >Scroll Down</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    rectangle :{
        position: 'absolute',
        left: 0,
        top: 0,
        width:100,
        height:100,
        alignItems:"center",
        justifyContent:"center",
        transform:[
            {perspective:1000}
        ]
    }
})