import requests
from config import MASTODON_BASE_URL, MASTODON_ACCESS_TOKEN

# Function to fetch latest public posts from Mastodon
def fetch_mastodon_posts(limit=5):
    try:
        headers = {
            'Authorization': f'Bearer {MASTODON_ACCESS_TOKEN}'
        }
        endpoint = f"{MASTODON_BASE_URL}/api/v1/timelines/public"
        params = {'limit': limit}

        response = requests.get(endpoint, headers=headers, params=params)

        if response.status_code == 200:
            posts = response.json()
            structured_posts = []

            for post in posts:
                structured_posts.append({
                    "username": post["account"]["username"],  # Extract only username
                    "content": post["content"],  # Extract post content
                    "created_at": post["created_at"]  # Extract timestamp
                })

            return structured_posts

        else:
            print(f"❌ API Error: {response.status_code} - {response.text}")
            return []
    except Exception as e:
        print(f"❌ Exception Occurred: {e}")
        return []
