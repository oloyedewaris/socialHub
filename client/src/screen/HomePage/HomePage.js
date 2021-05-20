import React from "react";
import PostsFeed from "../../components/Posts/PostsFeed";
import Wrapper from "../../hoc/navWrapper";

const HomePage = () => {
  return (
    <div>
      <Wrapper>
        <PostsFeed />
      </Wrapper>
    </div>
  );
};

export default HomePage;
