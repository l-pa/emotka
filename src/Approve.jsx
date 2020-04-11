import React, { useState } from "react";
import { Box, Image, Badge, Flex, Button } from "@chakra-ui/core";
import Message from "./Message";

import * as firebase from "firebase";

function moveFbRecord(oldRef, newRef) {
  return Promise((resolve, reject) => {
    oldRef
      .once("value")
      .then((snap) => {
        return newRef.set(snap.val());
      })
      .then(() => {
        return oldRef.set(null);
      })
      .then(() => {
        console.log("Done!");
        resolve();
      })
      .catch((err) => {
        console.log(err.message);
        reject();
      });
  });
}

export default function Approve(props) {
  return (
    <Flex flexDirection="column" alignItems="space-between">
      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
        <Flex flexDirection="column" alignItems="space-between">
          <Message
            color="white"
            background="linear-gradient(to top, #e66465, #9198e5)"
            imageURL={props.item.imageURL}
            audioURL={props.item.audioURL}
            isEmoji={props.item.emote}
            alt={props.item.title}
            user={"Message from"}
            userId={"User ID"}
            time={new Date().toLocaleString()}
            message={props.item.title}></Message>
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              {props.item.NSFW && (
                <Badge rounded="full" px="2" variantColor="pink">
                  NSFW
                </Badge>
              )}
              {props.item.audioURL && (
                <Badge
                  onClick={() => {
                    new Audio(props.item.audioURL).play();
                  }}
                  ml={2}
                  rounded="full"
                  px="2"
                  variantColor="green">
                  Sound
                </Badge>
              )}
              {props.item.emote && (
                <Badge ml={2} rounded="full" px="2" variantColor="blue">
                  Emote
                </Badge>
              )}
            </Box>
            <Box>
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {props.item.title}
              </Box>

              <Box>
                <Box as="span" color="gray.600" fontSize="sm">
                  :
                </Box>
                {props.item.chat}
                <Box as="span" color="gray.600" fontSize="sm">
                  :
                </Box>
              </Box>
            </Box>
            <Flex mt={5} justifyContent="space-between">
              <Button
                onClick={() => {
                  console.log(props.item.id);

                  firebase
                    .database()
                    .ref("emotesToApprove/" + props.item.id)
                    .once("value")
                    .then((res) => {
                      console.log(res.val());
                      firebase
                        .database()
                        .ref("emotes/")
                        .push(res.val())
                        .then((res) => {
                          firebase
                            .database()
                            .ref("emotesToApprove/" + props.item.id)
                            .remove();
                          props.delete(props.item.id);
                        });
                    });
                }}
                variantColor="green"
                size="sm">
                Approve
              </Button>
              <Button
                variantColor="red"
                size="sm"
                onClick={() => {
                  firebase
                    .database()
                    .ref("emotesToApprove/" + props.item.id)
                    .remove();

                  props.delete(props.item.id);
                }}>
                Delete
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
