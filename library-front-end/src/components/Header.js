import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ title, onRefresh }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            {onRefresh && (
                <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
                    <Text style={styles.refreshText}>↻</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#007bff',
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    refreshButton: {
        position: 'absolute',
        right: 16,
        bottom: 20,
        padding: 8,
    },
    refreshText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Header;
