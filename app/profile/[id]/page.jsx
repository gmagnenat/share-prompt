"use client";

import { useState, useEffect, Suspense } from "react";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  console.log(params.id);

  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

  // Fetch the user linked to the post
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/${params?.id}`);
      const data = await response.json();

      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <Profile
      name={userData.username}
      desc={`Welcome to ${userData.username}'s profile.`}
      data={userPosts}
    />
  );
};
export default UserProfile;
