// eslint-disable-next-line no-unused-vars
import React from "react";
import Container from "./../../../node_modules/react-bootstrap/esm/Container";
// import { Col } from "react-bootstrap";
import AuthUser from "../../Component/Auth/AuthUser";
const ProfilePage = () => {
  const { user } = AuthUser();
  return (
    <div>
      <Container>
        <h1>
          <u>
            <i>
              <b>This is profile page</b>
            </i>
          </u>
        </h1>
        <h2>Name</h2>
        <p>{user.name}</p>

        <h2>Email</h2>
        <p>{user.email}</p>

        <h2>User Id</h2>
        <p>{user.id}</p>
      </Container>
    </div>
  );
};

export default ProfilePage;
