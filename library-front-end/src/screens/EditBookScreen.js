import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getBookById, updateBook } from '../services/bookApi';
import Header from '../components/Header';

const EditBookScreen = ({ route, navigation }) => {
    const { bookId } = route.params;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchBook = async () => {
        try {
            const data = await getBookById(bookId);
            setTitle(data.title);
            setAuthor(data.author);
            setGenre(data.genre);
            setYear(String(data.year));
        } catch (error) {
            console.error('Error fetching book:', error);
            Alert.alert('Error', 'Could not fetch book details.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!title || !author || !genre || !year) {
            Alert.alert('Validation Error', 'Please fill all fields.');
            return;
        }
        setUpdating(true);
        try {
            const updatedData = { title, author, genre, year };
            await updateBook(bookId, updatedData);
            Alert.alert('Success', 'Book updated successfully.');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating book:', error);
            Alert.alert('Error', 'Could not update the book.');
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loading} />;
    }

    return (
        <View style={styles.container}>
            <Header title="Edit Book" />
            <View style={styles.form}>
                <TextInput
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Author"
                    value={author}
                    onChangeText={setAuthor}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Genre"
                    value={genre}
                    onChangeText={setGenre}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Year"
                    value={year}
                    onChangeText={setYear}
                    keyboardType="numeric"
                    style={styles.input}
                />
                {updating ? (
                    <ActivityIndicator size="small" />
                ) : (
                    <Button title="Update Book" onPress={handleUpdate} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f2' },
    form: {
        padding: 16,
        marginTop: 16,
        backgroundColor: '#fff',
        marginHorizontal: 16,
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
    loading: {
        marginTop: 20,
    },
});

export default EditBookScreen;
