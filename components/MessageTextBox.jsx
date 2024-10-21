import { ArrowUp, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const MessageTextBox = ({ onSend }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null);
  // const handleKeyDown = (e) => {
  //   // Check if the pressed key is "Enter" (keyCode 13)
  //   if (e.key === "Enter") {
  //     e.preventDefault(); // Prevent default behavior (new line)
  //     handleSend(); // Send the message
  //   }
  // };
  // const handleSend = () => {
  //   if (selectedSource.trim() === "") {
  //     return;
  //   }
  //   if (value.trim() === "") {
  //     return;
  //   }

  //   // Send the message
  //   onSend({ message: value, source: selectedSource });

  //   // Clear the textarea value
  //   setValue("");
  // };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Submitted message:', message)
      // Here you would typically send the message to your backend or chat service
      setMessage('')
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])




  return (
    <div className="fixed bottom-5 left-0 right-0 md:left-[18rem] px-4  pt-1">
      <div className="max-w-4xl mx-auto lg:px-4 2xl:px-8">
       
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative">
          <textarea
            ref={textareaRef}
            className={cn("w-full p-4 pr-16 resize-none border text-white bg-gray-800 border-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-hidden ", {
             "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-none scrollbar-thumb-rounded-full scrollbar-track-rounded-full" :textareaRef.current?.scrollHeight >= 201
            })}
            rows={1}
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            style={{ minHeight: '60px', maxHeight: '200px' }}
            aria-label="Message input"
          />
          <Button
            size="icon"
            type="submit"
            className={`absolute right-2 bottom-3`}
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <Send className="w-6 h-6" />
          </Button>
        </div>
      </form>

      </div>
    </div>
  );
};

export default MessageTextBox;




 {/* <div className="relative">


          <textarea
            onChange={(e) =>
              setValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            value={value}
            placeholder="Message"
            ref={inputRef}
            rows={1}
            className="py-3 h-[54px] max-h-[200px] pr-[48px] rounded-2xl placeholder:text-lg text-lg resize-none lex w-full border border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-1 disabled:cursor-not-allowed disabled:opacity-50  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-none overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          />

          <span className="absolute bottom-4 right-3 flex items-center">
            <button
              onClick={handleSend}
              disabled={!value}
              className="bg-black p-1 rounded-md disabled:opacity-30"
            >
              <ArrowUp className="text-white" />
            </button>
          </span>
        </div>
        <div className="relative px-2 py-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]"></div> */}