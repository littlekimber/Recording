import { StatusBar } from 'expo-status-bar';
import {Image, Button, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Audio} from 'expo-av';




export default function App() {
  
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState('Hit the button to record');
  const [canRecord, setCanRecord] = useState(true);
  const [canStop, setCanStop] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [canPause, setCanPause] = useState(false);

  async function startRecording() {
    try{
      setCanStop(true);
      setCanPlay(false);
      const permisson = await Audio.requestPermissionsAsync();
      console.log(permisson);
      if(permisson.status==='granted'){
        await Audio.setAudioModeAsync({
          allowsRecordingIOS:true,
          playsInSilentModeIOS: true
        });
        setMessage('Start Recording')
        const {recording} = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        )
        setRecording(recording);
      }else{
        setMessage('Please give the permission to record!')
      }
    }catch(error){
      console.error('Failed to start recording', error);
    }
    
  }

  async function stopRecording() {
    setCanRecord(true);
    setCanStop(false);
    setCanPlay(true);
    setCanPause(true);
    setRecording(undefined);
    setMessage('Recording stopped');
    await recording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const {sound, status} = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    }); 
    setRecordings(updatedRecordings);
    recordings.splice(0, 1); // avoid too long array
  }

  function getDurationFormatted(millis){
    const minutes = millis/1000/60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes-minutesDisplay)*60);
    const secondsDisplay = seconds<10?`0${seconds}`:seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  async function replay(){
    setCanPlay(false);
    setCanPause(true);
    await recordings[recordings.length-1].sound.replayAsync();
  }

  async function pause(){
    setCanPlay(true);
    setCanPause(false);
    await recordings[recordings.length-1].sound.stopAsync();
  }
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Text className='title' style={styles.title}>
          {message}
        </Text>
      </SafeAreaView>
      <SafeAreaView>
        <Text>
         
        </Text>
      </SafeAreaView>
      <SafeAreaView style={{
        flexDirection: 'row'
      }}>
        <TouchableOpacity onPress={startRecording}>
          <Image
            source={require('./assets/start.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={stopRecording} disabled={!canStop}>
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
        <Text style={styles.text}>record</Text>
        <Text style={styles.text}>stop</Text>
      </SafeAreaView>

      <SafeAreaView style={{
        flexDirection: 'row',
        margin: 15
      }}>
        <Text>{recordings.length>=1?"Recorded time: "+`${recordings[recordings.length-1].duration}`:"no current recording"}</Text>
      </SafeAreaView>
    

      <SafeAreaView style={{
        flexDirection: 'row'
      }}>
        <TouchableOpacity onPress={replay} disabled={!canPlay}>
          <Image 
            source={require('./assets/replay.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={pause} disabled={!canPause}>
          <Image
              source={require('./assets/replaystop.png')}
              style={styles.image}
            />
        </TouchableOpacity>
      </SafeAreaView>
      

      <SafeAreaView style={{
        flexDirection: 'row',
        margin: 20
      }}>
        <Text style={styles.text}>play</Text>
        <Text style={styles.text}>pause</Text>
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
