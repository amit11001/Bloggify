// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/posts');
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts", error);
            }
        };
        fetchPosts();
    }, []);

return (
    <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Latest Articles</h1>
        
        {posts.length === 0 ? (
            <div className="text-center mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No articles yet.</h2>
                <p className="text-gray-500 mb-6">Be the first to share your thoughts!</p>
                <Link to="/create" className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition">
                    Write an Article
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link to={`/post/${post._id}`} key={post._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition block cursor-pointer">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
                        <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
                        <span className="text-sm text-gray-500 font-medium">By {post.author?.username || 'Unknown Author'}</span>
                    </Link>
                ))}
            </div>
        )}
    </div>
);
};

export default Home;