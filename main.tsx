import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

// Define MUI theme 
const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#8B5CF6",
			light: "#C4B5FD",
			dark: "#6D28D9",
			contrastText: "#FFFFFF",
		},
		secondary: {
			main: "#A78BFA", 
			light: "#DDD6FE",
			dark: "#7C3AED", 
			contrastText: "#FFFFFF",
		},
		background: {
			default: "#F5F5F5", 
			paper: "#FFFFFF", 
		},
	},
	typography: {
		fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
		h4: {
			fontWeight: 600,
			letterSpacing: "-0.02em",
		},
		button: {
			textTransform: "none", 
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				color: "primary",
				variant: "contained", 
			},
			styleOverrides: {
				root: {
					borderRadius: 8, 
					padding: "8px 16px",
					boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
					transition: "transform 0.2s ease, box-shadow 0.2s ease",
					"&:hover": {
						transform: "translateY(-2px)",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					transition: "box-shadow 0.3s ease",
					"&:hover": {
						boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
					},
				},
			},
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline /> {/* Normalize browser styles */}
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
