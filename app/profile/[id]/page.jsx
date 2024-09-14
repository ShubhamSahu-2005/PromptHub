"use client"; // Enables client-side rendering in Next.js

import { useEffect, useState } from "react"; // Import React hooks
import { useSearchParams } from "next/navigation"; // Import hook to access search parameters

import Profile from "@components/Profile"; // Import Profile component to display user profile and posts

const UserProfile = ({ params }) => {
  // Use the useSearchParams hook to get search parameters from the URL
  const searchParams = useSearchParams();
  // Extract the 'name' parameter from the search parameters
  const userName = searchParams.get("name");

  // State to store the user's posts
  const [userPosts, setUserPosts] = useState([]);

  // useEffect hook to fetch user posts when the component mounts or when params.id changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts for the user with the given ID
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json(); // Parse response data as JSON

        // Update state with the fetched posts
        setUserPosts(data);
      } catch (error) {
        console.error("Failed to fetch user posts:", error); // Log any errors
      }
    };

    // Fetch posts only if params.id is available
    if (params?.id) fetchPosts();
  }, [params.id]); // Dependency array to re-fetch posts when params.id changes

  return (
    <Profile
      name={userName} // Pass the user's name to the Profile component
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`} // Personalized description for the profile page
      data={userPosts} // Pass the user's posts to the Profile component
    />
  );
};

export default UserProfile; // Export UserProfile component for use in other parts of the application
