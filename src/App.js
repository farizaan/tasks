import "./App.css";
import React, { useState } from "react";
// import { CommentBlock } from "./components/CommentBlock";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Movies } from "./pages/Movies";
import { MoviePage } from "./pages/MoviePage";
import { Characters } from "./pages/rickandmorty/Characters";
import { QueryClientProvider, QueryClient } from "react-query";
import { CharacterPage } from "./pages/rickandmorty/CharacterPage";
import { SignInPage } from "./pages/SignInPage";
import { Auth } from "./context/Auth";
import { Counter } from "./components/Counter";
import { Home } from "./pages/Home";
import { Todo } from "./pages/todo/TodoPage";
const queryClient = new QueryClient();
function App() {

	const [token, setToken] = useState(localStorage.getItem("idToken"));
	return (
		<Auth.Provider value={{ token,setToken }}>
			<div className="App">
				<QueryClientProvider client={queryClient}>
					<Navbar />
				
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/movies" element={<Movies />} />
						<Route path="/movies/:movieId" element={<MoviePage />} />
						<Route path="/rickandmorty" element={<Characters />} />
						<Route
							path="/rickandmorty/:characterId"
							element={<CharacterPage />}
						/>
						<Route path="/signin" element={<SignInPage />} />
						<Route path="/counter" element={<Counter />} />
						<Route path="/todo" element={<Todo />} />
					</Routes>
				</QueryClientProvider>
			</div>
		</Auth.Provider>
	);
}

export default App;
