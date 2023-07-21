import { useEffect, useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<any>([]);
  const roomName = "FFENROOM";
  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);

  useEffect(() => {
    socket.onmessage = (e: MessageEvent<string>) => {
      const data: any = JSON.parse(e.data);
      setChatLog((prevChatLog: any) => [...prevChatLog, data.message]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    socket.send(JSON.stringify({ message }));
    setMessage("");
  };

  return (
    <div>
      <div>
        {chatLog.map((msg: string, index: number) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};
export default Chat;
