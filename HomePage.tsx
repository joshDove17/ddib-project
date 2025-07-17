import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Container,
	Typography,
	Card,
	CardContent,
	Alert,
	Fade,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "./HomePage.css";
import TokenSendModal from "../../components/TokenSendModal/TokenSendModal";

function HomePage() {
	const [walletAddress, setWalletAddress] = useState("");
	const [balance, setBalance] = useState("");
	const [error, setError] = useState("");
	const [isConnecting, setIsConnecting] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const nameToAddress = {
		"john doe": "0x75Ce93E8a7A73Cf688b4c0b12b11BBbc96417995",
	};
	const transactions = [
		{
		
			from: "0xabc...123",
			to: "0xdef...456",
			amount: "1.5000 UZHETHw",
			date: "2025-07-10",
		},
		{
			from: "0xghi...789",
			to: "0xjkl...012",
			amount: "0.7500 UZHETHw",
			date: "2025-07-12",
		},
		{
			
			from: "0xmno...345",
			to: "0xpqr...678",
			amount: "2.0000 UZHETHw",
			date: "2025-07-14",
		},
	];

	const UZH_NETWORK = {
		chainId: "0x2BE",
		chainName: "UZH Ethereum PoW",
		rpcUrls: ["https://rpc.uzhethw.ifi.uzh.ch"],
		nativeCurrency: {
			name: "UZHETHw",
			symbol: "UZHETHw",
			decimals: 18,
		},
		blockExplorerUrls: ["https://uzhethw.ifi.uzh.ch"],
	};

	const connectMetaMask = async () => {
		setIsConnecting(true);
		setError("");

		try {
			if (!window.ethereum) {
				setError("MetaMask is not installed.");
				return;
			}

			const provider = new ethers.BrowserProvider(window.ethereum);
			const accounts = await provider.send("eth_requestAccounts", []);
			const address = accounts[0];
			setWalletAddress(address);

			const network = await provider.getNetwork();
			if (network.chainId !== BigInt(702)) {
				try {
					await window.ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [{ chainId: "0x2BE" }],
					});
				} catch (switchError) {
					if (switchError.code === 4902) {
						await window.ethereum.request({
							method: "wallet_addEthereumChain",
							params: [UZH_NETWORK],
						});
					} else {
						throw switchError;
					}
				}
			}

			const balanceWei = await provider.getBalance(address);
			const balanceEth = ethers.formatEther(balanceWei);
			setBalance(parseFloat(balanceEth).toFixed(4));
		} catch (err) {
			console.error("Error connecting to MetaMask:", err);
			if (err.code === 4001) {
				setError("Connection rejected.");
			} else {
				setError("Failed to connect or fetch balance.");
			}
		} finally {
			setIsConnecting(false);
		}
	};

	const disconnectWallet = () => {
		setWalletAddress("");
		setBalance("");
		setError("");
		setIsConnecting(false);
	};

	const handleAccountsChanged = (accounts) => {
		if (accounts.length > 0) {
			setWalletAddress(accounts[0]);
			connectMetaMask();
		} else {
			disconnectWallet();
		}
	};

	const handleChainChanged = () => {
		connectMetaMask();
	};

	useEffect(() => {
		if (!window.ethereum) return;

		const init = async () => {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const accounts = await provider.send("eth_accounts", []);
			if (accounts.length > 0) {
				setWalletAddress(accounts[0]);
				connectMetaMask();
			}
		};

		init();

		window.ethereum.on("accountsChanged", handleAccountsChanged);
		window.ethereum.on("chainChanged", handleChainChanged);

		return () => {
			window?.ethereum?.removeListener(
				"accountsChanged",
				handleAccountsChanged
			);
			window?.ethereum?.removeListener("chainChanged", handleChainChanged);
		};
	}, []);

	const handleTokenSend = (amount, message) => {
		console.log(
			`Sending ${amount} tokens to ${walletAddress}${
				message ? " with message: " + message : ""
			}`
		);
		
	};

	return (
		<Container
			// maxWidth='md'
			sx={{
				minHeight: "100vh",
				minWidth: "100vw",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: `
          radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 100%)
        `,
			}}
		>
			<Fade in timeout={600}>
				<Card
					sx={{
						p: 4,
						width: "100%",
						maxWidth: 800,
						backdropFilter: "blur(10px)",
						background: "rgba(255, 255, 255, 0.9)",
						border: "1px solid rgba(255, 255, 255, 0.2)",
					}}
				>
					<CardContent sx={{ textAlign: "center" }}>
						<Typography
							variant='h4'
							color='primary.main'
							gutterBottom
							sx={{ fontWeight: 700 }}
						>
							Welcome to WorkEth
						</Typography>
						<Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
							You have successfully logged in!
						</Typography>

						{error && (
							<Alert severity='error' sx={{ mb: 2 }}>
								{error}
							</Alert>
						)}

						{walletAddress ? (
							<Box sx={{ mb: 3 }}>
								<Typography variant='body1' color='text.primary' sx={{ mb: 1 }}>
									Connected Wallet: {walletAddress.slice(0, 6)}...
									{walletAddress.slice(-4)}
								</Typography>
								<Typography variant='h6' color='primary.main'>
									Balance: {balance} UZHETHw
								</Typography>
								<Button
									variant='outlined'
									color='secondary'
									onClick={disconnectWallet}
									sx={{ mt: 2, py: 1.5 }}
								>
									Disconnect Wallet
								</Button>
							</Box>
						) : (
							<Box sx={{ mb: 3 }}>
								<Button
									variant='contained'
									color='secondary'
									onClick={connectMetaMask}
									disabled={isConnecting}
									sx={{ py: 1.5 }}
								>
									{isConnecting ? "Connecting..." : "Connect MetaMask Wallet"}
								</Button>
							</Box>
						)}

						<Box
							sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 4 }}
						>
							<Button
								variant='contained'
								color='primary'
								sx={{ py: 1.5 }}
								onClick={() => setIsModalOpen(true)}
							>
								Send Tokens
							</Button>
							<Button
								variant='contained'
								color='primary'
								sx={{ py: 1.5 }}
								onClick={() => navigate("/store")}
							>
								Store
							</Button>
							<Button
								variant='contained'
								color='primary'
								sx={{ py: 1.5 }}
								onClick={() => navigate("/adminPage")}
							>
								Admin Page
							</Button>
						</Box>

						<Typography
							variant='h6'
							color='primary.main'
							gutterBottom
							sx={{ mt: 4, fontWeight: 600 }}
						>
							Previous Transactions
						</Typography>
						<TableContainer
							component={Paper}
							sx={{ background: "rgba(255, 255, 255, 0.9)", borderRadius: 8 }}
						>
							<Table className='transactions-table'>
								<TableHead>
									<TableRow>
										<TableCell>From</TableCell>
										<TableCell>To</TableCell>
										<TableCell>Amount</TableCell>
										<TableCell>Date</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{transactions.map((tx, index) => (
										<TableRow key={index} className='transaction-row'>
											<TableCell>{tx.from}</TableCell>
											<TableCell>{tx.to}</TableCell>
											<TableCell>{tx.amount}</TableCell>
											<TableCell>{tx.date}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>

						<Button
							variant='contained'
							onClick={() => navigate("/login")}
							sx={{ mt: 4, py: 1.5 }}
						>
							Back to Login
						</Button>
					</CardContent>
				</Card>
			</Fade>

			<TokenSendModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				username={
					walletAddress
						? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
						: ""
				}
				onConfirm={handleTokenSend}
			/>
		</Container>
	);
}

export default HomePage;
