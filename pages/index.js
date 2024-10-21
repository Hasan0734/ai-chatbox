import React, { useState, useRef, useEffect } from "react";
import MessageTextBox from "@/components/MessageTextBox";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Image from "next/image";


export default function Home() {
  const [selectedChat, setSelectedChat] = useState();
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [newChat, setNewChat] = useState();
  const [chats, setChats] = useState([]);


  // Function to handle the selected chat
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.id);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to fetch messages
  const fetchMessages = async (chatId) => {
    // try {
    //   const response = await axios.get(`/api/messages/${chatId}`);
    //   const { messages } = response.data;
    //   if (messages && messages.length > 0) {
    //     setMessages(messages);
    //   } else {
    //     setMessages([]);
    //   }
    // } catch (error) {

    //   console.error("Error fetching messages:", error);
    // }
  };

  const sendMessage = async ({message, source,}) => {
    try {
      const userMessage = {role: "user", text: message};
      setMessages((prevMessages) =>
          prevMessages ? [...prevMessages, userMessage] : [userMessage]
      );


      let chat = {
        id: undefined
      }
      if (selectedChat === "new") {
        // Call the API endpoint to create a new chat
        // const response = await axios.post("/api/chat");
        // chat = response.data?.chat
        // if (response?.data) {
        //   setSelectedChat(response.data?.chat);
        //  await fetchChats()

        // }
        console.log("New")
      }
      // Send the message and source to the server
      // const response = await axios.post(`/api/messages/${selectedChat?.id || chat?.id}`, {
      //   message,
      //   source,
      // });
      setIsBotTyping(true);


      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {role: "assistant", text: chatbotResponse},
      // ]);

      // Scroll to the bottom immediately after adding a new message
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }
      // Dismiss loading indicator

    } catch (error) {
 
      console.error("Error sending message:", error);
      // Dismiss loading indicator on error

    }
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <Box key={index} className="flex  mb-4">
        {message.role === "assistant" ? (
          <Box className="relative flex p-2 bg-green-50 gap-2 rounded-md">
            <Avatar sx={{ ml: "0" }}>
              <Image src="/bot.png" alt="bot" width={30} height={30} />
            </Avatar>

            <Box className="flex flex-col relative">
              <span className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                Pakistan Law
              </span>

              <Typography
                variant="body1"
                className="font-bold"
                sx={{
                  paddingTop: "25px",
                  textAlign: "justify",
                  lineHeight: "1.6",
                }}
                dangerouslySetInnerHTML={{
                  __html: message.text.replace(/\n/g, "<br>"),
                }}
              ></Typography>
              <button
                className="absolute top-0 right-0 m-0 p-0 bg-white rounded-full hover:bg-gray-100"
                onClick={() => handleCopy(message.text)}
                title="Copy to Clipboard"
                style={{
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  padding: "5px",
                  borderRadius: "50%",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src="/copy.png"
                  alt="Copy"
                  className="h-5 w-5 text-gray-600"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </Box>
          </Box>
        ) : (
          <Box className=" p-2 bg-blue-50  rounded-md">
            <Box className={"flex items-center gap-2"}>
              <div className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center">
                {getUserInitials()}
              </div>
              <Typography className="font-bold">You</Typography>
            </Box>

            <Box className="flex flex-col">
              <Typography
                variant="body1"
                className="font-bold"
                sx={{ paddingTop: "8px", paddingLeft: "35px" }}
              >
                {message.text}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    ));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Optionally, you can show a toast message indicating successful copy

  };

  const getUserInitials = () => {
    // Assuming you have access to the user object
    const { firstName, lastName } = user;
    let initials = "";

    if (firstName) initials += firstName[0].toUpperCase();
    if (lastName) initials += lastName[0].toUpperCase();

    return initials;
  };
  const fetchChats = async () => {
    try {

      setChats([]);
    } catch (error) {
      console.error("Error fetching chats:", error);

    }
  };
  const handleNewChat = async () => {
    try {
      handleChatSelect("new");
    } catch (error) {
      console.error("Error creating new chat:", error);

    } finally {
     await fetchChats();
    }
  };


  return (
    <DashboardLayout
      onChatSelect={handleChatSelect}
      handleNewChatProp={handleNewChat}
      fetchChats={fetchChats}
      chats={chats}
      newChat={newChat}
      selectedChat={selectedChat}

    >
      <div className="px-4 sm:px-6 lg:px-8 relative h-full max-w-4xl mx-auto">
        <div
          className="relative top-20 md:top-12 overflow-y-auto h-[calc(100vh-15rem)]"
          style={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
            }
            /* Hide scrollbar for Firefox */
            div::-webkit-scrollbar-track {
              -webkit-box-shadow: none !important;
              background-color: transparent !important;
            }
          `}</style>
          <div className="space-y-5">
            {selectedChat ? (
              <div>
                {messages && messages.length > 0 ? (
                  <div>{renderMessages()}</div>
                ) : (
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">
                      How can I help you?
                    </h1>
                    <p className="text-lg text-gray-400">
                      Feel free to ask. I'm here to assist you.
                    </p>
                   
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  How can I help you?
                </h1>
                <p className="text-lg text-gray-600">
                  Feel free to ask. I'm here to assist you.
                </p>
                <div className="bg-gray-100 text-black rounded-lg px-4  py-8 text-center mt-20">
                
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-20 md:px-24 rounded-lg text-lg"
                    onClick={handleNewChat}
                  >
                    New Chat
                  </button>
                </div>
               
              </div>
            )}
          </div>
          {selectedChat && <MessageTextBox onSend={sendMessage} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
