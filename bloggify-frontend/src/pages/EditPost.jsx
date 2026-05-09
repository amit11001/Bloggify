// src/pages/EditPost.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch the existing post data when the page loads
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post data", error);
                alert("Could not load post data.");
                navigate('/');
            }
        };
        fetchPost();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Send the PUT request with the updated data
            await api.put(`/posts/${id}`, { title, content });
            navigate(`/post/${id}`); // Redirect back to the updated post page
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to update post.');
        }
    };

    if (loading) return <div className="text-center mt-20 text-xl">Loading editor...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-sm rounded-lg border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Article</h1>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full text-2xl px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-black"
                        required 
                    />
                </div>
                <div className="mb-6">
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className="w-full h-64 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                        required 
                    />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition">
                        Save Changes
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate(`/post/${id}`)}
                        className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;