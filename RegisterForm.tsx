import React, { useState } from "react";
import {
	Box,
	TextField,
	Typography,
	Button,
	Paper,
	Alert,
	Divider,
	InputAdornment,
	IconButton,
	Fade,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

interface RegisterFormProps {
	onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [walletAddress, setWalletAddress] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [walletError, setWalletError] = useState("");
	const [isConnecting, setIsConnecting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const connectMetaMask = async () => {
		setIsConnecting(true);
		setWalletError("");

		try {
			if (!window.ethereum) {
				setWalletError("MetaMask is not installed.");
				setIsConnecting(false);
				return;
			}

			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});

			if (accounts.length > 0) {
				setWalletAddress(accounts[0]);
				setWalletError("");
			} else {
				setWalletError(
					"No accounts found. Please make sure MetaMask is unlocked."
				);
			}
		} catch (error: any) {
			console.error("Error connecting to MetaMask:", error);
			if (error.code === 4001) {
				setWalletError(
					"Connection rejected. Please approve the connection in MetaMask."
				);
			} else {
				setWalletError("Failed to connect to MetaMask. Please try again.");
			}
		} finally {
			setIsConnecting(false);
		}
	};

	const disconnectWallet = () => {
		setWalletAddress("");
		setWalletError("");
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFirstNameError("");
		setLastNameError("");
		setEmailError("");
		setPasswordError("");
		setConfirmPasswordError("");
		setWalletError("");

		// Validation
		if (!firstName) {
			setFirstNameError("First name is required");
			return;
		}
		if (!lastName) {
			setLastNameError("Last name is required");
			return;
		}
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
		if (password.length < 8) {
			setPasswordError("Password must be at least 8 characters");
			return;
		}
		if (!confirmPassword) {
			setConfirmPasswordError("Please confirm your password");
			return;
		}
		if (password !== confirmPassword) {
			setConfirmPasswordError("Passwords do not match");
			return;
		}
		if (!walletAddress) {
			setWalletError("Please connect your MetaMask wallet to continue.");
			return;
		}

		
		console.log("Registering with:", {
			firstName,
			lastName,
			email,
			password,
			walletAddress,
		});
		navigate("/home");
	};

	return (
		<Fade in timeout={600}>
			<Paper
				elevation={3}
				className='register-form-box'
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
					Register
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					align='center'
					sx={{ mb: 4 }}
				>
					Create a new account
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField
						label='First Name'
						type='text'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						error={!!firstNameError}
						helperText={firstNameError}
						fullWidth
						margin='normal'
						variant='outlined'
						className='register-form-input'
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
						label='Last Name'
						type='text'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						error={!!lastNameError}
						helperText={lastNameError}
						fullWidth
						margin='normal'
						variant='outlined'
						className='register-form-input'
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
						label='Email'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={!!emailError}
						helperText={emailError}
						fullWidth
						margin='normal'
						variant='outlined'
						className='register-form-input'
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
						className='register-form-input'
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
					<TextField
						label='Confirm Password'
						type={showConfirmPassword ? "text" : "password"}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						error={!!confirmPasswordError}
						helperText={confirmPasswordError}
						fullWidth
						margin='normal'
						variant='outlined'
						className='register-form-input'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Lock sx={{ color: "primary.main" }} />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										edge='end'
									>
										{showConfirmPassword ? (
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
					<Divider sx={{ my: 3 }}>
						<Typography variant='body2' color='text.secondary'>
							Connect Wallet
						</Typography>
					</Divider>

					{walletError && (
						<Alert severity='error' sx={{ mb: 2 }}>
							{walletError}
							{walletError.includes("not installed") && (
								<Box sx={{ mt: 1 }}>
									<Typography variant='body2' sx={{ mb: 1 }}>
										Please install MetaMask to continue:
									</Typography>
									<Button
										href='https://metamask.io/download/'
										target='_blank'
										rel='noopener noreferrer'
										variant='outlined'
										size='small'
										sx={{ textTransform: "none" }}
									>
										Install MetaMask
									</Button>
								</Box>
							)}
						</Alert>
					)}

					{walletAddress ? (
						<Box className='wallet-connected'>
							<Alert severity='success' sx={{ mb: 2 }}>
								Wallet connected successfully!
							</Alert>
							<TextField
								label='Connected Wallet Address'
								value={walletAddress}
								fullWidth
								disabled
								margin='normal'
								variant='outlined'
								className='register-form-input'
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
								onClick={disconnectWallet}
								variant='outlined'
								color='secondary'
								fullWidth
								sx={{ mt: 1, mb: 2, py: 1.5 }}
								className='wallet-disconnect-btn'
							>
								Disconnect Wallet
							</Button>
						</Box>
					) : (
						<Box>
							<Button
								onClick={connectMetaMask}
								disabled={isConnecting}
								variant='contained'
								color='secondary'
								fullWidth
								sx={{ mb: 2, py: 1.5 }}
								className='wallet-connect-btn'
							>
								{isConnecting ? "Connecting..." : "Connect MetaMask Wallet"}
							</Button>

							{!window.ethereum && (
								<Alert severity='info' sx={{ mb: 2 }}>
									<Typography variant='body2' sx={{ mb: 1 }}>
										Don't have MetaMask? Install it to connect your wallet:
									</Typography>
									<Button
										href='https://metamask.io/download/'
										target='_blank'
										rel='noopener noreferrer'
										variant='outlined'
										size='small'
										sx={{ textTransform: "none" }}
									>
										Install MetaMask
									</Button>
								</Alert>
							)}
						</Box>
					)}

					<Button
						type='submit'
						variant='contained'
						color='primary'
						fullWidth
						sx={{ mt: 2, py: 1.5 }}
						className='register-form-submit'
					>
						Register
					</Button>
					<Button
						onClick={onToggleForm}
						variant='outlined'
						color='secondary'
						fullWidth
						sx={{ mt: 2 }}
						className='register-form-toggle'
					>
						Already have an account? Login
					</Button>
				</Box>
			</Paper>
		</Fade>
	);
};

export default RegisterForm;
