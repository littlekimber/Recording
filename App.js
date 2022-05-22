import { StatusBar } from 'expo-status-bar';
import {Image, Button, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import AudioRecorderPlayer, { 
  AVEncoderAudioQualityIOSType,
  AVEncodingOption, 
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType, 
 } from 'react-native-audio-recorder-player';

export default function App() {
  const [recording, setRecording] = React.useState();
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Text className='title' style={styles.title}>
          Hit the button to record
        </Text>
      </SafeAreaView>
      <SafeAreaView>
        <Text>
          00:00
        </Text>
      </SafeAreaView>
      <SafeAreaView style={{
        flexDirection: 'row'
      }}>
        <TouchableOpacity onPress={()=>{console.log('recording')}}>
          <Image
            source={require('./assets/start.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{console.log('stop')}}>
          <Image 
            source={require('./assets/stop.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <StatusBar style="auto" />

      <SafeAreaView style={{
        flexDirection: 'row',
        margin: 20
      }}>
        <Text style={styles.text}>start</Text>
        <Text style={styles.text}>stop</Text>
      </SafeAreaView>

      <SafeAreaView style={{
        flexDirection: 'row'
      }}>
        <TouchableOpacity onPress={()=>{console.log('replay music')}}>
          <Image 
            source={require('./assets/replay.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{console.log('replay stop')}} disabled={true}>
          <Image
              source={require('./assets/replaystop.png')}
              style={styles.image}
            />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },

  button: {

  },

  image: {
    width: 50,
    height: 50,
    margin: 12,
    marginBottom: 0
  },

  text: {
    margin: 20,
    marginTop: 0
  },

  title: {
    margin: 30,
    fontSize: 20
  }

});
