"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

import { ArrowUp, RotateCcw, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

import { MessageAnimated } from "./Message-animated";

interface ChatBotProps {
  onClose?: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isBusy =
    status === "submitted" ||
    status === "streaming";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || isBusy) {
      return;
    }

    sendMessage({
      text: input,
    });

    setInput("");
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <MessageScrollerProvider>
      <Card className="flex h-[550px] w-[360px] flex-col gap-0 overflow-hidden shadow-xl">
        {/* HEADER */}

        <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
          <div>
            <CardTitle className="text-base">
              Restaurant Assistant
            </CardTitle>

            <p className="text-xs text-muted-foreground">
              How can I help you?
            </p>
          </div>

          <div className="flex items-center gap-1">
            {/* RESET */}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              disabled={isBusy}
              title="Reset chat"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            {/* CLOSE */}

            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                title="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        {/* MESSAGES */}

        <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center px-6 text-center">
              <div>
                <div className="mb-3 text-4xl">
                  🤖
                </div>

                <h3 className="font-semibold">
                  Hello! 👋
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  What kind of food are you looking for?
                </p>

                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <p>🍕 Pizza</p>
                  <p>🍔 Burger</p>
                  <p>🐟 Seafood</p>
                </div>
              </div>
            </div>
          ) : (
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent
                  className="flex flex-col gap-3 p-4"
                  aria-busy={isBusy}
                >
                  {messages.map((message) => (
                    <MessageAnimated
                      key={message.id}
                      message={message}
                    />
                  ))}

                  {/* AI THINKING */}

                  {status === "submitted" && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm">
                        <span className="animate-pulse">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>

              <MessageScrollerButton />
            </MessageScroller>
          )}
        </CardContent>

        {/* INPUT */}

        <CardFooter className="border-t p-3">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isBusy}
              placeholder="What are you looking for?"
              className="flex-1"
            />

            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isBusy}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </MessageScrollerProvider>
  );
}