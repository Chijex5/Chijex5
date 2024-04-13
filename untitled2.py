from gtts import gTTS 
import os 
mytext = input("Text to convert: ") 
myobj = gTTS(text=mytext, lang='GB', slow=False)  
myobj.save("daniel.mp3")
os.system(r'"C:\Program Files\VideoLAN\VLC\vlc.exe"'' daniel.mp3')
