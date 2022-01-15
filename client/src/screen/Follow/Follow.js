import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs, Card } from "antd";

const Follow = () => {
  const authUser = useSelector(state => state.auth.user);

  const { TabPane } = Tabs;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [authUser._id]);

  return (
    <Tabs className="tabs">
      <TabPane tab="Followers" key="1">
        {authUser.followersId ? (
          authUser.followersId.length === 0 ? (
            <div>
              <p size="small" className="center">
                No Followers Yet
              </p>
            </div>
          ) : (
            authUser.followersId.map((user, i) => {
              return (
                <Card size="small" className="center" key={i}>
                  {`${user.firstName} ${user.lastName}`}
                </Card>
              );
            })
          )
        ) : null}
      </TabPane>
      <TabPane tab="Followings" key="2">
        {authUser.followingId ? (
          authUser.followingId.length === 0 ? (
            <p className="center">No Following Yet</p>
          ) : (
            authUser.followingId.map((user, i) => {
              return (
                <Card size="small" key={i} className="center">
                  {`${user.firstName} ${user.lastName}`}
                </Card>
              );
            })
          )
        ) : null}
      </TabPane>
    </Tabs>
  );
};

export default Follow;
