'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {
  // サーバーから取得したデータを保存するstate
  
  const [data, setData] = useState({ message: '' });
 

  // データを取得する関数
  const fetchData = async () => {
      const response = await fetch('https://localhost:3000/memos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setData(result[0]); // データをstateに保存
  
    }

  // コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>

      {data && (
        <div>
          <h2>取得したデータ:</h2>
          <p>{data.message}</p>
        </div>
      )}
    </div>
  );
}
