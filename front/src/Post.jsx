// import React from "react";

function Post({ setTitle, setContent }) {
  return (
    <>
      <div className="postPageBody">
        <input
          placeholder="input タイトル"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="input コンテント"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default Post;
