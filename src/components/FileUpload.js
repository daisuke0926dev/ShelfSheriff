// src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ onComplete }) {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [isUploading, setIsUploading] = useState(false);

  // 画像ファイルをBase64にエンコードする関数
  const encodeImageFileAsURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Base64エンコードされた文字列のデータ部分のみを返す
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        // ファイルを読み込んでBase64エンコーディングに変換
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64 = await toBase64(file);

          // APIエンドポイントを環境変数から取得
          const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

          // // Lambdaに送信
          // const response = await axios.post(apiEndpoint, {
          //   image: base64
          // });
          // 検証環境の動作確認として、JsonをGetする。
          const response = await axios.get(apiEndpoint);
          // onCompleteを呼び出し、レスポンスのデータを渡す
          onComplete(response.data);
        };
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
    const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div>
      <input type="file" className="file-upload-container" onChange={handleFileUpload} disabled={isUploading} />
      {isUploading && <p>分析中...</p>}
    </div>
  );
}

export default FileUpload;
