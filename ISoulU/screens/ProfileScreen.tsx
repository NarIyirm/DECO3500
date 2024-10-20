import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProfileScreenProps {
    navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* Header部分 */}
            <View style={styles.header}>
                <Icon name="person-circle-outline" size={30} color="#fff" />
                <Text style={styles.headerText}>Me</Text>
            </View>

            {/* 用户信息部分 */}
            <View style={styles.profileInfo}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>Moennig</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Icon name="create-outline" size={18} color="#6C63FF" />
                </TouchableOpacity>
            </View>

            {/* 设置列表部分 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Social</Text>
                <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => navigation.navigate('ProfileDetail')} // 跳转逻辑
                >
                    <Icon name="apps-outline" size={24} color="#6C63FF" />
                    <Text style={styles.listItemText}>Profile</Text>
                    <Icon name="chevron-forward-outline" size={24} color="#aaa" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Privacy</Text>
                <TouchableOpacity style={styles.listItem}>
                    <Icon name="person-outline" size={24} color="#6C63FF" />
                    <Text style={styles.listItemText}>Account</Text>
                    <Icon name="chevron-forward-outline" size={24} color="#aaa" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem}>
                    <Icon name="shield-checkmark-outline" size={24} color="#6C63FF" />
                    <Text style={styles.listItemText}>Verification</Text>
                    <Icon name="chevron-forward-outline" size={24} color="#aaa" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem}>
                    <Icon name="ban-outline" size={24} color="#6C63FF" />
                    <Text style={styles.listItemText}>Blacklist</Text>
                    <Icon name="chevron-forward-outline" size={24} color="#aaa" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#C7B8FF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        marginLeft: 10,
    },
    profileInfo: {
        alignItems: 'center', // 水平居中
        marginTop: 30, // 距离顶部一点间隔
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10, // 头像与用户名的间距
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    editButton: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#6C63FF',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listItemText: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
    },
});

export default ProfileScreen;
