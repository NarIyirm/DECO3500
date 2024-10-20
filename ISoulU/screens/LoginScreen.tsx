import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

interface LoginScreenProps {
    navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/background.jpg')} // 替换为你的背景图路径
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.logo}>ISoulU</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 30,
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
});

export default LoginScreen;
