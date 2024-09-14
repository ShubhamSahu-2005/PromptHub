"use client"; // Enables Client-side rendering in Next.js

import { useState, useEffect } from "react"; // Import React hooks

import PromptCard from "./PromptCard"; // Import the PromptCard component to display individual prompts

// Component to list and display prompts, accepts data and handleTagClick as props
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id} // Unique key for each PromptCard
          post={post} // Pass each post data as prop to PromptCard
          handleTagClick={handleTagClick} // Pass tag click handler
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]); // State to store all fetched posts

  // Search states
  const [searchText, setSearchText] = useState(""); // State for storing search input
  const [searchTimeout, setSearchTimeout] = useState(null); // State for handling search debounce
  const [searchedResults, setSearchedResults] = useState([]); // State for storing search results

  // Fetch all posts from the API
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt"); // Fetching posts from the API
    const data = await response.json(); // Parsing response data as JSON

    setAllPosts(data); // Storing all posts in state
  };

  // useEffect hook to fetch posts when the component mounts
  useEffect(() => {
    fetchPosts(); // Fetch posts when Feed component mounts
  }, []); // Empty dependency array ensures this runs only once

  // Function to filter prompts based on the search text
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) || // Filter by username
        regex.test(item.tag) || // Filter by tag
        regex.test(item.prompt) // Filter by prompt content
    );
  };

  // Handle search input change with debounce for better performance
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout); // Clear the previous timeout if user is still typing
    setSearchText(e.target.value); // Update search text state

    // Debounce: Set a timeout to wait before performing search
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value); // Filter prompts based on input
        setSearchedResults(searchResult); // Set the filtered results to state
      }, 500) // 500ms debounce
    );
  };

  // Handle tag click to search by the clicked tag
  const handleTagClick = (tagName) => {
    setSearchText(tagName); // Set the clicked tag as search text

    const searchResult = filterPrompts(tagName); // Filter posts by the tag
    setSearchedResults(searchResult); // Set the filtered results to state
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        {/* Search input field */}
        <input
          type='text'
          placeholder='Search for a tag or a username' // Placeholder text for input
          value={searchText} // Bind the input value to searchText state
          onChange={handleSearchChange} // Call handleSearchChange when input changes
          required
          className='search_input peer' // Styling classes
        />
      </form>

      {/* Display either filtered search results or all posts */}
      {searchText ? (
        // If searchText is not empty, show searched results
        <PromptCardList
          data={searchedResults} // Pass searched results to PromptCardList
          handleTagClick={handleTagClick} // Pass tag click handler
        />
      ) : (
        // If no search is active, show all posts
        <PromptCardList
          data={allPosts} // Pass all posts to PromptCardList
          handleTagClick={handleTagClick} // Pass tag click handler
        />
      )}
    </section>
  );
};

export default Feed;
