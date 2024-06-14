import paho.mqtt.client as mqtt
import json
import os

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe("test/topic")

def on_message(client, userdata, msg):
    print(f"Message received: {msg.payload.decode()}")
    data = {"message": msg.payload.decode()}
    with open('/tmp/message.json', 'w') as f:
        json.dump(data, f)
    
    os.system("ls /tmp")
    os.system("free")
    os.system("sudo reboot")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("YOUR_BROKER_ADDRESS", 1883, 60)
client.loop_forever()
