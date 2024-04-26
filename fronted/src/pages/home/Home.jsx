import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";

import LeftHome from "../../components/home/left/LeftHome";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right/RightHome";
import Stories from "../../components/home/stories/Stories";
import "./style.css";
import CreatePost from "../../components/createPost/CreatePost";
import SendVerification from "../../components/home/sendVerification/SendVerification";
import Post from "../../components/post/Post";
import { HashLoader } from "react-spinners";

const Home = ({ setVisible, posts, loading, getAllPosts }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        {loading ? (
          <div className="sekelton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts.map((post, i) => (
              <Post key={i} post={post} user={user} />
            ))}
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
