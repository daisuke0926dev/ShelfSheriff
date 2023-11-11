import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUpload({ onComplete }) {
  const [isUploading, setIsUploading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("分析中");

  useEffect(() => {
    let intervalId;

    if (isUploading) {
      intervalId = setInterval(() => {
        setLoadingMessage(prev => prev.length >= 6 ? "分析中" : prev + ".");
      }, 500); // 500ミリ秒ごとに更新
    }

    return () => {
      clearInterval(intervalId); // コンポーネントのクリーンアップ時にインターバルをクリア
    };
  }, [isUploading]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      setLoadingMessage("分析中");

      try {
        const base64 = await toBase64(file);
        const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

        const response = await axios.post(apiEndpoint, { image: base64 });
        onComplete(response.data);
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  return (
    <div>
      <input type="file" className="file-upload-container" onChange={handleFileUpload} disabled={isUploading} />
      {isUploading && <p>{loadingMessage}</p>}
    </div>
  );
}

export default FileUpload;
