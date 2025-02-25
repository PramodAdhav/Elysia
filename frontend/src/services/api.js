const API_BASE_URL = "http://127.0.0.1:5000"; // Ensure Flask runs on this port

export async function getMastodonPosts() {
    try {
        console.log(`🔍 Fetching from API: ${API_BASE_URL}/api/mastodon`);
        const response = await fetch(`${API_BASE_URL}/api/mastodon`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("✅ API Response:", data);
        return data;
    } catch (error) {
        console.error("❌ Error fetching Mastodon posts:", error);
        return [];
    }
}
