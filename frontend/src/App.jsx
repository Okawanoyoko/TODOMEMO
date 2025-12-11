import { useState } from "react";
import "./App.css";
import LeftNavi from "./LeftNavi.jsx";
import RightBody from "./RightBody.jsx";

function App() {
  const [selected, setSelected] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [refresh, setRefresh] = useState(0);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>DIG NOTES</h1>
      <div className="forGrid">
        <LeftNavi
          setSelected={setSelected} //選択されたものをいれろ
          setShowPost={setShowPost} //ポストボタン押されたかどうか入れろ
          refresh={refresh} //refreshされたよ連絡うけとり
        />
        <RightBody
          selected={selected} //左ナビでこのカードが選択されたよ連絡&その情報うけとり
          showPost={showPost} //左ナビでポスト押されたよ連絡うけとり
          setSelected={setSelected} //これに中身を入れろパッチ・削除用
          setRefresh={setRefresh} //refreshしたかどうかいれろ
        />
      </div>
    </>
  );
}

export default App;
