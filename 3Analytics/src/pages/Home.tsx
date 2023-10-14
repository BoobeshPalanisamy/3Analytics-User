import { Component } from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { getMessages, getUser, sendMessage } from "../services/api";
import {
  IChatUser,
  IGetMessages,
  ISendMessage,
  IUser,
} from "../interface/types";
import { useAuthContext } from "../context/AuthContext";

// Define the state and props types for the Home component
type HomeState = {
  messagesData: IGetMessages[];
  users: IChatUser[];
  selectedUser: string;
  textMessage: string;
};
type HomeProps = {
  user: IUser | null;
};

// Create the Home class component
export class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      messagesData: [],
      users: [],
      selectedUser: "",
      textMessage: "",
    };
  }

  // Handler for when a user is clicked
  handleUserClick(user: IChatUser) {
    this.setState({ selectedUser: user._id });
  }

  componentDidMount() {
    // Fetch the list of users when the component mounts
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      // Fetch user data based on the logged-in user
      const userData = await getUser(this.props.user?.userId!);
      this.setState({ users: userData });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async fetchMessages() {
    try {
      // Fetch messages between the logged-in user and the selected user
      const messagesData = await getMessages(
        this.props.user?.userId!,
        this.state.selectedUser
      );
      this.setState({ messagesData });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  async sendMessage() {
    try {
      // Compose and send a message
      const messageToSend = {
        sender: this.props.user?.userId!,
        receiver: this.state.selectedUser,
        content: this.state.textMessage,
      } as ISendMessage;
      await sendMessage(messageToSend);
      this.setState({ textMessage: "" });
      await this.fetchMessages();
    } catch (error) {
      console.error("Error send messages:", error);
    }
  }

  componentDidUpdate(_prevProps: HomeProps, prevState: HomeState) {
    if (prevState.selectedUser != this.state.selectedUser) {
      // When the selected user changes, fetch messages for the new user
      this.fetchMessages();
    }
  }

  render() {
    const { messagesData, users } = this.state;

    return (
      <div>
        <Container sx={{ backgroundColor: "#ede8e8", height: "70vh" }}>
          <Grid container spacing={2} height={"100%"}>
            <Grid item md={4} sx={{ height: "100%", overflowY: "auto" }}>
              {users.map((user: IChatUser, index: number) => (
                <Box onClick={() => this.handleUserClick(user)}>
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      my: 3,

                      backgroundColor:
                        this.state.selectedUser == user._id ? "green" : "",
                      color:
                        this.state.selectedUser == user._id ? "white" : "black",
                    }}
                  >
                    {user.name}
                  </Paper>
                </Box>
              ))}
            </Grid>
            <Grid item md={8} height={"100%"}>
              <Paper sx={{ height: "80%", overflowY: "auto" }} elevation={0}>
                {messagesData.map((message: IGetMessages, index: number) => (
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent:
                        this.props.user?.userId == message.sender
                          ? "flex-end"
                          : "flex-start",
                      backgroundColor:
                        this.props.user?.userId == message.sender
                          ? "#e6fdd6"
                          : "white",
                      color: "black",
                    }}
                    p={1}
                    m={2}
                    key={index}
                    component={"span"}
                  >
                    {message.content}
                  </Typography>
                ))}
              </Paper>
              <Box>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item md={10} sx={{ marginTop: "20px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      placeholder="Send Message"
                      focused
                      value={this.state.textMessage}
                      onChange={(e) =>
                        this.setState({ textMessage: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item md={2}>
                    <Box sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => this.sendMessage()}>
                        <SendIcon color="primary" />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

// Create a functional component that wraps the Home component with user context
export default function () {
  const { user } = useAuthContext();

  return <Home user={user} />;
}
