import "./App.css";
import React, { useState, useEffect } from "react";
// import { CommentBlock } from "./components/CommentBlock";
import { fetchTopTracks } from "./fetchers/fetchTopTracks";
import { Table } from "./components/Table";
function App() {
	const [topTracks, setTopTracks] = useState([]);
	
	useEffect(() => {
		fetchTopTracks().then((res) => {
      console.log(res.toptracks)
			setTopTracks(res.toptracks.track);
		});

		// fetch(
		// 	"https://kdwed-f1dd2-default-rtdb.europe-west1.firebasedatabase.app/comments.json"
		// )
		// 	.then((res) => res.json())
		// 	.then(
		// 		(result) => {
		// 			console.log("data", result);
		// 			setComments(result);
		// 			//  result.answers && result.answers.length > 0 ? setAnswers(result.answers) : setAnswers([])
		// 		},
		// 		(error) => {}
		// 	);
	}, []);
	return (
		<div className="App">
			<Table tracks={topTracks} />
		</div>
	);
}

export default App;
