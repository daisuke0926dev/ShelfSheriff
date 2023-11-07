// src/components/FileUpload.js
import React, { useState } from 'react';

function FileUpload({ onComplete }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true); // アップロード開始時にローディング状態にする
      try {
        // ファイルアップロードのシミュレート用にsleep関数を定義
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        // ここでファイルをAPIにアップロードする
        // const formData = new FormData();
        // formData.append('file', file);
        // const response = await axios.post('/upload', formData);

        console.log('start');
        await sleep(3000); // 3秒待つ
        console.log(`${new Date().getSeconds()} 秒`);
        console.log('end');
        
        // ここでAPIからのレスポンスを処理する
      } catch (error) {
        // エラー処理をここに実装
        console.error("File upload failed:", error);
      } finally {
        setIsUploading(false); // アップロードが終了したらローディング状態を解除
      }
      onComplete(); // sleepの後にonCompleteを呼び出して親コンポーネントに通知
    }
  };

  return (
    <div>
      <input type="file" className="file-upload-container" onChange={handleFileUpload} disabled={isUploading} />
      {isUploading && <p>分析中...</p>}
    </div>
  );
}

export default FileUpload;
