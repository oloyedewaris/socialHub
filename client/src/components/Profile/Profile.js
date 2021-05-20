import React from "react";
import { connect } from "react-redux";

const Profile = props => {
  const { user } = props.auth;
  return (
    <div className="profile">
      {user ? (
        <div>
          <h3 className="profile-name">{`${user.firstName} ${user.lastName}`}</h3>
          <p className="profile-email">{`${user.email}`}</p>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Profile);
