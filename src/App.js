import React from "react";
import {
  Flex,
  Text,
  Box,
  Button,
  Heading,
  ThemeProvider,
  CSSReset,
  Divider,
  Image,
  Badge,
  Input,
  Stack,
  Icon,
  VisuallyHidden,
  ControlBox,
  Checkbox,
  useToast,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";

import * as firebase from "firebase";

import { FiPlay } from "react-icons/fi";

import { useState, useEffect, useRef } from "react";

import Message from "./Message";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBy3ik-ex6chEZzWP-_ouA0_zRWQoP9xC0",
  authDomain: "emotka-379d7.firebaseapp.com",
  databaseURL: "https://emotka-379d7.firebaseio.com",
  projectId: "emotka-379d7",
  storageBucket: "emotka-379d7.appspot.com",
  messagingSenderId: "710533077954",
  appId: "1:710533077954:web:51e53553f07cf84326945b",
  measurementId: "G-NGDDD37YW4",
});

const database = app.database();
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function ToastExample() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }>
      Show Toast
    </Button>
  );
}

const defaultGif =
  "https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy-downsized.gif";

function App() {
  const [emoteTitle, setEmoteTitle] = useState("");
  const [emoteImageURL, setEmoteImageURL] = useState(defaultGif);

  const [emoteInChat, setEmoteInChat] = useState("");
  const [emoteInChatInvalid, setEmoteInChatInvalid] = useState(false);

  const [emoteImageURLInvalid, setEmoteImageURLInvalid] = useState(false);

  const [emoteHasAudio, setEmoteHasAudio] = useState(false);
  const [emoteAudioURL, setEmoteAudioURL] = useState("");
  const [emoteAudioURLInvalid, setEmoteAudioURLInvalid] = useState(false);

  const [NSFW, setNSFW] = useState(false);
  const [isEmoji, setIsEmoji] = useState(false);

  const [submiting, setSubmiting] = useState(false);

  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const [successVisible, setSuccessVisible] = useState(false);

  const titleRef = useRef();
  const chatEmoteRef = useRef();
  const imageUrlRef = useRef();
  const audioCheckboxRef = useRef();
  const audioUrlRef = useRef();
  const nsfwCheckboxRef = useRef();
  const emojiCheckboxRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    if (!emoteImageURL) {
      setEmoteImageURL(defaultGif);
    }
  }, [emoteImageURL]);

  useEffect(() => {
    setEmailInvalid(!validateEmail(email));
  }, [email]);

  useEffect(() => {
    setEmoteInChat((v) => v.replace(/\s+/g, "-"));
    chatEmoteRef.current.value = emoteInChat;
  }, [emoteInChat]);

  const validate = () => {
    setSuccessVisible(false);
    if (!emoteInChat) {
      console.log("Invalid ::");
      setErrorMessage("Invalid :emote:");
      setErrorMessageVisible(true);
      setEmoteInChatInvalid(true);
      setSubmiting(false);
      return false;
    } else {
      setEmoteInChatInvalid(false);
    }

    if (!emoteAudioURL && emoteHasAudio) {
      console.log("Invalid audio");
      setErrorMessage("Invalid audio");
      setErrorMessageVisible(true);
      setEmoteAudioURLInvalid(true);
      setSubmiting(false);
      return false;
    } else {
      setEmoteAudioURLInvalid(false);
    }
    if (
      !emoteImageURL ||
      emoteImageURL === defaultGif ||
      emoteImageURLInvalid
    ) {
      console.log("Invalid emote url");
      setErrorMessage("Invalid emote url");
      setErrorMessageVisible(true);
      setEmoteImageURLInvalid(true);
      setSubmiting(false);
      return false;
    } else {
      setEmoteImageURLInvalid(false);
    }

    if (emailInvalid || !email) {
      console.log("invalid email ", emailInvalid, email);
      setErrorMessage("Invalid email");
      setErrorMessageVisible(true);
      setEmailInvalid(true);
      setSubmiting(false);
      return false;
    }
    return true;
  };
  return (
    <ThemeProvider>
      <CSSReset />
      <Flex
        flexDirection="column"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center">
        <Box mt={10}>
          <Heading mb={4}>Emotka</Heading>
          <Text fontSize="xl">Submit your emotes to C2G chat!</Text>
          <Divider></Divider>
        </Box>
        {errorMessageVisible && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        {successVisible && (
          <Alert status="success">
            <AlertIcon />
            😂💦💦
          </Alert>
        )}
        <Flex
          mt={3}
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center">
          <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Stack spacing={5}>
                  <Input
                    ref={titleRef}
                    variant="flushed"
                    placeholder="Emote title"
                    onChange={(v) => {
                      setEmoteTitle(v.target.value);
                    }}
                  />
                  <InputGroup size="sm">
                    <InputLeftAddon children=":" />
                    <Input
                      ref={chatEmoteRef}
                      isRequired
                      rounded="0"
                      placeholder="emote"
                      onChange={(v) => setEmoteInChat(v.target.value)}
                      isInvalid={emoteInChatInvalid}
                    />
                    <InputRightAddon children=":" />
                  </InputGroup>
                  <Input
                    ref={imageUrlRef}
                    isRequired
                    isInvalid={emoteImageURLInvalid}
                    variant="flushed"
                    placeholder="Image URL"
                    onChange={(v) => setEmoteImageURL(v.target.value)}
                  />
                  <Box d={"flex"}>
                    <Checkbox
                      ref={audioCheckboxRef}
                      onChange={(v) => setEmoteHasAudio(v.target.checked)}
                      size="lg"
                      variantColor="green"
                      mr={5}></Checkbox>
                    <Input
                      ref={audioUrlRef}
                      isDisabled={!emoteHasAudio}
                      isInvalid={emoteAudioURLInvalid}
                      variant="flushed"
                      placeholder="Audio URL"
                      onChange={(v) => setEmoteAudioURL(v.target.value)}
                    />
                    <Button
                      isDisabled={!emoteHasAudio}
                      rightIcon={FiPlay}
                      variantColor="green"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        try {
                          const a = new Audio(emoteAudioURL);
                          a.onerror = () => {
                            setEmoteAudioURLInvalid(true);
                          };
                          a.play();
                          setEmoteAudioURLInvalid(false);
                        } catch (error) {
                          console.log("catch");
                        }
                      }}></Button>
                  </Box>
                  <Checkbox
                    ref={nsfwCheckboxRef}
                    onChange={(v) => setNSFW(v.target.checked)}
                    size="lg"
                    variantColor="pink">
                    NSFW
                  </Checkbox>
                  <Checkbox
                    ref={emojiCheckboxRef}
                    onChange={(v) => setIsEmoji(v.target.checked)}
                    size="lg"
                    variantColor="green">
                    Emoji
                  </Checkbox>
                  <Divider></Divider>
                  <Input
                    ref={emailRef}
                    isInvalid={emailInvalid}
                    isRequired
                    variant="flushed"
                    placeholder="Email"
                    onChange={(v) => setEmail(v.target.value)}
                  />

                  <Button
                    isLoading={submiting}
                    onClick={() => {
                      setSubmiting(true);
                      if (validate()) {
                        console.log();
                        database.ref("emotesToApprove/").push(
                          {
                            title: emoteTitle,
                            imageURL: emoteImageURL,
                            audioURL: emoteAudioURL,
                            NSFW: NSFW,
                            emote: isEmoji,
                            createdBy: email,
                            time: new Date(),
                          },
                          (err) => {
                            if (err) {
                              setErrorMessage(String(err));
                              setErrorMessageVisible(true);
                              setSubmiting(false);
                            } else {
                              setSubmiting(false);

                              titleRef.current.value = "";
                              chatEmoteRef.current.value = "";
                              imageUrlRef.current.value = "";
                              audioCheckboxRef.current.checked = false;
                              audioUrlRef.current.value = "";
                              nsfwCheckboxRef.current.checked = false;
                              emojiCheckboxRef.current.checked = false;
                              emailRef.current.value = "";

                              setEmoteImageURL(defaultGif);
                              setIsEmoji(false);
                              setEmoteHasAudio(false);
                              setEmoteAudioURL("");
                              setErrorMessage("");
                              setErrorMessageVisible(false);
                              setEmailInvalid(false);
                              setEmoteInChatInvalid(false);
                              setEmoteAudioURLInvalid(false);
                              setEmoteImageURLInvalid(false);

                              setSuccessVisible(true);
                            }
                          }
                        );
                      } else {
                        console.log("error");
                      }
                    }}
                    variantColor="green">
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Message
            link={""}
            imgError={setEmoteImageURLInvalid}
            showUser={false}
            color="white"
            background="linear-gradient(to top, #141e30, #243b55)"
            imageURL={emoteImageURL}
            audioURL={emoteAudioURL}
            isEmoji={isEmoji}
            alt={emoteTitle}
            user={"Message from"}
            userId={"User ID"}
            time={new Date().toLocaleString()}
            message={emoteTitle}></Message>
        </Flex>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
