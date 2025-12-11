import { useState } from "react";
import "./App.css";
import LeftNavi from "./LeftNavi.jsx";
import RightBody from "./RightBody.jsx";

function App() {
  const [selected, setSelected] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [clickSearchImg, setClickSearchImg] = useState(false)
 const [data, setData] = useState([]);//左ナビから移動させた前データ１００限定
  return (
    <>
      <h1>DIG NOTES</h1>
      <div className="forGrid">
        <LeftNavi
          setSelected={setSelected} //選択されたものをいれろ
          setShowPost={setShowPost} //ポストボタン押されたかどうか入れろ
          refresh={refresh} //refreshされたよ連絡うけとり
          setClickSearchImg={setClickSearchImg}
          setData={setData}
          data={data}
        />
        <div className="rightBodyAll">
          <RightBody
            selected={selected} //左ナビでこのカードが選択されたよ連絡&その情報うけとり
            showPost={showPost} //左ナビでポスト押されたよ連絡うけとり
            setSelected={setSelected} //これに中身を入れろパッチ・削除用
            setRefresh={setRefresh} //refreshしたかどうかいれろ
            clickSearchImg={clickSearchImg}
            data={data}
          />
        </div>
      </div>
    </>
  );
}

export default App;
