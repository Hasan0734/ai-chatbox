import { PenSquare, MoreHorizontal, Trash } from "lucide-react";
import ProfileDropdown from "@/components/DashboardLayout/ProfileDropdown";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { HomeIcon } from "@heroicons/react/24/outline";

const SidebarItems = ({
  onChatSelect,
  handleNewChatProp,
  fetchChats,
  chats,
  newChat,
  selectedChat,
}) => {
  const [editingChat, setEditingChat] = useState(null); // State to track the chat being edited
  const [newChatName, setNewChatName] = useState("");
  const inputRef = useRef(null);
  const [openPopOver, setOpenPopOver] = useState(null); // State to track
  const popoverRef = useRef(null);

  const handleChatSelect = (chat) => {
    onChatSelect(chat);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      handleChatSelect(newChat);
    }
  }, [newChat]);

  useEffect(() => {
    if (editingChat !== null && inputRef.current !== null) {
      inputRef.current.focus(); // Focus on the input field if it exists
    }
  }, [editingChat]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenPopOver(null);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef]);

  const handleDeleteChat = async (chatId) => {};
  const handleDropdownToggle = (chat) => {
    console.log(chat);
    setNewChatName(chat.name);
    setOpenPopOver(openPopOver === chat?.id ? null : chat?.id);
  };

  const handleUpdateChat = (chat) => {
    setEditingChat(chat?.id);
    handleDropdownToggle(chat);
    inputRef.current.focus();
  };

  const handleRenameChat = async (chatId) => {
    try {
      if (!newChatName) {
        return;
      }

      setEditingChat(null); // Exit editing mode
      setNewChatName(""); // Clear the new chat name input
      fetchChats(); // Fetch updated chats
    } catch (error) {
      console.error("Error updating chat name:", error);
    } finally {
    }
  };
  const groupChatsByDate = () => {
    const groupedChats = {
      today: [],
      yesterday: [],
      past7Days: [],
      past30Days: [],
      lastYear: [],
    };

    const now = new Date();

    chats.forEach((chat) => {
      const createdAt = new Date(chat.createdAt);
      const diffTime = Math.abs(now.getTime() - createdAt.getTime());
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); // Difference in hours

      if (diffHours <= 24) {
        groupedChats.today.push(chat);
      } else if (diffHours <= 48) {
        groupedChats.yesterday.push(chat);
      } else if (diffHours <= 24 * 7) {
        // Within the past 7 days (168 hours)
        groupedChats.past7Days.push(chat);
      } else if (diffHours <= 24 * 30) {
        // Within the past 30 days (720 hours)
        groupedChats.past30Days.push(chat);
      } else {
        groupedChats.lastYear.push(chat);
      }
    });

    return groupedChats;
  };

  const onBlur = (chat) => {
    if (newChatName !== chat?.name) {
      handleRenameChat(chat.id);
    }
    setEditingChat(null);
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 h-full">
      <div className={" mt-5"}>
        <h2 className={"text-lg font-semibold text-white"}>AI</h2>
      </div>

      <div className="-mx-2 space-y-1 mt-5">
        <a
          href="#"
          onClick={handleNewChatProp}
          className="text-gray-400 hover:text-white hover:bg-gray-800 flex items-center justify-between gap-2 group gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
        >
          <span className="flex items-center gap-2">New Chat</span>
          <PenSquare className="h-4 w-4" />
        </a>
      </div>
      <div
        className="flex-grow overflow-y-auto bg-gray-900  pb-20 h-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        style={{ maxHeight: "calc(100vh - 100px)", width: "100%" }}
      >
        <ul className="flex flex-col gap-y-5 mt-3">
          {Object.entries(groupChatsByDate()).map(([group, chats]) => {
            if (chats.length === 0) return null; // If no chats in this group, skip rendering
            let groupName = "";
            switch (group) {
              case "today":
                groupName = "Today";
                break;
              case "yesterday":
                groupName = "Yesterday";
                break;
              case "past7Days":
                groupName = "Previous 7 Days";
                break;
              case "past30Days":
                groupName = "Previous 30 Days";
                break;
              case "lastYear":
                groupName = "Last Year";
                break;
              default:
                groupName = group;
            }
            return (
              <li key={group} className="text-white">
                <h2 className="text-white mt-5 mb-3">{groupName}</h2>
                {chats.reverse().map((chat) => (
                  <div
                    key={chat.id}
                    className={`text-gray-400 cursor-pointer flex items-center justify-between px-4 py-2 gap-1 rounded-md relative mb-3 
                ${
                  selectedChat?.id === chat.id
                    ? "bg-gray-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    {editingChat === chat.id ? (
                      <input
                        onBlur={() => onBlur(chat)}
                        ref={inputRef}
                        type="text"
                        value={newChatName}
                        onChange={(e) => setNewChatName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRenameChat(chat.id);
                          }
                        }}
                        className="text-white bg-transparent outline-none w-full rounded-sm outline-0 placeholder-gray-400
                                                 focus:border focus:border-gray-600"
                        placeholder="Enter new chat name"
                      />
                    ) : (
                      <span className="text-white line-clamp-1">
                        {chat?.name}
                        {/*{chat.name.split(" ").slice(0, 3).join(" ")} {chat.name.split(" ").length > 3 ? "..." : ""}*/}
                      </span>
                    )}
                    <button onClick={() => handleDropdownToggle(chat)}>
                      <MoreHorizontal className="h-5 w-5 text-gray-400 hover:text-white" />
                    </button>
                    {openPopOver === chat?.id && (
                      <div
                        ref={popoverRef}
                        className="absolute right-1 top-1 mt-8 w-40 bg-white rounded-md shadow-lg z-10"
                      >
                        <ul className="py-1">
                          <li
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-start text-black text border-l"
                            onClick={() => handleUpdateChat(chat)}
                          >
                            <PenSquare className="h-4 w-4 mr-2 text-black" />
                            Rename
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-start text-red-600"
                            onClick={() => handleDeleteChat(chat.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="absolute bottom-2 left-2 right-2">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default SidebarItems;
