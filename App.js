import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://YOUR_BROKER_ADDRESS');

const App = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      client.subscribe('test/topic');
    });

    client.on('message', (topic, message) => {
      setReceivedMessage(message.toString());
    });

    return () => {
      client.end();
    };
  }, []);

  const sendMessage = () => {
    client.publish('test/topic', message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text>MQTT Test App</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send Message" onPress={sendMessage} />
      <Text>Received Message: {receivedMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
});

export default App;
