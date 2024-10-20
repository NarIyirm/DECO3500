import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabaseUrl = 'https://fdeismsluhfvdcmegwqc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZWlzbXNsdWhmdmRjbWVnd3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMjY5NjksImV4cCI6MjA0NDYwMjk2OX0.KQKLW-cHyjSVjpOmK8WgCNY_e1b0ZL6_FwzuZE2M8mA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AddActivityScreen() {
    const navigation = useNavigation(); // 导航钩子

    // 定义输入框的状态
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [summary, setSummary] = useState('');
    const [details, setDetails] = useState('');
    const [locationName, setLocationName] = useState(''); // 地点名称输入框

    // 提交活动数据到后端
    const sendActivityToBackend = async () => {
        if (!name || !time || !locationName) {
            Alert.alert('Missing Fields', 'Please fill all the required fields.');
            return;
        }

        // 活动数据
        const activityData = {
            name,
            time,
            summary,
            details,
            location_name: locationName, // 只提交地点名称
            created_at: new Date().toISOString(), // 创建时间
        };

        try {
            const { data, error } = await supabase.from('activities').insert([activityData]);
            if (error) {
                console.error('Error:', error);
                Alert.alert('Failed to Add Activity', 'An error occurred while saving the activity.');
            } else {
                Alert.alert('Activity Added', 'The activity was added successfully!');
                navigation.goBack(); // 返回上一页
            }
        } catch (err) {
            console.error('Error sending activity:', err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create New Activity</Text>

            <TextInput
                style={styles.input}
                placeholder="Activity Name (Required)"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Activity Time (YYYY-MM-DD HH:mm) (Required)"
                value={time}
                onChangeText={setTime}
            />

            <TextInput
                style={styles.input}
                placeholder="Location Name (Required)"
                value={locationName}
                onChangeText={setLocationName}
            />

            <TextInput
                style={styles.input}
                placeholder="Activity Summary"
                value={summary}
                onChangeText={setSummary}
            />

            <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Activity Details"
                value={details}
                onChangeText={setDetails}
                multiline
            />

            <View style={styles.buttonContainer}>
                <Button title="Add Activity" onPress={sendActivityToBackend} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top', // 多行文本从顶部开始输入
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
