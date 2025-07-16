
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/LoginPage";
import Store from "./pages/Store/Store";
import AdminPage from "./pages/AdminPage/AdminPage";
import UserSearchPage from "./pages/UserSearchPage";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/home' element={<Home />} />
				<Route path='/' element={<Login />} />
				<Route path='/store' element={<Store />} />
				<Route path='/adminPage' element={<AdminPage />} />
				<Route path='/admin/users' element={<UserSearchPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
