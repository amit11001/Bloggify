// src/pages/CreatePost.jsx
import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // The JWT token is automatically sent thanks to our Axios interceptor!
            await api.post('/posts', { title, content });
            navigate('/'); // Redirect to home so they can see their new post
        } catch (error) {
            console.error(error);
            alert('Failed to create post. Are you logged in?');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-sm rounded-lg border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Write a new article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Article Title..." 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full text-2xl px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-black placeholder-gray-400"
                        required 
                    />
                </div>
                <div className="mb-6">
                    <textarea 
                        placeholder="Tell your story..." 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className="w-full h-64 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                        required 
                    />
                </div>
                <button type="submit" className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default CreatePost;