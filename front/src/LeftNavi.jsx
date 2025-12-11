import { useState, useEffect } from "react";

function LeftNavi({ setSelected, setShowPost, refresh }) {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [search, setSearchMode] = useState(false);

  //⭐️BODYでSAVEしてrefresh発火のたびに今日のメモをゲット
  useEffect(() => {
    async function getApi() {
      const response = await fetch("http://localhost:8080/api/getmemo");
      console.log(response)
      const json = await response.json();
      setData(json);
    }
    getApi();
  }, [refresh]); //refreshごとに発火

  //今日の分をフィルター取得
  // const JSTdate = data.map((each) => new Date(each.time));
  // console.log("JST", JSTdate); //Wed Nov 26 2025 18:06:36 GMT+0900 (日本標準時)
  const twentyFourAgo = new Date() - 24 * 60 * 60 * 1000; //1764468383176
  console.log(twentyFourAgo);
  let today = data.filter((each) => new Date(each.time) >= twentyFourAgo); //24時間いないのデータ一式とれた(today)

  today.forEach((each) => {
    const getDifference = new Date() - new Date(each.time);
    if (getDifference < 10000) {
      each.diff = "posted just now";
    } else if (getDifference < 60000) {
      each.diff = `${Math.floor(getDifference / 1000)}秒前`;
    } else if (getDifference < 3600000) {
      each.diff = `${Math.floor(getDifference / 60000)}分前`;
    } else {
      each.diff = `${Math.floor(getDifference / 3600000)}時間前`;
    }
  });

  today.reverse();

  console.log("DIFF追加できてますか", today);

  //⭐️サーチワードでフィルター
  const searchResult = data.filter(
    (each) =>
      each.content.includes(searchText) || each.title.includes(searchText)
  );

  function textSearch() {
    setSearchMode(true);
  }

  return (
    <div className="leftAll">
      <h1>Write</h1>
      <div className="searchBarArea">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <button onClick={textSearch}>🔍</button>
        <button
          onClick={() => {
            setSelected(null);
            setShowPost(true);
          }}
        >
          ＋
        </button>
      </div>
      <h2 className="today">Today</h2>
      {search &&
        searchResult.map((each) => (
          <div key={each.id}>
            <div
              onClick={() => {
                setShowPost(false);
                setSelected(each);
              }}
              className="allCards"
            >
              <img
                className="icon"
                src="../src/images/texticon.png"
                alt="texticon"
              />
              <h3 className="fileName">{each.title}</h3>
              <p className="card">{each.content.length} words</p>
              {/* <p className="cardTime">{each.time.slice(0, 10)}</p> */}
              <p className="cardTime">{today.diff}</p>
            </div>
          </div>
        ))}
      {!search &&
        today.map((each) => (
          <div key={each.id}>
            <div
              onClick={() => {
                setShowPost(false);
                setSelected(each);
              }}
              className="allCards"
            >
              <img
                className="icon"
                src="../src/images/texticon.png"
                alt="texticon"
              />
              <h3 className="fileName">{each.title}</h3>
              <p className="card">{each.content.length} words</p>
              {/* <p className="cardTime">{each.time.slice(0, 10)}</p> */}
              <p className="cardTime">{each.diff}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default LeftNavi;
