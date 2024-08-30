"use client";

import { useEffect, useState, useMemo } from "react";

import PromptCard from "./PromptCard";
import SearchBar from "./SearchBar";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data[0].map((post) => (
        <PromptCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.creator.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, searchTerm]);

  return (
    <section className="feed">
      <SearchBar onSearch={setSearchTerm} />

      <PromptCardList data={[filteredPosts]} handleTagClick={() => {}} />
    </section>
  );
};
export default Feed;
