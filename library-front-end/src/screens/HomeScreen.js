import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { getAllBooks } from '../services/bookApi';
import BookCard from '../components/BookCard';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await getAllBooks();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const renderItem = ({ item }) => (
        <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetails', { bookId: item._id })}
        />
    );

    return (
        <View style={styles.container}>
            <Header title="Library" onRefresh={fetchBooks} />
            <View style={styles.buttonRow}>
                <Button title="Add Book" onPress={() => navigation.navigate('AddBook')} />
                <Button title="Search" onPress={() => navigation.navigate('Search')} />
            </View>
            {loading ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f2' },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    loading: { marginTop: 20 },
    listContainer: {
        paddingBottom: 20,
    },
});

export default HomeScreen;
