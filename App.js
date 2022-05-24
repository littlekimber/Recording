import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {Audio} from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'


export default function App() {
  
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState('Hit the button to record');
  const [canRecord, setCanRecord] = useState(true);
  const [canStop, setCanStop] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [canPause, setCanPause] = useState(false);
  const [buttonState, setButtonState] = useState('play');
  async function startRecording() {
    try{
      setCanStop(true);
      setCanPlay(false);
      setButtonState('stop');
      const permisson = await Audio.requestPermissionsAsync();
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
    setButtonState('play');
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
    setCanRecord(false);
    await recordings[recordings.length-1].sound.replayAsync();
    let time = change_duration_number();
    console.log(time);
    setTimeout(()=>{setCanRecord(true)}, time*1000);
    setTimeout(()=>{setCanPause(false)}, time*1000);
    
    setCanPlay(true);
  }

  async function pause(){
    setCanPlay(true);
    setCanPause(false);
    setCanRecord(true);
    await recordings[recordings.length-1].sound.stopAsync();
  }

  function change_duration_number(){
    let seconds = parseInt(recordings[recordings.length-1].duration.slice(-1), 10);
    let ten_seconds = parseInt(recordings[recordings.length-1].duration[2], 10)*10;
    let minutes = parseInt(recordings[recordings.length-1].duration[0] , 10)*60;
    return seconds+ten_seconds+minutes;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* title area */}
      <SafeAreaView>
        <Text className='title' style={styles.title}>
          {message}
        </Text>
      </SafeAreaView>

      {/* recording and stop area, combine recording with stoping in one button */}
      <Button 
        mode="contained" icon={buttonState} onPress={!recording?startRecording:stopRecording} 
        style={styles.button}
        disabled={!canRecord}
      >
        {!recording?'record':'stop'}
      </Button>

      

      <StatusBar style="auto" />

      {/* show duration time */}
     

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
            style={canPlay?styles.image:styles.image_disable}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={pause} disabled={!canPause}>
          <Image
              source={require('./assets/replaystop.png')}
              style={canPause?styles.image:styles.image_disable}
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
    margin:20, 
    width: 200,
    marginTop: 5,
    
  },

  image: {
    width: 50,
    height: 50,
    margin: 12,
    marginBottom: 0,
  },

  image_disable: {
    width: 50,
    height: 50,
    margin: 12,
    marginBottom: 0,
    opacity: 0.2
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
