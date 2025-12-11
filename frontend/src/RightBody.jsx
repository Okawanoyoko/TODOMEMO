// import React from "react";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import SaveIcon from '@mui/icons-material/Save';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Post from "./Post";
import { useState, useEffect } from "react";
import DropImage from "./DropImage";

function RightBody({ selected, showPost, setSelected, setRefresh, clickSearchImg, data }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //🔴画像用PROPS追加、DROPIMAGEに渡して入れさせる
  const [imageUrl, setImageUrl] = useState(""); //これはローカルのプレビュー用のURL
  const [img, setImg] = useState({}); //こっちを送る
  const [imgBBURL, setImgBBURL] = useState("");

  console.log("URLとれてます？", imgBBURL);
  //左ナビからSELECTに入ってきた中身を個別に取得してまた箱に入れる
  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setContent(selected.content);
      setImgBBURL(selected.bburl);
    }
  }, [selected]);

  async function save() {
    if (!selected) {
      const filename = prompt("ファイル名を入力してください", "default");
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: filename + ".TXT",
          title: title || content.slice(0, 25),
          content: content,
          bburl: imgBBURL
        }),
      });
      setSelected(null);
      setRefresh((current) => current + 1);
      setImgBBURL("");
      setImageUrl(null);

      return;
    }
    await fetch("/api/patch", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected.id,
        title: title,
        content: content,
        imgURL: imageUrl,
      }),
    });
    setRefresh((current) => current + 1);
  }

  async function deleteContent() {
    console.log("maru delete呼ばれた:"),
      await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
        }),
      });
    setSelected(null);
    setRefresh((current) => current + 1);
  }


  if (showPost) {
    return (
      <>
        <div className="rightHead">
          <button><RestoreFromTrashIcon style={{ color: "lightblue", fontSize: 40 }} /></button>
          <button className="saveButton" onClick={save}>
              <SaveIcon style={{ color: "lightblue", fontSize: 40 }} />
          </button>
        </div>
        <div className="postBody">
          <Post setTitle={setTitle} setContent={setContent} />
          <DropImage
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            setImg={setImg}
            img={img}
            setImgBBURL={setImgBBURL}
          />
        </div>
      </>
    );
  }

  if (selected) {
    return (
      <div className="selectedBody">
        <div className="rightHead">
            <button onClick={deleteContent}><RestoreFromTrashIcon style={{ color: "lightblue", fontSize: 40 }} /></button>

          <button className="saveButton" onClick={save}>
           <SaveIcon style={{ color: "lightblue", fontSize: 40 }} />
          </button>
        </div>
        <div>
          <h4>[fileName] {selected["filename"]}</h4>
          <h4 contentEditable onInput={(e) => setTitle(e.target.innerText)}>
            [title] {selected["title"]}
          </h4>
          <p contentEditable onInput={(e) => setContent(e.target.innerText)}>
            {selected["content"]}
          </p>
          <img className="bbImage" src={selected["bburl"]} alt="" />

          <DropImage
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            setImg={setImg}
            img={img}
            setImgBBURL={setImgBBURL}
          />
        </div>
      </div>
    );
  }
if (clickSearchImg) {
  return (

    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {data.map((item) => (
        <ImageListItem key={item.id}>
          <img
            srcSet={`${item.bburl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.bburl}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}}


export default RightBody;