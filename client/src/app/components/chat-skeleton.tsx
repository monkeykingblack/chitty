export const ChatSkeleton = () => {
  const msgSkeleton = new Array(6).fill(null);
  return (
    <>
      {msgSkeleton.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? 'chat-start' : 'chat-end'}`}
        >
          <div className="chat-bubble">
            <div className="skeleton h-8 w-40" />
          </div>
          <div className="chat-footer mt-1">
            <div className="skeleton h-3 w-8" />
          </div>
        </div>
      ))}
    </>
  );
};
