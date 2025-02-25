import React, { useEffect, useState } from "react";
import { getMastodonPosts } from "../services/api";

const LiveFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            console.log("🔍 Fetching data from API...");
            try {
                const data = await getMastodonPosts();
                console.log("✅ API Response:", data);
                setPosts(data);
            } catch (error) {
                console.error("❌ Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        const interval = setInterval(fetchData, 1000); // Fetch every 1 seconds
        return () => clearInterval(interval); // Cleanup
    }, []);

    return (
        <div className="feed-container">
            <h2 className="sub-title">Mastodon Live Feed</h2>  {/* Show only once */}
            {loading ? (
                <p>Loading...</p>
            ) : posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map((post, index) => (
                    <div key={index} className="post-card">
                        <div className="post-header">@{post.username}</div>
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                        <div className="post-footer">{new Date(post.created_at).toLocaleString()}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default LiveFeed;
