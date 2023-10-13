import React, { useState } from "react";
import "./index.scss";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
interface msgType {
  role: string;
  content: string;
}

const PerfectChat: React.FC = () => {
  const staticClass = "chat";
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<msgType[]>([
    { role: "assistant", content: "欢迎回来！您想聊些什么？" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // 提交问题
  const chat = async (e: React.FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault();
    if (!message) return;
    setIsTyping(true);
    const msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");
    console.log(chats);
    // 调用后端服务提交接口数据
  };

  // 校验中文输入法，中文输入时不进行计数
  const [isComposition, setIsComposition] = useState<boolean>(true);
  function handleComposition(e: any) {
    if (e.type === "compositionstart") {
      // e.type === "compositionstart" 时为中文输入
      setIsComposition(false);
    } else {
      setIsComposition(true);
    }
  }

  // 对用户输入的字数进行限制
  const inputMaxLength = 100;
  // 输入框计数器
  const [curInputCount, setCurInputCount] = useState<number>(0);
  // 监听键盘 enter 事件 以及用书输入的字数统计
  function setInputLength(e: any, maxLength: number, msg: string) {
    // 输入内容时回车发送
    if (e.keyCode == 13 && !e.shiftKey) {
      e.cancelBubble = true; //ie阻止冒泡行为
      e.stopPropagation(); //Firefox阻止冒泡行为
      e.preventDefault(); //取消默认换行
      if (message) {
        // enter 发送问题 清空输入框计数器
        chat(e, message);
        setCurInputCount(0);
        return;
      }
    }
    // 同时按下 回车 & shift ==>> 换行
    if (e.keyCode == 13 && e.shiftKey) {
      setMessage(message + "\n");
    }

    // 判断是否为中文输入法，中文输入时不统计字数
    if (!isComposition) {
      return;
    }
    if (msg.length > maxLength) {
      setMessage(msg.substring(0, maxLength));
    } else {
      setCurInputCount(msg.length);
    }
  }

  return (
    <div className="wrapper">
      <p className="title">人工智能-ChatGPT</p>
      <div className="content">
        {chats && chats.length
          ? chats.map((chat, index) => (
            <div
              key={index}
              className={`${staticClass} ${
                chat.role === "user" ? "chat-user" : "chat-assistant"
              }`}
            >
              <div
                className={
                  chat.role === "user"
                    ? "chat-user-content"
                    : "chat-assistant-content"
                }
              >
                <span>{chat.content}</span>
              </div>
            </div>
          ))
          : ""}
      </div>

      <div className={isTyping ? "" : "hide"}>
          <Spin indicator={antIcon} />;
      </div>

      <form action="">
        <textarea
          className="question-input"
          name="message"
          autoComplete="off"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
          onCompositionStart={(e) => {
            handleComposition(e);
          }}
          onCompositionEnd={(e) => {
            handleComposition(e);
          }}
          onKeyUp={(e) => setInputLength(e.target, inputMaxLength, message)}
        />
        <div className="textarea-counter">
          {curInputCount}/{inputMaxLength}
        </div>
      </form>
    </div>
  );
}
export default PerfectChat;
