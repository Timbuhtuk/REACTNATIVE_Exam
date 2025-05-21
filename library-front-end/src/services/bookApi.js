import api from '../config/axiosConfig';

// Get all books
export const getAllBooks = async () => {
    try {
        const response = await api.get('/books');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get book by ID
export const getBookById = async (id) => {
    try {
        const response = await api.get(`/books/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get books by author
export const getBooksByAuthor = async (authorName) => {
    try {
        const response = await api.get(`/books/author/${encodeURIComponent(authorName)}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get books by genre
export const getBooksByGenre = async (genre) => {
    try {
        const response = await api.get(`/books/genre/${encodeURIComponent(genre)}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get top 10 books
export const getTopBooks = async () => {
    try {
        const response = await api.get('/books/top');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get top 10 books by genre
export const getTopBooksByGenre = async (genre) => {
    try {
        const response = await api.get(`/books/top/genre/${encodeURIComponent(genre)}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get top 3 authors
export const getTopAuthors = async () => {
    try {
        const response = await api.get('/books/top-authors');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a new book (multipart/form-data)
export const addBook = async (bookData) => {
    try {
        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('author', bookData.author);
        formData.append('genre', bookData.genre);
        formData.append('year', bookData.year);
        formData.append('file', {
            uri: bookData.file.uri,
            name: bookData.file.name,
            type: bookData.file.mimeType || 'text/plain',
        });
        const response = await api.post('/books', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            transformRequest: (data) => data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a book
export const updateBook = async (id, data) => {
    try {
        const response = await api.put(`/books/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a book
export const deleteBook = async (id) => {
    try {
        const response = await api.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Rate a book
export const rateBook = async (id, rating) => {
    try {
        const response = await api.post(`/books/${id}/rate`, { rating });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a review to a book
export const addReview = async (id, review) => {
    try {
        const response = await api.post(`/books/${id}/review`, review);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Read book content (get .txt file content)
export const readBook = async (id) => {
    try {
        const response = await api.get(`/books/${id}/read`, { responseType: 'text' });
        return response.data;
    } catch (error) {
        throw error;
    }
};
