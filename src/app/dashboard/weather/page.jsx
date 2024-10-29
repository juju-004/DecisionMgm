"use client";

import React, { useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import axios from "axios";

export default function Chat({ v }) {
  const ref = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi, Im your ${v.value} ai. What can i do for you today`,
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
            content: v.system,
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

  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollWidth);
  }, [messages, message]);

  return (
    <div className="w-full mx-auto max-w-xl">
      <Page
        ref={ref}
        className="overflow-y-scroll px-2 scrollb w-full mx-auto h-[calc(100vh-190px)] overflow-x-hidden"
      >
        <div className="flex flex-col items-start justify-start">
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
                    <p className="font-semibold">{v.value} Bot</p>
                    <div className="mt-2 text-sm text-zinc-500">
                      {m.content}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
          {loading && (
            <div className="w-full px-4 mt-5 py-3">
              <p className="font-semibold">{v.value} Bot</p>
              <div className="mt-2 text-sm text-zinc-500">typing...</div>
            </div>
          )}
        </div>
      </Page>

      <form
        className="fixed bottom-4 left-1/2 -translate-x-1/2 shadow bg-slate-900 flex items-center py-1 px-1.5 max-w-xl w-full rounded-3xl"
        onSubmit={handleSubmit}
      >
        <input
          name="message"
          placeholder="Enter your message here..."
          value={message}
          autoFocus
          className="!py-0 bg-transparent text-base ring-0 px-4 flex-1 hover:ring-0 outline-none hover:outline-none focus:outline-none focus:ring-0 hover:bg-transparent !focus:bg-transparent !focus:border-0 !hover:border-0 !border-0 !text-white shadow-none"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          disabled={loading}
          className="py-2.5 disabled:opacity-60 hover:border-0 hover:bg-black active:scale-75 hover:opacity-80 opacity-100 scale-100 duration-150 px-4 fx gap-1 bg-black text-white rounded-[20px]"
        >
          Send
          <BiSend />
        </button>
      </form>
    </div>
  );
}
