import React from "react";
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	Grid,
	Paper,
	IconButton,
} from "@mui/material";
import { Dashboard, People, GroupAdd, Person } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	BarChart,
	Bar,
	ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

// Dummy Data
const coinStats = [
	{ month: "Jan", Tokens: 500 },
	{ month: "Feb", Tokens: 900 },
	{ month: "Mar", Tokens: 300 },
	{ month: "Apr", Tokens: 1500 },
	{ month: "May", Tokens: 1400 },
	{ month: "Jun", Tokens: 2100 },
	{ month: "Jul", Tokens: 2100 },
];

const userRoles = [
	{ role: "Executives", Tokens: 175 },
	{ role: "Middle Management", Tokens: 500 },
	{ role: "Employees", Tokens: 1200 },
];

const statCards = [
	{ label: "Total Tokens Sent", value: "1,270", icon: <People /> },
	{ label: "Total Employees", value: "320", icon: <GroupAdd /> },
	{ label: "Active Today", value: "156", icon: <Person /> },
];

const AdminPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />

			{/* App Bar with Back Button */}
			<AppBar
				position='fixed'
				sx={{
					width: `calc(100% - ${drawerWidth}px)`,
					ml: `${drawerWidth}px`,
				}}
			>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='back'
						sx={{ mr: 2 }}
						onClick={() => navigate("/")}
					>
						<ArrowBackIcon />
					</IconButton>

					<Typography variant='h6' noWrap>
						Admin Dashboard
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
						<ListItem button>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary='Dashboard' />
						</ListItem>

						<ListItem button onClick={() => navigate("/admin/users")}>
							<ListItemIcon>
								<People />
							</ListItemIcon>
							<ListItemText primary='Users' />
						</ListItem>
					</List>
				</Box>
			</Drawer>

			{/* Main Content */}
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					mt: 8,
					width: `calc(100% - ${drawerWidth}px)`,
				}}
			>
				<Typography variant='h4' align='center' gutterBottom>
					User Analytics
				</Typography>

				{/* Centered Stats */}
				<Grid
					container
					spacing={3}
					justifyContent='center'
					alignItems='center'
					mb={4}
				>
					{statCards.map((card, idx) => (
						<Grid item xs={12} sm={6} md={3} key={idx}>
							<Paper
								sx={{
									p: 3, // increased padding
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
								elevation={3}
							>
								<Box>
									<Typography variant='subtitle1' color='text.secondary'>
										{" "}
										{/* bigger subtitle */}
										{card.label}
									</Typography>
									<Typography variant='h5'>
										{" "}
										{/* bigger value */}
										{card.value}
									</Typography>
								</Box>
								{React.cloneElement(card.icon, { fontSize: "large" })}{" "}
								{/* larger icon */}
							</Paper>
						</Grid>
					))}
				</Grid>

				{/* Charts */}
				<Grid container spacing={4} direction='column'>
					{/* Total Coins Sent - Line Chart */}
					<Grid item xs={12}>
						<Paper sx={{ p: 3 }} elevation={3}>
							<Typography variant='h6' gutterBottom>
								Total Coins Sent
							</Typography>
							<Box sx={{ width: "65%", margin: "0 auto" }}>
								<ResponsiveContainer width='100%' height={228}>
									<LineChart data={coinStats}>
										<Line type='monotone' dataKey='Tokens' stroke='#1976d2' />
										<CartesianGrid stroke='#ccc' />
										<XAxis dataKey='month' />
										<YAxis />
										<Tooltip />
									</LineChart>
								</ResponsiveContainer>
							</Box>
						</Paper>
					</Grid>

					{/* User Roles Distribution - Bar Chart Below */}
					<Grid item xs={12}>
						<Paper sx={{ p: 3 }} elevation={3}>
							<Typography variant='h6' gutterBottom>
								User Roles Distribution
							</Typography>
							<Box sx={{ width: "65%", margin: "0 auto" }}>
								<ResponsiveContainer width='100%' height={228}>
									<BarChart data={userRoles}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='role' />
										<YAxis />
										<Tooltip />
										<Bar dataKey='Tokens' fill='#4caf50' />
									</BarChart>
								</ResponsiveContainer>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default AdminPage;
