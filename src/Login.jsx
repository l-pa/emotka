import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import "firebase/auth";
import {
  Button,
  Text,
  Heading,
  Alert,
  Box,
  AlertIcon,
  Grid,
  Flex,
} from "@chakra-ui/core";
import Approve from "./Approve";

export default function Login(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toApprove, setToApprove] = useState([]);

  const [buttonText, setButtonText] = useState("login");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setToApprove([]);
        setUser(user);
        setButtonText(user.displayName);
        console.log(
          firebase
            .database()
            .ref("emotesToApprove")
            .once("value")
            .then((res) => {
              console.log(res.val());
              const arrayOfObj = Object.entries(res.val()).map((e) => ({
                [e[0]]: e[1],
              }));
              console.log(arrayOfObj);

              setToApprove(Object.values(res.val()));
              setError(false);
            })
            .catch((err) => {
              console.log(err);
              setErrorMessage(String(err));
              setError(true);
            })
        );
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return (
    <Box>
      <Button
        variantColor="green"
        onClick={() => {
          firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result) => {
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              setUser(result.user);
              setButtonText(result.user.displayName);
              setError(false);
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              setErrorMessage(String(error));
              setError(true);
            });
        }}>
        {buttonText}
      </Button>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <Flex justifyContent="center" alignItems="center">
        <Grid templateColumns="repeat(4, 2fr)" gap={12}>
          {toApprove.map((v, i) => {
            return <Approve key={i} item={v} />;
          })}
        </Grid>
      </Flex>
    </Box>
  );
}
