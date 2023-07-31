import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const roomName = "FFENROOM";
  const socket = useRef<WebSocket>();
  useEffect(() => {
    const _socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
    _socket.onmessage = (e: MessageEvent<string>) => {
      const data: any = JSON.parse(e.data);
      setChatLog((prevChatLog: string[]) => [...prevChatLog, data.message]);
    };

    socket.current = _socket;
    return () => {
      _socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket.current) {
      socket.current.send(JSON.stringify({ message }));
      setMessage("");
    }
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
