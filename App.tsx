import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

export default function App() {
  const { width, height } = useWindowDimensions()
  const test_image = useImage(require('./assets/Maxwell.png'))
  const playerX = useSharedValue(height / 2 - 75)
  const playerY = useSharedValue(height / 2 - 50)

  const gesture = Gesture.Pan().onUpdate(e => {
    // console.log(e)

    if (e.translationX > 0 && playerX.value + 75 * 2 <= height) {
      playerX.value += 1
    }

    if (e.translationX < 0 && playerX.value >= 0) {
      playerX.value -= 1
    }

    if (e.translationY > 0 && playerY.value + 50 * 2 <= height) {
      playerY.value += 1
    }

    if (e.translationY < 0 && playerY.value >= 0) {
      playerY.value -= 1
    }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Canvas style={{ width: height, height, backgroundColor: 'lightgray' }}>
          <Image image={test_image} width={150} height={100} x={playerX} y={playerY} />
        </Canvas>
        <GestureDetector gesture={gesture}>
          <View style={styles.controls} />
        </GestureDetector>
        {/* <Text>Hello World!</Text> */}
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'darkgray',
    position: 'absolute',
    right: 22,
    bottom: 22
  },
});
