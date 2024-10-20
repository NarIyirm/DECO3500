import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // 替换为更稳定的图标库
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabaseUrl = 'https://fdeismsluhfvdcmegwqc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZWlzbXNsdWhmdmRjbWVnd3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMjY5NjksImV4cCI6MjA0NDYwMjk2OX0.KQKLW-cHyjSVjpOmK8WgCNY_e1b0ZL6_FwzuZE2M8mA'; // 请替换为你的 Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

interface HomeScreenProps {
    navigation: any;
}

const REFERENCE_LOCATION = {
    latitude: -27.4859250,
    longitude: 152.9941816,
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Recommend');
    const [activities, setActivities] = useState<any[]>([]);

    const fetchActivities = async () => {
        const { data, error } = await supabase.from('activities').select('*');
        if (error) {
            console.error('Error fetching activities:', error);
            Alert.alert('Error', 'Failed to fetch activities');
        } else {
            setActivities(data);
        }
    };

    useEffect(() => {
        fetchActivities();

        const subscription = supabase
            .channel('activities')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'activities' },
                (payload) => {
                    console.log('Change received!', payload);
                    fetchActivities();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const toRad = (value: number) => (value * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const sortedActivities = () => {
        if (activeTab === 'Recommend') {
            return [...activities].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } else if (activeTab === 'Nearby') {
            return [...activities].sort((a, b) => {
                const distanceA = getDistance(
                    REFERENCE_LOCATION.latitude,
                    REFERENCE_LOCATION.longitude,
                    a.latitude,
                    a.longitude
                );
                const distanceB = getDistance(
                    REFERENCE_LOCATION.latitude,
                    REFERENCE_LOCATION.longitude,
                    b.latitude,
                    b.longitude
                );
                return distanceA - distanceB;
            });
        }
        return activities;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello</Text>
                <Text style={styles.username}>Johnny</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddActivity')}
                    style={styles.addButton}
                >
                    <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#6C63FF" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setActiveTab('Recommend')}>
                    <Text style={[styles.tab, activeTab === 'Recommend' && styles.activeTab]}>
                        Recommend
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Nearby')}>
                    <Text style={[styles.tab, activeTab === 'Nearby' && styles.activeTab]}>
                        Nearby
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {sortedActivities().map((activity) => (
                    <View key={activity.id} style={styles.activityCard}>
                        <Image source={{ uri: activity.image_url }} style={styles.activityImage} />
                        <Text style={styles.activityName}>{activity.name}</Text>
                        <Text style={styles.activitySummary}>{activity.summary}</Text>
                        {activeTab === 'Nearby' && (
                            <Text style={styles.distanceText}>
                                {getDistance(
                                    REFERENCE_LOCATION.latitude,
                                    REFERENCE_LOCATION.longitude,
                                    activity.latitude,
                                    activity.longitude
                                ).toFixed(2)}{' '}
                                km away
                            </Text>
                        )}
                    </View>
                ))}
            </ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    greeting: {
        fontSize: 24,
    },
    username: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    addButton: {
        marginRight: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    tab: {
        fontSize: 18,
        color: 'gray',
    },
    activeTab: {
        color: '#6C63FF',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#6C63FF',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    activityCard: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    activityImage: {
        width: '100%',
        height: 200,
    },
    activityName: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    activitySummary: {
        fontSize: 16,
        marginHorizontal: 10,
        marginBottom: 10,
        color: 'gray',
    },
    distanceText: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 5,
        borderRadius: 5,
        fontSize: 12,
    },
});

export default HomeScreen;
