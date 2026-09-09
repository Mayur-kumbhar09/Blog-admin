import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayProfileImg = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeUrl = "";

    axios
      .get("http://localhost:5000/api/profiledata", { responseType: "blob" })
      .then(async (res) => {
        // Safety Fallback: Check if backend returned text error hidden in a blob shell
        if (
          res.data.type === "text/html" ||
          res.data.type === "application/json"
        ) {
          const textError = await res.data.text();
          console.error(
            "Backend sent an error description text string instead of image file:",
            textError,
          );
          setLoading(false);
          return;
        }

        const objectUrl = URL.createObjectURL(res.data);
        activeUrl = objectUrl;
        setAvatarUrl(objectUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Axios network connection failed completely:", err);
        setLoading(false);
      });

    return () => {
      if (activeUrl) URL.revokeObjectURL(activeUrl);
    };
  }, []);

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={styles.avatarPlaceholder}>...</div>
      ) : avatarUrl ? (
        <img src={avatarUrl} alt="User Avatar" style={styles.avatar} />
      ) : (
        <div style={styles.avatarPlaceholder}>U</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #ccc",
  },
  avatarPlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    color: "#555",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    border: "2px solid #ccc",
  },
};

export default DisplayProfileImg;
