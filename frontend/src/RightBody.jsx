// import React from "react";

import Post from "./Post";
import { useState, useEffect } from "react";

// // ドロップゾーン用
//  import React, {useCallback} from 'react'
//  import {useDropzone} from 'react-dropzone'

function RightBody({ selected, showPost, setSelected, setRefresh, user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //左ナビからSELECTに入ってきた中身を個別に取得してまた箱に入れる
//   useEffect(() => {
//     if (selected) {
//       setTitle(selected.title);
//       setContent(selected.content);
//     }
//   }, [setImageUrl]);

  async function save() {
    if (!selected) {
      const filename = prompt("ファイル名を入力してください", "default");
      await fetch("http:localhost:8080/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: filename + ".TXT",
          title: title || content.slice(0, 25),
          content: content,
        }),
      });
      setSelected(null);
      setRefresh((current) => current + 1);

      return;
    }

    await fetch("/api/patch", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected.id,
        title: title,
        content: content,
      }),
    });
    setRefresh((current) => current + 1);
  }

  async function deleteContent() {
      await fetch("http://localhost:8080/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          id: selected.id,
        }),
      });
   setRefresh((current) => current + 1);
    setSelected(null);

  }

  if (showPost) {
    return (
      <>
        <div className="selectedBody">
          <div className="rightHead">
            <button>❎</button>
            <button onClick={save}>SAVED</button>
          </div>
          <Post setTitle={setTitle} setContent={setContent} />
        </div>
      </>
    );
  }

  if (selected) {
    return (
      <div className="selectedBody">
        <div className="rightHead">
          <button onClick={deleteContent}>❎</button>
          <button onClick={save}>SAVE</button>
        </div>
        <div>
          <h3>ファイル名</h3>
          <h4>[fileName] {selected["filename"]}</h4>
          <h3>タイトル</h3>
          <h4 contentEditable onInput={(e) => setTitle(e.target.innerText)}>
            {selected["title"]}
          </h4>
          <p contentEditable onInput={(e) => setContent(e.target.innerText)}>
            {selected["content"]}
          </p>
        </div>
      </div>
    );
  }
}

export default RightBody;
