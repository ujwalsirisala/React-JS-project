import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import LoginPage from './scenes/loginPage';
import Home from './scenes/homePage';
import ProfilePage from './scenes/profilePage';
function App() {
	const mode = useSelector((state)=>state.mode);
	const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
	const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
	  <ThemeProvider theme={theme}>
		<CssBaseline></CssBaseline>
		<Routes>
			<Route path="/" element={<LoginPage></LoginPage>}></Route>
			<Route path="/home" element={<Home></Home>}></Route>
			<Route path="/profile/:userId" element={<ProfilePage></ProfilePage>}></Route>
		</Routes>
	  </ThemeProvider>
	  </BrowserRouter>
    </div>
  );
}

export default App;
