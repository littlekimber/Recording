# Recording

## User Interface

<img src='https://user-images.githubusercontent.com/100450092/169945318-edca1e7b-d481-4ec7-beb7-63a3b00912de.png' width='300px' height='400px'>

## Introduction 

1. **Initial state:** When the user enter the app, user can only click record button. The play and pause button is **disabled** because there are no recordings that can be played.
2. **Recording:** The record button is **combined** with the stop button. When the user click the record button, it will turn into stop button. And it will turn back to record button when the user click the stop button.
3. **Play and Pause:** The play button will be enabled after the user finishes the recording while the pause button remains disabled. When the user clickes the play button, the pause button will be enabled. The record button will be disabled while playing the recording and be enabled after the playing of the recording.

## Corner case 
1. **Moving background:** If there are other actions(ex: a phone call) on the phone and the user move the recorder to the background. The recorder will automatically stop.
**Future improvement:** Although the recorder will stop and there is no error, the UI will remain its state before it was removed to the background. An initalization of the UI will be an ideal solution. I will implement this on the future.
2. **Bluetooth and earphone disconnect:** If the user are using a bluetooth device or an earphone. The recorder will **automatically stop** if that bluetooth device or that earphone disconnectes.
3. **Operating system:** This app has only been tested on ioc, no android. 
4. **Storage:** I don't figure out how the phone will do to the recording, so I just keep one recording at all the time to prevent the problem of no memory space. 
5. **Current timer:** The option task is to set a timer to show how long it has recorded. Now I only implement show the duration after the recording finished. 
6. **App killed:** If the user just shutdown the app, it will return its **initial state** the next time it's used. Meanwhile, recording will be **cleaned**.


