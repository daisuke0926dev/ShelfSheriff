import React, { useState, useEffect } from 'react';
import Message from './components/Message';
import OptionsContainer from './components/OptionsContainer';
import FileUpload from './components/FileUpload';
import './GameEngine.css';
import sentences from './sentences';

function GameEngine() {
  const [currentSentence, setCurrentSentence] = useState(sentences.initial);
  const [apiResponse, setApiResponse] = useState(null);

  const preloadBackgroundImages = () => {
    Object.values(sentences).forEach((sentence) => {
      if (sentence.background) {
        const img = new Image();
        img.src = sentence.background;
      }
    });
  };

  useEffect(() => {
    preloadBackgroundImages();
  }, []);

  const handleUploadComplete = (response) => {
    setApiResponse(response);
    handleOptionClick('afterUpload');
  };

  const handleOptionClick = (nextKey) => {
    // APIレスポンスがある場合、メッセージ内容をAPIから取得
    if (apiResponse && (nextKey === 'character' || nextKey === 'interesting' || nextKey === 'recommend')) {
      const newText = apiResponse[nextKey]; // APIから取得したテキスト
      const newSentence = { ...sentences[nextKey], text: "  " + newText }; // 2文字目が抜けるから空白を生贄に
      setCurrentSentence(newSentence);
    } else {
      // APIレスポンスがない場合、通常通りsentencesから次のセンテンスを取得
      const nextSentence = sentences[nextKey];
      if (!nextSentence) {
        console.error(`The next key '${nextKey}' is not found in the sentences.`);
        return;
      }
      setCurrentSentence(nextSentence);
    }
  };

  const renderOptions = () => {
    const currentOptions = currentSentence.options || [];
    return currentOptions.map(option => ({
      label: option.label,
      onClick: () => handleOptionClick(option.nextKey)
    }));
  };

  const getBackgroundStyle = () => ({
    backgroundImage: `url(${currentSentence.background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    overflow: 'hidden',
  });

  const messageKey = currentSentence.key || 'initial';

  return (
    <div className="game-container" style={getBackgroundStyle()}>
      <div className="message-area">
        <Message key={messageKey} text={currentSentence.text} />
        {renderContent()}
      </div>
    </div>
  );

  function renderContent() {
    switch (currentSentence.type) {
      case 'fileUpload':
        return <FileUpload onComplete={handleUploadComplete} />;
      default:
        return <OptionsContainer options={renderOptions()} />;
    }
  }
}

export default GameEngine;
