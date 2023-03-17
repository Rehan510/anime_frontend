import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
// import { messageActions } from "redux/slices/message";
import SocketService from "../../../services/sockets.service";
import ChatBoxForm from "./ChatBoxForm";
import io from "socket.io-client";
import { config } from "../../../config/config";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import axios from "axios";
export default function ChatBox({ type }: any) {
  const [progress, setProgress] = useState(0);
  const socket = SocketService.socket;
  console.log(config.PUBLIC_CHAT_ROOM, "TI[S");
  // const user = useAppSelector((state) => state.auth.user);
  // const chat = useAppSelector((state) => state.chat.chats);
  // const guest = useAppSelector((state) => state.user.user);
  // const socket = io('http://localhost:3001/');
  // console.log(socket)
  useEffect(() => {
    const id = localStorage.getItem("userRandomId");
    const randomId = `${Math.floor(100000 + Math.random() * 900000)}`;
    if (!id) {
      localStorage.setItem("userRandomId", randomId);
    }
  }, []);

  // const options = {
  //   onUploadProgress: (progressEvent) => {
  //     const { loaded, total } = progressEvent;
  //     let precentage = Math.floor((loaded * 100) / total);
  //     console.log("options");
  //     console.log(precentage);
  //     if (precentage < 100) {
  //       console.log(precentage);
  //     }
  //   },
  // };
  // const uploadImage = (file:any updateProgress:any) => {
  //   return axios
  //     .post("/api/media_objects", file, options)
  //     .then((response) => response.data.id);
  // };
  const handleSubmit = (values: any) => {
    // values.user = user ? user.username : guest?.name;
    let userDetail = {
      name: `Guest${localStorage.getItem("userRandomId")}`,
      race: "Anime",
      message_type: "message",
    };
    const deviceInfo = window.navigator;
    const user: any = localStorage.getItem("user");

    if (user !== "null") {
      console.log(JSON.parse(user), "userr");
      userDetail = JSON.parse(user);
    }

    console.log(deviceInfo, "info");
    if (values.message) {
      console.log(values, "me");
      socket.emit(config.PUBLIC_CHAT_ROOM, {
        message: values.message,
        user: userDetail,
      });
    }

    // values.id = localStorage.getItem("socketId");
    // SocketService.send(values);
  };
  const hiddenFileInput: any = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    // uploadImage(fileUploaded);
    console.log(fileUploaded, "file");
    // props.handleFile(fileUploaded);
  };
  return (
    <>
      <ChatBoxForm onSubmit={handleSubmit} />

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <>
          <>
            <button onClick={handleClick}>Upload a file</button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </>
          <CircularProgress
            variant="determinate"
            color="secondary"
            value={80}
          />
        </>
      </Grid>
    </>
  );
}
