import "./App.css";
import React, { useState, useEffect } from "react";
// import { CommentBlock } from "./components/CommentBlock";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Fibonacci } from "./components/Fibonacci";
import { Factorial } from "./components/Factorial";
import { Movies } from "./pages/Movies";
import { MoviePage } from "./pages/MoviePage";
import { Characters } from "./pages/rickandmorty/Characters";
import { QueryClientProvider, QueryClient } from "react-query";
import { CharacterPage } from "./pages/rickandmorty/CharacterPage";
import { SignInPage } from "./pages/SignInPage";
import { Auth } from "./context/Auth";
const queryClient = new QueryClient();
function App() {

	const [token, setToken] = useState(localStorage.getItem("idToken"));
	return (
		<Auth.Provider value={{ token,setToken }}>
			<div className="App">
				<QueryClientProvider client={queryClient}>
					<Navbar />
				
					<Routes>
						<Route path="/" element={<Movies />} />
						<Route path="/movies" element={<Movies />} />
						<Route path="/movies/:movieId" element={<MoviePage />} />
						<Route path="/rickandmorty" element={<Characters />} />
						<Route
							path="/rickandmorty/:characterId"
							element={<CharacterPage />}
						/>
						<Route path="/signin" element={<SignInPage />} />
					</Routes>
				</QueryClientProvider>
			</div>
		</Auth.Provider>
	);
}

export default App;
