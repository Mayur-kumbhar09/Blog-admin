import React, {
  createContext,
  useContext,
  useState,
} from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // ==========================================
  // SET ALL POSTS
  // ==========================================

  const setAllPosts = (data) => {
    setPosts(data || []);
  };

  // ==========================================
  // UPDATE POST
  // ==========================================

  const updatePost = (updatedPost) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        String(post.key ?? post.id) ===
        String(updatedPost.key ?? updatedPost.id)
          ? {
              ...post,
              ...updatedPost,
            }
          : post
      )
    );
  };

  // ==========================================
  // MOVE TO TRASH
  // ==========================================

  const trashNews = (postKey) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        String(post.key ?? post.id) ===
        String(postKey)
          ? {
              ...post,
              status: "Trash",
            }
          : post
      )
    );
  };

  // ==========================================
  // MOVE TO DRAFT
  // ==========================================

  const draftNews = (postKey) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        String(post.key ?? post.id) ===
        String(postKey)
          ? {
              ...post,
              status: "Draft",
            }
          : post
      )
    );
  };

  // ==========================================
  // DELETE POST
  // ==========================================

  const deletePost = (postKey) => {
    setPosts((previousPosts) =>
      previousPosts.filter(
        (post) =>
          String(post.key ?? post.id) !==
          String(postKey)
      )
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        setAllPosts,
        updatePost,
        trashNews,
        draftNews,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// ==========================================
// CUSTOM HOOK
// ==========================================

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error(
      "usePost must be used inside PostProvider"
    );
  }

  return context;
};

export default PostContext;
