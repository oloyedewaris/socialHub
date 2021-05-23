import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs, Card } from "antd";
import Wrapper from "../../hoc/navWrapper";

const Follow = () => {
  const authUser = useSelector(state => state.auth.user);

  const { TabPane } = Tabs;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [authUser._id]);

  return (
    <Wrapper>
      <Tabs className="tabs">
        <TabPane tab="Followers" key="1">
          {authUser.followers ? (
            authUser.followers.length === 0 ? (
              <div>
                <p size="small" className="center">
                  No Followers Yet
                </p>
              </div>
            ) : (
              authUser.followers.map((user, i) => {
                return (
                  <Card size="small" className="center" key={i}>
                    {user}
                  </Card>
                );
              })
            )
          ) : null}
        </TabPane>
        <TabPane tab="Followings" key="2">
          {authUser.following ? (
            authUser.following.length === 0 ? (
              <p className="center">No Following Yet</p>
            ) : (
              authUser.following.map((user, i) => {
                return (
                  <Card size="small" key={i} className="center">
                    {user}
                  </Card>
                );
              })
            )
          ) : null}
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};

export default Follow;
