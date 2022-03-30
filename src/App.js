import "./App.css";
import React, { useState, useEffect } from "react";
// import { CommentBlock } from "./components/CommentBlock";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Fibonacci } from "./components/Fibonacci";
import { Factorial } from "./components/Factorial";
import { Movies } from "./pages/Movies";
import { MoviePage } from "./pages/MoviePage";
function App() {
	return (
		<div className="App">
			<Navbar />
			{/* <nav className="nav">
				<Link to="/">Fibonacci</Link>
				<Link to="/fib">Factorial</Link>
			</nav> */}
			<Routes>
				<Route path="/" element={<Movies />} />
				<Route path="/movies/:movieId" element={<MoviePage />} />
				<Route path="/about" element={<Fibonacci />} />
			</Routes>
		</div>
	);
}

export default App;
