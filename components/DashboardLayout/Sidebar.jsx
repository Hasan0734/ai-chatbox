import React, {Fragment, useState} from "react";
import SidebarItems from "@/components/DashboardLayout/SidebarItems";
import {ChevronLeft, ChevronRight} from "lucide-react";


const Sidebar = ({
                     closeSidebar,
                     setCloseSidebar,
                     onChatSelect,
                     handleNewChatProp,
                     fetchChats,
                     chats,
                     newChat, selectedChat
                 }) => {

    // Function to handle the selected chat from SidebarItems
    const handleChatSelect = (chat) => {
        onChatSelect(chat);
    };
    return (
        <div className={"relative"}>
            <div
                className={`hidden md:fixed md:inset-y-0 md:z-50 md:flex
           md:w-72 md:flex-col relative duration-200 ${
                    closeSidebar ? "-translate-x-[250px]" : "translate-x-0"
                }`}
            >
                {/* DashboardLayout component, swap this element with another sidebar if you like */}
                <div className={`flex h-full w-full`}>
                    <div className={`h-full  relative w-full`}>
                        <SidebarItems
                            onChatSelect={handleChatSelect}
                            handleNewChatProp={handleNewChatProp}
                            fetchChats={fetchChats}
                            chats={chats}
                            newChat={newChat}
                            selectedChat={selectedChat}
                        />
                    </div>
                    {/*</Transition>*/}

                    <div className={"flex items-center bg-gray-800"}>
                        <div>
                            <div
                                onClick={() => setCloseSidebar(!closeSidebar)}
                                className="flex h-[72px] w-8 items-center justify-center group cursor-pointer"
                            >
                                <div className="">
                                    {!closeSidebar && (
                                        <div className="group-hover:hidden h-6 w-1 rounded-full bg-gray-200"></div>
                                    )}
                                    {!closeSidebar && (
                                        <ChevronLeft
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="Open sidebar"
                                            className={`group-hover:block hidden w-9 h-9 text-gray-900`}
                                        />
                                    )}
                                    <ChevronRight
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Close sidebar"
                                        className={`${
                                            closeSidebar ? "block" : "hidden"
                                        } w-9 h-9 text-gray-900`}
                                    />
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
