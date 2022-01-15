import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import axios from "axios";

function RecentUsers() {
  const [users, setUsers] = useState([])
  const authToken = useSelector(state => state.auth.token)


  useEffect(() => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": authToken
      }
    };

    axios.get('/api/users/new_users', config)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h2>Recent Users</h2>
      {users.map(user =>
        <Card className="center_card" hoverable>
          <p><Avatar className="center-avatar" size={80}> {user.firstName[0]}</Avatar></p>
          <Card.Meta title={`${user.firstName} ${user.lastName}`} description={user.email} />
        </Card>
      )}
    </div>
  )
}

export default RecentUsers
