import React, { useEffect, useState, useRef } from "react";
import { Avatar, Row, Col } from "antd";

function Message(props) {
  const [gif, setGif] = useState([]);

  useEffect(() => {
    setGif([]);
    setGif((gif) =>
      gif.concat(
        <img
          src={props.imageURL}
          width={"200vw"}
          height={"100%"}
          style={{ borderRadius: 5 }}
          alt={props.alt}
          onError={(err) => {
            if (props.imgError) {
              props.imgError(true);
            }
          }}
          onLoad={() => {
            if (props.imgError) {
              props.imgError(false);
            }
          }}
        />
      )
    );
  }, [props, props.alt, props.imageURL]);

  return (
    <div className="message-box" style={{ marginLeft: 0, display: "grid" }}>
      <div
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 0,
          paddingBottom: 0,
        }}>
        {props.showUser && (
          <div style={{ marginTop: 10 }}>
            <Avatar
              size="small"
              src={`https://avatars.dicebear.com/v2/human/${props.user}.svg`}
            />{" "}
            {props.user}
          </div>
        )}
        <Row>
          <Col span={24} style={{ display: "flex" }}>
            <div
              style={{
                display: "inline-block",
                wordBreak: "break-word",
                backgroundColor: props.bgcolor,
                background: props.background,
                color: props.color,
                marginTop: 3,
                marginBottom: 3,
                fontWeight: "bold",
                borderRadius: 10,
                //        wordBreak: 'break-all',
                padding: 7,
                borderStyle: "solid",
                borderColor: "#A9A9A9",
                borderWidth: 1,
                width: "10em",
              }}>
              {(() => {
                return (
                  <div>
                    {gif.map((i) => {
                      return i;
                    })}
                    {
                      <div style={{ wordBreak: "break-word", width: "9em" }}>
                        {props.alt}
                      </div>
                    }
                  </div>
                );
              })()}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: 0,
                  fontWeight: "lighter",
                  fontSize: "0.8em",
                }}>
                {props.time}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Message;
