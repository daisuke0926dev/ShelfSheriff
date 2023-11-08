import React, { useState, useEffect } from 'react';
import Message from './components/Message';
import OptionsContainer from './components/OptionsContainer';
import FileUpload from './components/FileUpload';
import './GameEngine.css';
import sentences from './sentences';

function GameEngine() {
  const [currentSentence, setCurrentSentence] = useState(sentences.initial);
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  const preloadBackgroundImages = () => {
    Object.values(sentences).forEach((sentence) => {
      if (sentence.background) {
        const img = new Image();
        img.src = sentence.background;
      }
    });
  };

  const handleUploadComplete = (response) => {
    setApiResponse(response);
    console.log("here");
    handleOptionClick('afterUpload');
  };

  useEffect(() => {
    preloadBackgroundImages();
  }, []);

  const handleOptionClick = (nextKey) => {
    if (nextKey === "id" || nextKey === "title"){
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = new Set(prevSelectedOptions);
      newSelectedOptions.add(nextKey);
      return newSelectedOptions;
    })};

    const nextSentence = sentences[nextKey];
    if (!nextSentence) {
      console.error(`The next key '${nextKey}' is not found in the sentences.`);
      return;
    }
    setCurrentSentence(nextSentence);
  };

  const addSentenceFromApiResponse = (apiResponse, property) => {
    const key = property; // 'id' または 'title'
    if (!sentences[key]) {
      sentences[key] = {
        key: key,
        text: "  " + apiResponse[key], // Fix for the missing character.
        options: [],
        background: '/images/detective_talk2.jpg',
      };
    }
    return key;
  };

  const renderOptions = () => {
    if (apiResponse && selectedOptions.size < 2) {
      return ['id', 'title'].filter(property => !selectedOptions.has(property)).map(property => ({
        label: property,
        onClick: () => {
          const newKey = addSentenceFromApiResponse(apiResponse, property);
          handleOptionClick(newKey);
        }
      }));
    } else if (apiResponse && selectedOptions.size === 2) {
      // Once both 'id' and 'title' have been selected, we can proceed.
      const newOptionKey = 'after_choose';
      if (!sentences[newOptionKey]) {
        sentences[newOptionKey] = {
          key: newOptionKey,
          text: 'You have selected both options, now you can proceed.',
          options: [{ label: 'Proceed1', nextKey: 'id' }],
          background: '/images/new-background.jpg',
        };
      }
      return [{
        label: 'Proceed2',
        onClick: () => handleOptionClick(sentences[newOptionKey].options[nextKey]),
      }];
    }
    
    // Default case to handle other sentences
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
