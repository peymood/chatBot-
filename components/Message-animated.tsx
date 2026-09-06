"use client";

import { UIMessage } from "ai";

interface MessageAnimatedProps {
  message: UIMessage;
}

export function MessageAnimated({
  message,
}: MessageAnimatedProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%]
          rounded-2xl
          px-4
          py-2.5
          text-sm
          leading-6
          break-words
          ${
            isUser
              ? "rounded-br-sm bg-primary text-primary-foreground"
              : "rounded-bl-sm bg-muted text-foreground"
          }
        `}
      >
        {message.parts.map((part, index) => {
          if (part.type !== "text") {
            return null;
          }

          return (
            <span key={index}>
              {part.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}