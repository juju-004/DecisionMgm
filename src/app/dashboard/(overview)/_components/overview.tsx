"use client";

import PageContainer from "@/components/layout/page-container";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Chat() {
  // const ref = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi, I'm your Environmental protection ai. What can i help you with today`,
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setMessage("");
    const newMessage = { role: "user", content: message };
    setMessages([...messages, newMessage]);

    const options = {
      method: "POST",
      url: "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions",
      headers: {
        "x-rapidapi-key": "cb4be639dcmsh1dfcff3554357ddp1daf59jsneeb2f06ca8af",
        "x-rapidapi-host":
          "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          {
            role: "system",
            content:
              "You are an environmental protection chatbot. You only answer questions on weather conditions, disaster management and other environmental issues. Keep your responses short and avoid listing.Be polite.",
          },
          newMessage,
        ],
        model: "gpt-4o",
        max_tokens: 100,
        temperature: 0.9,
      },
    };

    try {
      setLoading(true);
      const { data } = await axios.request(options);
      setLoading(false);

      setMessages([...messages, newMessage, data.choices[0].message]);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // useEffect(() => {
  //   ref.current.scrollTo(0, ref.current.scrollWidth);
  // }, [messages, message]);

  return (
    <>
      <PageContainer scrollable>
        <div className="flex flex-col w-full mx-auto max-w-xl items-start justify-start">
          {messages.map((m, i) =>
            m.role === "system" ? null : (
              <div
                key={i}
                className="flex w-full last:pb-16 flex-col pt-5 gap-1"
              >
                {m.role === "user" && (
                  <span className="bg-slate-500/10 rounded-xl px-4 py-3">
                    <p className="font-semibold">You</p>
                    <span className="mt-1.5 text-sm text-zinc-500">
                      {m.content}
                    </span>
                  </span>
                )}
                {m.role === "assistant" && (
                  <div className="w-full px-4 py-3">
                    <p className="font-semibold">Environmental Bot</p>
                    <div className="mt-2 text-sm text-zinc-500">
                      {m.content}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
          {loading && (
            <div className="w-full px-4 mt-5 pt-3 pb-20">
              <p className="font-semibold">Environmental Bot</p>
              <div className="mt-2 text-sm text-zinc-500">typing...</div>
            </div>
          )}
        </div>
      </PageContainer>
      <div className="flex justify-center relative w-full">
        <form
          className="absolute dark:bg-transparent dark:backdrop-blur-xl bg-white bottom-9 left-1/2 -translate-x-1/2 shadow  flex gap-2 items-center py-1 px-1.5 max-w-xl w-full rounded-3xl"
          onSubmit={handleSubmit}
        >
          <Input
            name="message"
            placeholder="Enter your message here..."
            value={message}
            autoFocus
            className="rounded-2xl"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            disabled={loading}
            className="py-5 disabled:opacity-60 hover:border-0 active:scale-75 hover:opacity-80 opacity-100 scale-100 duration-150 px-4 fx gap-1 rounded-[20px]"
          >
            Send
            <Send />
          </Button>
        </form>
      </div>
    </>
  );
}
