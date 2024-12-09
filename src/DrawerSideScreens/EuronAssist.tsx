import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const { GoogleGenerativeAI } = require('@google/generative-ai');

const EuronAssist = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleButtonClick = async () => {
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyDLe2vxHx3h7IlbELD0lIgFlFSAvfrvlzk');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(inputMessage);

      const newMessage = {
        id: messages.length + 1, // Unique ID for the message
        userMessage: inputMessage,
        botResponse: result.response.text(),
      };

      setMessages([...messages, newMessage]); // Add the new message to the list
      setInputMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  const handleTextInput = (text) => {
    setInputMessage(text);
  };

  const renderMessage = ({ item }) => (
    <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
      <Text style={{ fontWeight: 'bold' }}>You:</Text>
      <Text>{item.userMessage}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Euron Assist:</Text>
      <Text>{item.botResponse}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Good Morning, Varun</Text>
        <Text style={{ marginBottom: 20 }}>What can I help you with?</Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Your recent chats</Text>

        {/* FlatList for displaying messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Input and Send Button */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            paddingHorizontal: 10,
            marginRight: 10,
          }}
          placeholder="How can Euron Assist help you today?"
          value={inputMessage}
          onChangeText={handleTextInput}
        />
        <TouchableOpacity
          onPress={handleButtonClick}
          style={{
            backgroundColor: '#007BFF',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EuronAssist;
