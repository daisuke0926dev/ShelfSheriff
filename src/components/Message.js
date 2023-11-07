import React, { useState, useEffect } from 'react';

const Message = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((displayedText) => displayedText + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50); // 50ミリ秒ごとに1文字を追加

    // コンポーネントのアンマウント時にタイマーをクリーンアップする
    return () => clearInterval(timer);
  }, [text]);

  return <div className="text">{displayedText}</div>;
};

export default Message;
