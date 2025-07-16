import React, { useState } from "react";
import {
	Box,
	TextField,
	Typography,
	Button,
	Paper,
	InputAdornment,
	IconButton,
	Fade,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

interface LoginFormProps {
	onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setEmailError("");
		setPasswordError("");

		// Basic validation
		if (!email) {
			setEmailError("Email is required");
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError("Invalid email format");
			return;
		}
		if (!password) {
			setPasswordError("Password is required");
			return;
		}

		// Simulate login logic (replace with real auth)
		console.log("Login submitted", { email, password });
		navigate("/home");
	};

	return (
		<Fade in timeout={600}>
			<Paper
				elevation={3}
				className='login-form-box'
				sx={{
					p: 4,
					width: "100%",
					maxWidth: 400,
					backdropFilter: "blur(10px)",
					background: "rgba(255, 255, 255, 0.9)",
					border: "1px solid rgba(255, 255, 255, 0.2)",
				}}
			>
				<Typography
					variant='h5'
					color='primary.main'
					align='center'
					gutterBottom
					sx={{ fontWeight: 700 }}
				>
					Login
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					align='center'
					sx={{ mb: 4 }}
				>
					Sign in to your account
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField
						label='Email'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={!!emailError}
						helperText={emailError}
						fullWidth
						margin='normal'
						variant='outlined'
						className='login-form-input'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Email sx={{ color: "primary.main" }} />
								</InputAdornment>
							),
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 8,
								transition: "all 0.3s ease",
								"&:hover": {
									boxShadow: "0 0 8px rgba(139, 92, 246, 0.3)",
								},
							},
						}}
					/>
					<TextField
						label='Password'
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={!!passwordError}
						helperText={passwordError}
						fullWidth
						margin='normal'
						variant='outlined'
						className='login-form-input'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Lock sx={{ color: "primary.main" }} />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShowPassword(!showPassword)}
										edge='end'
									>
										{showPassword ? (
											<VisibilityOff sx={{ color: "primary.main" }} />
										) : (
											<Visibility sx={{ color: "primary.main" }} />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 8,
								transition: "all 0.3s ease",
								"&:hover": {
									boxShadow: "0 0 8px rgba(139, 92, 246, 0.3)",
								},
							},
						}}
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						fullWidth
						sx={{ mt: 2, py: 1.5 }}
						className='login-form-submit'
					>
						Login
					</Button>
					<Button
						onClick={onToggleForm}
						variant='outlined'
						color='secondary'
						fullWidth
						sx={{ mt: 2 }}
						className='login-form-toggle'
					>
						Don't have an account? Register
					</Button>
				</Box>
			</Paper>
		</Fade>
	);
};

export default LoginForm;
