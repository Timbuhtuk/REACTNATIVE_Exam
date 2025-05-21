import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { addBook } from '../services/bookApi';
import Header from '../components/Header';

const AddBookScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: 'text/plain' });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setFile(result.assets[0]);
        } else {
            setFile(null);
        }
    };

    const handleSubmit = async () => {
        if (!title || !author || !genre || !year || !file) {
            Alert.alert('Validation Error', 'Please fill all fields and select a file.');
            return;
        }
        setLoading(true);
        try {
            const bookData = {
                title,
                author,
                genre,
                year,
                file: {
                    uri: file.uri,
                    name: file.name,
                    type: file.mimeType || 'text/plain',
                },
            };
            await addBook(bookData);
            Alert.alert('Success', 'Book has been added!');
            navigation.goBack();
        } catch (error) {
            console.error('Failed to add book:', error);
            Alert.alert('Error', 'Could not add the book.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Add Book" />
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
                <View style={styles.buttonContainer}>
                    <Button title="Select File" onPress={pickFile} />
                </View>
                {file && <Text style={styles.fileName}>{file.name}</Text>}
                <View style={styles.buttonContainer}>
                    {loading ? (
                        <ActivityIndicator size="small" />
                    ) : (
                        <Button title="Add Book" onPress={handleSubmit} />
                    )}
                </View>
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
    buttonContainer: {
        marginVertical: 8,
    },
    fileName: {
        marginTop: 8,
        marginBottom: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#555',
    },
});

export default AddBookScreen;
