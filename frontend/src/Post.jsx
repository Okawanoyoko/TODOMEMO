// import React from "react";

function Post({ setTitle, setContent }) {
  return (
    <>
      <div className="postPageBody">
        <input
          class="inputTitle"
          placeholder="ここにタイトルを入力してください"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="ここにメモ内容を入力してください"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default Post;
