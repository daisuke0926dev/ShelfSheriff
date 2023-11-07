// src/GameEngine.js
import React, { useState, useEffect } from 'react';
import Message from './components/Message';
import OptionsContainer from './components/OptionsContainer';
import FileUpload from './components/FileUpload';
import './GameEngine.css';
import sentences from './sentences';

function GameEngine() {
  // 現在のメッセージの状態を管理
  const [currentSentence, setCurrentSentence] = useState(sentences.initial);

  const preloadBackgroundImages = () => {
    Object.values(sentences).forEach((sentence) => {
      if (sentence.background) {
        const img = new Image();
        img.src = sentence.background;
      }
    });
  };
  // コンポーネントがマウントされた時に背景画像をプリロードします
  useEffect(() => {
    preloadBackgroundImages();
  }, []);

  const handleOptionClick = (nextKey) => {
    const nextSentence = sentences[nextKey];
    if (!nextSentence) {
      console.error(`The next key '${nextKey}' is not found in the sentences.`);
      return; // ここで処理を中止します。
    }
    setCurrentSentence(nextSentence);
  };

  // 現在の選択肢を取得
  const currentOptions = currentSentence.options || [];

  // 背景画像をスタイルオブジェクトとして取得する関数
  const getBackgroundStyle = () => ({
    backgroundImage: `url(${currentSentence.background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    overflow: 'hidden',
  });

  const renderContent = () => {
    switch (currentSentence.type) {
      case 'fileUpload':
        return <FileUpload onComplete={() => handleOptionClick('afterUpload')} />;
      default:
        return (
          <OptionsContainer options={currentOptions.map(option => ({
            label: option.label,
            onClick: () => handleOptionClick(option.nextKey)
          }))} />
        );
    }
  };

  // `key`には現在のセンテンスのユニークな値を使用します
  // これにより、新しいセンテンスが来るたびにメッセージコンポーネントがリセットされます
  const messageKey = currentSentence.key || 'initial';

  return (
    <div className="game-container" style={getBackgroundStyle()}>
      <div className="message-area">
        {/* `key`属性を指定してメッセージコンポーネントを再マウントします */}
        <Message key={messageKey} text={currentSentence.text} />
        {renderContent()}
      </div>
    </div>
  );
}

export default GameEngine;
