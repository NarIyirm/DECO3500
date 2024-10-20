import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // 引入图标库

interface ChatDetailScreenProps {
    route: any;
    navigation: any;
}

const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({ route, navigation }) => {
    const { name, avatar } = route.params;
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            // 添加用户消息
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');

            // 模拟自动回复
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'This is an auto-reply!', sender: 'bot' },
                ]);
            }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#6C63FF" />
                </TouchableOpacity>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <Text style={styles.title}>{name}</Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.sender === 'user' ? styles.userMessage : styles.botMessage,
                        ]}
                    >
                        <Text style={styles.message}>{item.text}</Text>
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message..."
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    messageContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
    },
    message: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#6C63FF',
        padding: 10,
        borderRadius: 20,
    },
    sendText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ChatDetailScreen;
