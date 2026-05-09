// src/pages/PostDetail.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Get the logged-in user
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                setPost(res.data);
            } catch (error) {
                console.error("Error fetching post", error);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        // Double-check with the user before deleting
        if (window.confirm('Are you sure you want to delete this post? This cannot be undone.')) {
            try {
                await api.delete(`/posts/${id}`);
                navigate('/'); // Send them back to the home page after deletion
            } catch (error) {
                console.error(error);
                alert('Failed to delete the post.');
            }
        }
    };

    if (!post) return <div className="text-center mt-20 text-xl text-gray-500">Loading article...</div>;

    // Check if the logged-in user's ID matches the post author's ID
    const isAuthor = user && user._id === post.author?._id;

    return (
        <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-sm rounded-lg border border-gray-100">
            <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Home</Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <p className="text-sm text-gray-500">
                    By <span className="font-semibold text-gray-800">{post.author?.username || 'Unknown'}</span> on {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {/* ONLY render these buttons if the user is the author */}
                {isAuthor && (
                    <div className="flex space-x-3">
                        <Link 
                            to={`/edit/${post._id}`} 
                            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition"
                        >
                            Edit
                        </Link>
                        <button 
                            onClick={handleDelete}
                            className="text-sm bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md font-medium transition"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            
            <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                {post.content}
            </div>
        </div>
    );
};

export default PostDetail;