import React, { useState } from "react";
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	TextField,
	Button,
	Grid,
	Paper,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	IconButton,
} from "@mui/material";
import { Dashboard, People } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

interface UserInfo {
	name: string;
	age: number;
	position: string;
	department: string;
}

interface TokenStats {
	sent: number;
	received: number;
	usedInStore: number;
	monthlyData: Array<{
		month: string;
		sent: number;
		received: number;
		usedInStore: number;
	}>;
}

// Dummy user data and stats (simulate API response)
const dummyUserInfo: UserInfo = {
	name: "John Doe",
	age: 32,
	position: "Developer",
	department: "I.T",
};

const dummyTokenStats: TokenStats = {
	sent: 1240,
	received: 980,
	usedInStore: 600,
	monthlyData: [
		{ month: "Jan", sent: 100, received: 80, usedInStore: 40 },
		{ month: "Feb", sent: 150, received: 120, usedInStore: 60 },
		{ month: "Mar", sent: 200, received: 160, usedInStore: 70 },
		{ month: "Apr", sent: 80, received: 70, usedInStore: 30 },
		{ month: "May", sent: 160, received: 180, usedInStore: 90 },
		{ month: "Jun", sent: 110, received: 90, usedInStore: 50 },
		{ month: "Jul", sent: 140, received: 130, usedInStore: 65 },
		{ month: "Aug", sent: 170, received: 150, usedInStore: 75 },
		{ month: "Sep", sent: 200, received: 190, usedInStore: 80 },
		{ month: "Oct", sent: 180, received: 160, usedInStore: 70 },
		{ month: "Nov", sent: 210, received: 180, usedInStore: 85 },
		{ month: "Dec", sent: 220, received: 190, usedInStore: 90 },
	],
};

const drawerWidth = 240;

const UserSearchPage: React.FC = () => {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);

	const handleSearch = () => {
		if (search.trim() !== "") {
			setUserInfo(dummyUserInfo);
			setTokenStats(dummyTokenStats);
		} else {
			setUserInfo(null);
			setTokenStats(null);
		}
	};

	const totalTokensSpent = tokenStats
		? tokenStats.sent + tokenStats.usedInStore
		: 0;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />

			{/* AppBar */}
			<AppBar
				position='fixed'
				sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
			>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='back'
						sx={{ mr: 2 }}
						onClick={() => navigate("/adminPage")}
					>
						<ArrowBackIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						User Search
					</Typography>
				</Toolbar>
			</AppBar>

			{/* Drawer */}
			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						<ListItem button onClick={() => navigate("/adminPage")}>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary='Dashboard' />
						</ListItem>
						<ListItem button selected>
							<ListItemIcon>
								<People />
							</ListItemIcon>
							<ListItemText primary='Users' />
						</ListItem>
					</List>
				</Box>
			</Drawer>

			{/* Main content */}
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					mt: 8,
					width: `calc(100% - ${drawerWidth}px)`,
				}}
			>
				{/* Search bar */}
				<Box sx={{ display: "flex", gap: 2, mb: 4, maxWidth: 600 }}>
					<TextField
						label='Username or Wallet Address'
						variant='outlined'
						fullWidth
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button variant='contained' onClick={handleSearch}>
						Search
					</Button>
				</Box>

				{userInfo && tokenStats && (
					<>
						{/* User Info */}
						<Paper sx={{ p: 3, mb: 4 }} elevation={3}>
							<Typography variant='h6' gutterBottom>
								User Information
							</Typography>
							<Grid container spacing={2}>
								{[
									{ label: "Name", value: userInfo.name },
									{ label: "Age", value: userInfo.age },
									{ label: "Position", value: userInfo.position },
									{ label: "Department", value: userInfo.department },
								].map(({ label, value }) => (
									<Grid item xs={6} sm={3} key={label}>
										<Typography variant='subtitle2' color='text.secondary'>
											{label}
										</Typography>
										<Typography variant='h6' sx={{ fontWeight: "bold" }}>
											{value}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Paper>
						{/* Token Stats Figures */}
						<Paper sx={{ p: 4, mb: 4 }} elevation={3}>
							<Typography variant='h6' gutterBottom>
								Token Statistics (Current Month)
							</Typography>
							<Grid container spacing={4}>
								{[
									{ label: "Tokens Sent", value: tokenStats.sent },
									{ label: "Tokens Received", value: tokenStats.received },
									{ label: "Total Tokens Spent", value: totalTokensSpent },
								].map(({ label, value }) => (
									<Grid item xs={12} sm={4} key={label}>
										<Typography variant='subtitle2' color='text.secondary'>
											{label}
										</Typography>
										<Typography variant='h6' sx={{ fontWeight: "bold" }}>
											{value}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Paper>

						{/* Graph */}
						<Paper sx={{ p: 3 }} elevation={3}>
							<Typography variant='h6' gutterBottom>
								Tokens Sent, Received & Used in Store (Past 12 Months)
							</Typography>
							<ResponsiveContainer width='100%' height={300}>
								<LineChart data={tokenStats.monthlyData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='month' />
									<YAxis />
									<Tooltip />
									<Line
										type='monotone'
										dataKey='sent'
										stroke='#1976d2'
										name='Sent'
									/>
									<Line
										type='monotone'
										dataKey='received'
										stroke='#4caf50'
										name='Received'
									/>
									<Line
										type='monotone'
										dataKey='usedInStore'
										stroke='#ff9800'
										name='Used in Store'
									/>
								</LineChart>
							</ResponsiveContainer>
						</Paper>
					</>
				)}
			</Box>
		</Box>
	);
};

export default UserSearchPage;
