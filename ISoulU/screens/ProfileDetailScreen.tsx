import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // 引入二维码库
import Icon from 'react-native-vector-icons/Ionicons'; // 导入图标库

interface ProfileDetailScreenProps {
    navigation: any;
}

const ProfileDetailScreen: React.FC<ProfileDetailScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'qrcode'>('profile'); // 当前活动区域

    // 随机生成的二维码数据
    const generateRandomQRCode = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* 返回按钮和顶部 Tab 切换区域 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back-outline" size={24} color="#6C63FF" />
                </TouchableOpacity>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'profile' && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab('profile')}
                    >
                        <Text style={activeTab === 'profile' ? styles.activeTabText : styles.tabText}>
                            Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'qrcode' && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab('qrcode')}
                    >
                        <Text style={activeTab === 'qrcode' ? styles.activeTabText : styles.tabText}>
                            QR Code
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 显示的内容 */}
            {activeTab === 'profile' ? (
                <View style={styles.profileContent}>
                    <Text style={styles.profileItem}>ID: 42589036708</Text>
                    <Text style={styles.profileItem}>Age: 27</Text>
                    <Text style={styles.profileItem}>Height: 163 cm</Text>
                    <Text style={styles.profileItem}>Weight: 51 kg</Text>
                    <Text style={styles.profileItem}>Location: Chengdu</Text>
                    <Text style={styles.profileItem}>Occupation: Designer</Text>
                </View>
            ) : (
                <View style={styles.qrCodeContainer}>
                    <QRCode value={generateRandomQRCode()} size={200} />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'transparent',
    },
    activeTab: {
        borderColor: '#6C63FF',
    },
    tabText: {
        fontSize: 18,
        color: '#aaa',
    },
    activeTabText: {
        fontSize: 18,
        color: '#6C63FF',
        fontWeight: 'bold',
    },
    profileContent: {
        alignItems: 'flex-start',
        width: '100%',
    },
    profileItem: {
        fontSize: 18,
        marginBottom: 10,
    },
    qrCodeContainer: {
        marginTop: 20,
    },
});

export default ProfileDetailScreen;
