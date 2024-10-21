
import React, {Fragment, useState} from 'react'

import SidebarSmall from "@/components/DashboardLayout/SidebarSmall";
import Sidebar from "@/components/DashboardLayout/Sidebar";
import Navbar from "@/components/DashboardLayout/Navbar";



export default function DashboardLayout({ children, onChatSelect,handleNewChatProp,
    fetchChats,
    chats,
    newChat, selectedChat}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [closeSidebar, setCloseSidebar] = useState(false);

    // Function to handle the selected chat from Sidebar
    const handleChatSelect = (chat) => {
        onChatSelect(chat);
    };

    return (
        <>
            <SidebarSmall
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onChatSelect={handleChatSelect}
                handleNewChatProp={handleNewChatProp}
                fetchChats={fetchChats}
                chats={chats}
                newChat={newChat}
                selectedChat={selectedChat}
            />

            {/*Static sidebar for desktop*/}
            <Sidebar
                closeSidebar={closeSidebar}
                setCloseSidebar={setCloseSidebar}
                onChatSelect={handleChatSelect}
                handleNewChatProp={handleNewChatProp}
                fetchChats={fetchChats}
                chats={chats}
                newChat={newChat}
                selectedChat={selectedChat}
            />

            <div className={`${closeSidebar ? '' : 'md:pl-72'} flex flex-col h-[100dvh]`}>
                <div className='flex-grow-0'>

                    <Navbar
                        handleNewChatProp={handleNewChatProp}
                        setSidebarOpen={setSidebarOpen}
                    />
                </div>
                <main className="py-5 bg-gray-900 grow">
                    {children}
                </main>
            </div>

        </>
    )
}