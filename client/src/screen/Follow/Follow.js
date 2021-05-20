import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col } from "antd";
import Loader from "react-loader-spinner";
import { loadUser } from "../../Flux/actions/usersActions";
import Wrapper from "../../hoc/navWrapper";


const Follow = () => {
  const dispatch = useDispatch();
  const getUserLoading = useSelector((state) => state.users.getUserLoading);
  const authUser = useSelector((state) => state.auth.user);
  const currUser = useSelector((state) => state.users.getUser);

  useEffect(() => {
    dispatch(loadUser(authUser.id));
    window.scrollTo(0, 0);
  }, [dispatch, authUser.id]);

  return (
    <Wrapper>
    <div style={{ marginBottom: "10vh" }}>
      {getUserLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader type="Oval" color="#00bfff" height={70} width={70} />
        </div>
      ) : (
        <div>
            <Row gutter={16}>
              <Col>
                <h4 className="center">Followers</h4>
                {currUser.followers ? (
                  currUser.followers.length === 0 ? (
                    <div>
                      <p style={{ padding: "15px" }} className="center">
                        No Followers Yet
                      </p>
                    </div>
                  ) : (
                    currUser.followers.map((user, i) => {
                      return (
                        <div key={i}>
                          <Card>{user}</Card>
                        </div>
                      );
                    })
                  )
                ) : null}
              </Col>
              <Col>
                <h4 className="center">Following</h4>
                {currUser.following ? (
                  currUser.following.length === 0 ? (
                    <div>
                      <p style={{ margin: "15px" }} className="center">
                        No Following Yet
                      </p>
                    </div>
                  ) : (
                    currUser.following.map((user, i) => {
                      return (
                        <div key={i}>
                          <Card className="p-1 fo mx-auto center">{user}</Card>
                        </div>
                      );
                    })
                  )
                ) : null}
              </Col>
            </Row>
        </div>
      )}
    </div>
    </Wrapper>
  );
};

export default Follow;
