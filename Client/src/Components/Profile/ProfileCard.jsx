import React from "react";
import { Card, Avatar, Title, Text, Button } from "@mantine/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import ProfileCardBtn from "./ProfileCardBtn";

const ProfileCard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      {auth.user ? (
        <Card
          shadow='sm'
          style={{
            maxWidth: 250,
            margin: "auto",
            marginTop: 40,
            textAlign: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 15,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              size={80}
              radius='xl'
              src={
                auth.user.profile
              }
              alt={"pradeep"}
            />
          </div>
          
          <Title
            order={3}
            orderMd={2}
            style={{ marginBottom: 5 }}
          >
            {auth.user.username ? auth.user.firstname + " " + auth.user.lastname : ""}
          </Title>
          <Text
            size='sm'
            style={{ color: "gray", marginBottom: 10 }}
          >
            {auth.user.username? (`@${auth.user.username}`) : ""}
          </Text>
          {/* <Button
            variant='light'
            onClick={() => { auth.user.username ?
              navigate(`/profile/${auth.user.username}`):navigate();
            }}
          >
            View full Profile
          </Button> */}
          <ProfileCardBtn/>
        </Card>
      ) : (
        <Card
          shadow='sm'
          style={{
            maxWidth: 250,
            margin: "auto",
            marginTop: 40,
            textAlign: "center",
          }}
        >
          <Title
            order={10}
            orderMd={2}
            style={{ marginBottom: 5 }}
          >
            Need to Login/signUp
          </Title>
        </Card>
      )}
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div`
  grid-column: 1;
`;
