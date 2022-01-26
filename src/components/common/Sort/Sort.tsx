import React from "react";

type PropsType = {
  sortHandlerUp?: () => void;
  sortHandlerDown?: () => void;
  title: string;
};

export const Sort = ({ sortHandlerUp, sortHandlerDown, title }: PropsType) => {
  return (
    <div>
      {title}
      <div>
        <button onClick={sortHandlerUp}>&and;</button>
        <button onClick={sortHandlerDown}>&or;</button>
      </div>
    </div>
  );
};
