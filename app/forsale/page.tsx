// app/forsale/page.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  // 第一フェイズのチェックボックス状態を管理 (1〜30)
  const initialFirstPhaseState = Array.from({ length: 30 }, (_, i) => ({
    number: i + 1,
    checked: false,
  }));

  // 第二フェイズのチェックボックス状態を管理 (0, 2〜15 各2枚ずつ)
  const initialSecondPhaseState = [
    { number: 0, checked: false },
    { number: 0, checked: false },
    ...Array.from({ length: 14 }, (_, i) => [
      { number: i + 2, checked: false },
      { number: i + 2, checked: false },
    ]).flat(),
  ];

  // 状態の定義
  const [firstPhase, setFirstPhase] = useState(initialFirstPhaseState);
  const [secondPhase, setSecondPhase] = useState(initialSecondPhaseState);

  // チェックボックスの状態を更新する関数 (第一フェイズ)
  const handleFirstPhaseChange = (index) => {
    setFirstPhase((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // チェックボックスの状態を更新する関数 (第二フェイズ)
  const handleSecondPhaseChange = (index) => {
    setSecondPhase((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // リセットボタンの処理
  const handleReset = () => {
    setFirstPhase(initialFirstPhaseState);
    setSecondPhase(initialSecondPhaseState);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>フォーセール カード記録</h1>

      {/* 第一フェイズ */}
      <h2>第一フェイズ (1〜30)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)", // 6列のグリッド
          gap: "10px", // 各ボタンの間隔
          marginBottom: "20px",
        }}
      >
        {firstPhase.map((item, index) => (
          <button
            key={item.number}
            onClick={() => handleFirstPhaseChange(index)}
            style={{
              padding: "10px",
              backgroundColor: item.checked ? "#4CAF50" : "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {item.number}
          </button>
        ))}
      </div>

      {/* 第二フェイズ */}
      <h2>第二フェイズ (0, 2〜15 各2枚)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", // 5列のグリッド
          gap: "10px", // 各ボタンの間隔
          marginBottom: "20px",
        }}
      >
        {secondPhase.map((item, index) => (
          <button
            key={`${item.number}-${index}`}
            onClick={() => handleSecondPhaseChange(index)}
            style={{
              padding: "10px",
              backgroundColor: item.checked ? "#4CAF50" : "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {item.number}
          </button>
        ))}
      </div>

      {/* リセットボタン */}
      <button
        onClick={handleReset}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ff6666",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        リセット
      </button>
    </div>
  );
}
