import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropImage({ setImageUrl, imageUrl, setImg, setImgBBURL }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);
      console.log(typeof file);

      // プレビー
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);

      // File
      setImg(file);

      // ImgBBにアップロードして帰ってくるURLを取得してセット
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=035405b0e35e261cbf940201f0f92fdd`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("ImgBBのレスポンス:", data);
      console.log("公開URL:", data.data.url); // ← dataのなかのdataのなかのURLキー
      setImgBBURL(data.data.url);
    },
    [setImageUrl, setImg, setImgBBURL]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {imageUrl ? (
        <div className="theImage">
          <img src={imageUrl} alt="preview" className="previewImage" />
        </div>
      ) : (
        <p>画像を選択するか、ドラッグ＆ドロップしてください</p>
      )}
    </div>
  );
}

export default DropImage;
