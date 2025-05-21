import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native';
import { getBookById, readBook, deleteBook, rateBook, addReview } from '../services/bookApi';
import Header from '../components/Header';

const BookDetailsScreen = ({ route, navigation }) => {
    const { bookId } = route.params;
    const [book, setBook] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [reading, setReading] = useState(false);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    const fetchBook = async () => {
        try {
            const data = await getBookById(bookId);
            setBook(data);
        } catch (error) {
            console.error('Error fetching book details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRead = async () => {
        setReading(true);
        try {
            const text = await readBook(bookId);
            setContent(text);
        } catch (error) {
            console.error('Error reading book:', error);
        } finally {
            setReading(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this book?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: async () => {
                    try {
                        await deleteBook(bookId);
                        Alert.alert('Success', 'Book deleted.');
                        navigation.goBack();
                    } catch (error) {
                        console.error('Error deleting book:', error);
                        Alert.alert('Error', 'Could not delete the book.');
                    }
                }
            },
        ]);
    };

    const handleRate = async () => {
        if (!rating) {
            Alert.alert('Validation Error', 'Please enter a rating.');
            return;
        }
        try {
            await rateBook(bookId, Number(rating));
            Alert.alert('Success', 'Book rated successfully.');
            fetchBook();
        } catch (error) {
            console.error('Error rating book:', error);
            Alert.alert('Error', 'Could not rate the book.');
        }
    };

    const handleAddReview = async () => {
        if (!review) {
            Alert.alert('Validation Error', 'Please enter a review.');
            return;
        }
        try {
            await addReview(bookId, { author: 'Anonymous', text: review });
            Alert.alert('Success', 'Review added successfully.');
            fetchBook();
            setReview('');
        } catch (error) {
            console.error('Error adding review:', error);
            Alert.alert('Error', 'Could not add the review.');
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
            <Header title={book.title} />
            <ScrollView style={styles.details} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.label}>Author:</Text>
                <Text style={styles.value}>{book.author}</Text>

                <Text style={styles.label}>Genre:</Text>
                <Text style={styles.value}>{book.genre}</Text>

                <Text style={styles.label}>Year:</Text>
                <Text style={styles.value}>{book.year}</Text>

                <Text style={styles.label}>Rating:</Text>
                <Text style={styles.value}>{book.rating.toFixed(1)}</Text>

                <View style={styles.buttonRow}>
                    <Button title="Edit" onPress={() => navigation.navigate('EditBook', { bookId })} />
                    <Button title="Delete" onPress={handleDelete} color="#d9534f" />
                </View>

                <View style={styles.readButtonContainer}>
                    <Button title="Read Book" onPress={handleRead} />
                </View>
                {reading && <ActivityIndicator size="small" style={styles.readingIndicator} />}
                {content ? (
                    <>
                        <Text style={styles.label}>Content:</Text>
                        <View style={styles.contentBox}>
                            <ScrollView>
                                <Text style={styles.contentText}>{content}</Text>
                            </ScrollView>
                        </View>
                    </>
                ) : null}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rate this Book</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter rating (0-10)"
                        keyboardType="numeric"
                        value={rating}
                        onChangeText={setRating}
                    />
                    <Button title="Submit Rating" onPress={handleRate} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Add a Review</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Write your review..."
                        value={review}
                        onChangeText={setReview}
                    />
                    <Button title="Submit Review" onPress={handleAddReview} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loading: { marginTop: 20 },
    details: { padding: 16 },
    contentContainer: { paddingBottom: 20 },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginTop: 12,
    },
    value: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 12,
    },
    readButtonContainer: {
        marginVertical: 12,
    },
    readingIndicator: {
        marginVertical: 10,
    },
    contentBox: {
        maxHeight: 300,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#f9f9f9',
    },
    contentText: {
        fontSize: 16,
        lineHeight: 22,
        color: '#444',
    },
    section: {
        marginTop: 16,
        padding: 8,
        backgroundColor: '#eef',
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 8,
        marginBottom: 8,
        borderRadius: 6,
        fontSize: 16,
    },
});

export default BookDetailsScreen;
