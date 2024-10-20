import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

interface ChatScreenProps {
    navigation: any;
}

const chats = [
    {
        id: '1',
        name: 'Eva',
        message: "Hey, Moennig what's up?",
        time: 'Apr 10',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        unreadCount: 2,
    },
];

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inbox</Text>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={() => navigation.navigate('ChatDetail', { name: item.name, avatar: item.avatar })}
                    >
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View style={styles.chatInfo}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.message}>{item.message}</Text>
                        </View>
                        {item.unreadCount > 0 && (
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadText}>{item.unreadCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatInfo: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    message: {
        color: 'gray',
    },
    unreadBadge: {
        backgroundColor: 'red',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    unreadText: {
        color: '#fff',
    },
});

export default ChatScreen;
