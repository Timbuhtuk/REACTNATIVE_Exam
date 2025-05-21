import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    getBooksByAuthor,
    getBooksByGenre,
    getTopBooks,
    getTopBooksByGenre,
    getTopAuthors
} from '../services/bookApi';
import BookCard from '../components/BookCard';
import Header from '../components/Header';

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [mode, setMode] = useState('author'); // Modes: 'author', 'genre', 'top', 'topGenre', 'topAuthors'
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async () => {
        setLoading(true);
        try {
            let data = [];
            if (mode === 'author') {
                data = await getBooksByAuthor(query);
            } else if (mode === 'genre') {
                data = await getBooksByGenre(query);
            } else if (mode === 'top') {
                data = await getTopBooks();
            } else if (mode === 'topGenre') {
                data = await getTopBooksByGenre(query);
            } else if (mode === 'topAuthors') {
                data = await getTopAuthors();
            }
            setResults(data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        if (mode === 'topAuthors') {
            return (
                <TouchableOpacity style={styles.authorCard}>
                    <Text style={styles.authorName}>{item._id}</Text>
                    <Text style={styles.authorRating}>Avg. Rating: {item.avgRating ? item.avgRating.toFixed(1) : '0'}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <BookCard
                book={item}
                onPress={() => navigation.navigate('BookDetails', { bookId: item._id })}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Search Books" />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={
                        mode === 'top' || mode === 'topAuthors'
                            ? 'No query needed'
                            : 'Enter search query'
                    }
                    value={query}
                    onChangeText={setQuery}
                    editable={!(mode === 'top' || mode === 'topAuthors')}
                />
                <View style={styles.buttonRow}>
                    <Button title="By Author" onPress={() => { setMode('author'); setQuery(''); }} />
                    <Button title="By Genre" onPress={() => { setMode('genre'); setQuery(''); }} />
                    <Button title="Top Books" onPress={() => { setMode('top'); setQuery(''); }} />
                </View>
                <View style={styles.buttonRow}>
                    <Button title="Top Books by Genre" onPress={() => { setMode('topGenre'); setQuery(''); }} />
                    <Button title="Top Authors" onPress={() => { setMode('topAuthors'); setQuery(''); }} />
                </View>
                <Button title="Search" onPress={search} />
            </View>
            {loading ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item, index) =>
                        mode === 'topAuthors' ? index.toString() : item._id
                    }
                    renderItem={renderItem}
                    contentContainerStyle={styles.resultsContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
        elevation: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 12,
        borderRadius: 6,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    loading: {
        marginTop: 20
    },
    resultsContainer: {
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    authorCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
    },
    authorName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    authorRating: {
        marginTop: 4,
        fontSize: 16,
        color: '#666',
    },
});

export default SearchScreen;
