import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Typography,
	Box,
} from "@mui/material";
import Web3 from "web3";

const TokenSendModal = ({
	isOpen,
	onClose,
	onConfirm,
	prefillRecipient = "",
	prefillAmount = "",
	disableRecipient = false,
	disableAmount = false,
}) => {
	const [recipientInput, setRecipientInput] = useState("");
	const [amount, setAmount] = useState("");
	const [message, setMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [web3, setWeb3] = useState(null);
	const [account, setAccount] = useState(null);
	const [error, setError] = useState("");
	const senderWalletAddress = "0x284edb1aB6010422503c4190bEB08DBaA6Bb7Ea5";
	const recipientWalletAddress = "0x18C8a44533877dFd8a22fB060e4f52e4Cfd708f4";

	const tokenContractAddress = "0x3d540965809ccb355b1f0d1cbcabb55762997cfd";
	const networkConfig = {
		chainId: "0x2BE",
		chainName: "UZH Ethereum PoW",
		nativeCurrency: {
			name: "UZHETHw",
			symbol: "UZHETHw",
			decimals: 18,
		},
		rpcUrls: ["https://rpc.uzhethw.ifi.uzh.ch"],
		blockExplorerUrls: ["https://uzhethw.ifi.uzh.ch"],
	};
	
	const tokenABI = [
		{
			constant: false,
			inputs: [
				{ name: "_to", type: "address" },
				{ name: "_value", type: "uint256" },
			],
			name: "transfer",
			outputs: [{ name: "", type: "bool" }],
			type: "function",
		},
	];

	useEffect(() => {
		const initWeb3 = async () => {
			if (!window.ethereum) {
				setError(
					"MetaMask is not installed. Please install MetaMask to proceed."
				);
				return;
			}

			const web3Instance = new Web3(window.ethereum);
			setWeb3(web3Instance);

			try {
				// Request account access
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				const currentChainId = await web3Instance.eth.getChainId();

				// Check if connected to the correct network
				if (Number(currentChainId) !== 702) {
					try {
						// Attempt to switch to UZH Ethereum PoW network
						await window.ethereum.request({
							method: "wallet_switchEthereumChain",
							params: [{ chainId: networkConfig.chainId }],
						});
					} catch (switchError) {
						// If network doesn't exist, add it
						if (switchError.code === 4902) {
							await window.ethereum.request({
								method: "wallet_addEthereumChain",
								params: [networkConfig],
							});
						} else {
							setError(
								"Please switch to the UZH Ethereum PoW network in MetaMask."
							);
							return;
						}
					}
				}

				// Validate sender account
				if (accounts[0].toLowerCase() !== senderWalletAddress.toLowerCase()) {
					setError(
						"Please connect MetaMask to the account: " + senderWalletAddress
					);
					setAccount(null);
				} else {
					setAccount(accounts[0]);
					setError("");
				}

				// Listen for account changes
				window.ethereum.on("accountsChanged", (newAccounts) => {
					if (
						newAccounts[0] &&
						newAccounts[0].toLowerCase() !== senderWalletAddress.toLowerCase()
					) {
						setError(
							"Please connect MetaMask to the account: " + senderWalletAddress
						);
						setAccount(null);
					} else {
						setAccount(newAccounts[0] || null);
						setError("");
					}
				});

				// Listen for chain changes
				window.ethereum.on("chainChanged", (chainId) => {
					if (Number(chainId) !== 702) {
						setError(
							"Please switch to the UZH Ethereum PoW network in MetaMask."
						);
						setAccount(null);
					} else {
						setError("");
					}
				});
			} catch (err) {
				setError("Failed to connect to MetaMask. Please try again.");
				console.error(err);
			}
		};

		if (isOpen) {
			setRecipientInput(prefillRecipient || "");
			setAmount(prefillAmount || "");
			setMessage("");
			setSuccessMessage("");
			setError("");
			initWeb3();
		}
	}, [isOpen]);

	const handleConfirm = async () => {
		if (!recipientInput) {
			setError("Please enter a recipient username.");
			return;
		}
		if (!amount || isNaN(amount) || Number(amount) <= 0) {
			setError("Please enter a valid amount.");
			return;
		}
		if (!web3 || !account) {
			setError("MetaMask is not connected or wrong account selected.");
			return;
		}

		try {
			const tokenContract = new web3.eth.Contract(
				tokenABI,
				tokenContractAddress
			);
			// Convert amount to wei (assuming 18 decimals for the token)
			const amountInWei = web3.utils.toWei(amount, "ether");

			// Send transaction
			const gasPrice = await web3.eth.getGasPrice(); // Legacy gas price

			const tx = await tokenContract.methods
				.transfer(recipientWalletAddress, amountInWei)
				.send({
					from: account,
					gasPrice, 
				});
			// Call onConfirm callback with transaction details
			onConfirm(
				amount,
				message,
				senderWalletAddress,
				recipientWalletAddress,
				tx.transactionHash
			);

			// Display success message
			setSuccessMessage(
				`Successfully sent ${amount} UZHETHw${
					message ? " with message: " + message : ""
				} from ${senderWalletAddress} to ${recipientWalletAddress}! Transaction Hash: ${
					tx.transactionHash
				}`
			);
			setAmount("");
			setMessage("");
			setRecipientInput("");
			setError("");
		} catch (err) {
			setError("Transaction failed. Please check your balance and try again.");
			console.error(err);
		}
	};

	const handleClose = () => {
		setSuccessMessage("");
		setAmount("");
		setMessage("");
		setRecipientInput("");
		setError("");
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			sx={{
				"& .MuiDialog-paper": {
					minWidth: "600px",
					borderRadius: "12px",
					boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
					background: "rgba(255, 255, 255, 0.95)",
					backdropFilter: "blur(10px)",
				},
			}}
		>
			<DialogTitle
				sx={{
					textAlign: "center",
					fontWeight: "bold",
					fontSize: "1.5rem",
					color: "#1e293b",
					pb: 2,
				}}
			>
				Send Tokens
			</DialogTitle>
			<DialogContent sx={{ pt: 3, pb: 2 }}>
				{successMessage ? (
					<Box
						sx={{
							mb: 2,
							textAlign: "center",
							backgroundColor: "#ecfdf5",
							p: 2,
							borderRadius: "8px",
						}}
					>
						<Typography variant='body1'>{successMessage}</Typography>
					</Box>
				) : (
					<>
						{error && (
							<Box
								sx={{
									mb: 2,
									textAlign: "center",
									backgroundColor: "#fee2e2",
									p: 2,
									borderRadius: "8px",
								}}
							>
								<Typography variant='body1' color='error'>
									{error}
								</Typography>
							</Box>
						)}
						<Box sx={{ mb: 2, paddingTop: "22px" }}>
							<TextField
								label='Recipient Username'
								fullWidth
								value={recipientInput}
								onChange={(e) => setRecipientInput(e.target.value)}
								disabled={disableRecipient}
								variant='outlined'
								placeholder='Enter recipient username'
								sx={{
									backgroundColor: "#f1f5f9",
									borderRadius: "8px",
									"& .MuiOutlinedInput-root": {
										"& fieldset": { borderColor: "#d1d5db" },
										"&:hover fieldset": { borderColor: "#3b82f6" },
										"&.Mui-focused fieldset": { borderColor: "#3b82f6" },
									},
								}}
							/>
						</Box>
						<Box sx={{ mb: 2 }}>
							<TextField
								label='Amount of Tokens'
								type='number'
								fullWidth
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								variant='outlined'
								placeholder='Enter token amount'
								disabled={disableAmount}
								sx={{
									backgroundColor: "#f1f5f9",
									borderRadius: "8px",
									"& .MuiOutlinedInput-root": {
										"& fieldset": { borderColor: "#d1d5db" },
										"&:hover fieldset": { borderColor: "#3b82f6" },
										"&.Mui-focused fieldset": { borderColor: "#3b82f6" },
									},
								}}
							/>
						</Box>
						<Box sx={{ mb: 2 }}>
							<TextField
								label='Message (Optional)'
								fullWidth
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								variant='outlined'
								placeholder='Add a message (optional)'
								multiline
								rows={3}
								sx={{
									backgroundColor: "#f1f5f9",
									borderRadius: "8px",
									"& .MuiOutlinedInput-root": {
										"& fieldset": { borderColor: "#d1d5db" },
										"&:hover fieldset": { borderColor: "#3b82f6" },
										"&.Mui-focused fieldset": { borderColor: "#3b82f6" },
									},
								}}
							/>
						</Box>
					</>
				)}
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3, justifyContent: "flex-end", gap: 2 }}>
				<Button
					onClick={handleClose}
					color='secondary'
					sx={{
						py: 1.5,
						px: 3,
						borderRadius: "8px",
						textTransform: "none",
						backgroundColor: "#e5e7eb",
						color: "#1e293b",
						"&:hover": { backgroundColor: "#d1d5db" },
					}}
				>
					Close
				</Button>
				{!successMessage && (
					<Button
						onClick={handleConfirm}
						color='primary'
						sx={{
							py: 1.5,
							px: 3,
							borderRadius: "8px",
							textTransform: "none",
							backgroundColor: "#3b82f6",
							color: "#fff",
							"&:hover": { backgroundColor: "#2563eb" },
						}}
					>
						Send
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default TokenSendModal;
