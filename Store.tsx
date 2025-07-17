import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Fade,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { ShoppingBag, Sparkles, User } from "lucide-react";
import TokenSendModal from "../../components/TokenSendModal/TokenSendModal";
import "./store.css";
import { ArrowLeft } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
const items = [
	{
		id: 1,
		name: "Coffee",
		price: "10",
		username: "coffee_seller",
		image:
			"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop",
	},
	{
		id: 2,
		name: "Leave Day",
		price: "50",
		username: "hr_department",
		image:
			"https://images.unsplash.com/photo-1610017385495-59df08c3c8c2?w=300&h=200&fit=crop&q=80&auto=format",
	},
	{
		id: 3,
		name: "Wellness Session",
		price: "100",
		username: "wellness_centre_cpt",
		image:
			"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop&q=60&auto=format",
	},
];

function StorePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();


  const handleBuy = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleConfirm = (amount, message, from, to, txHash) => {
    console.log("Confirmed transaction:", {
      amount,
      message,
      from,
      to,
      txHash,
    });
    setModalOpen(false);
  };

  return (
		<Box
			sx={{
				minHeight: "100vh",
				background: `
          radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 100%)
        `,
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Animated background elements */}
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
					animation: "float 20s ease-in-out infinite alternate",
					"@keyframes float": {
						"0%": { transform: "translateY(0px)" },
						"100%": { transform: "translateY(-20px)" },
					},
				}}
			/>
			<Button
				onClick={() => navigate(-1)}
				startIcon={<ArrowLeft />}
				variant='text'
				sx={{
					position: "absolute",
					top: { xs: 16, sm: 32 }, 
					left: 5,
					color: "#ffff",
					textTransform: "none",
					fontSize: "1rem",
				}}
			/>
			<Container
				maxWidth='lg'
				sx={{
					position: "relative",
					zIndex: 1,
					py: { xs: 4, sm: 6 },
					display: "flex",
					flexDirection: "column",
					alignItems: "center", 
				}}
			>
				{/* Header Section */}
				<Box
					sx={{
						textAlign: "center",
						mb: 6,
						width: "100%", 
					}}
				>
					<Fade in timeout={800}>
						<Box
							sx={{
								display: "inline-flex",
								alignItems: "center",
								gap: 2,
								mb: 2,
							}}
						>
							<ShoppingBag size={48} color='#fff' />
							<Typography
								variant='h2'
								sx={{
									color: "#fff",
									fontWeight: 800,
									background: "linear-gradient(45deg, #fff, #e0e7ff)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									fontSize: { xs: "2.5rem", sm: "3.5rem" },
									letterSpacing: "-0.02em",
								}}
							>
								Store
							</Typography>
						</Box>
					</Fade>
					<Fade in timeout={1000}>
						<Typography
							variant='h6'
							sx={{
								color: "rgba(255, 255, 255, 0.8)",
								fontWeight: 400,
								maxWidth: "500px",
								mx: "auto",
								fontSize: { xs: "1rem", sm: "1.25rem" },
							}}
						>
							Redeem your WorkEth Tokens for real world rewards here
						</Typography>
					</Fade>
				</Box>

				{/* Items Grid */}
				<Grid
					container
					spacing={3} 
					justifyContent='center' 
				>
					{items.map((item, index) => (
						<Grid item xs={12} sm={6} md={4} key={item.id}>
							<Fade in timeout={1200 + index * 200}>
								<Card
									onMouseEnter={() => setHoveredItem(item.id)}
									onMouseLeave={() => setHoveredItem(null)}
									sx={{
										height: "100%",
										width: "100%", 
										maxWidth: 360, 
										background: "rgba(255, 255, 255, 0.1)",
										backdropFilter: "blur(20px)",
										border: "1px solid rgba(255, 255, 255, 0.2)",
										borderRadius: 3,
										overflow: "hidden",
										position: "relative",
										transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
										cursor: "pointer",
										"&:hover": {
											transform: "translateY(-12px) scale(1.02)",
											boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
											border: "1px solid rgba(255, 255, 255, 0.4)",
										},
										mx: "auto", 
									}}
								>
									{/* Hover overlay */}
									<Box
										sx={{
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											background:
												"linear-gradient(45deg, rgba(120, 119, 198, 0.1), rgba(255, 119, 198, 0.1))",
											opacity: hoveredItem === item.id ? 1 : 0,
											transition: "opacity 0.3s ease",
											zIndex: 1,
										}}
									/>

									{/* Featured badge for NFT */}
									{item.name.includes("NFT") && (
										<Chip
											icon={<Sparkles size={16} />}
											label='Featured'
											sx={{
												position: "absolute",
												top: 12,
												right: 12,
												zIndex: 2,
												background: "linear-gradient(45deg, #ff6b6b, #ffd93d)",
												color: "#fff",
												fontWeight: 600,
												fontSize: "0.75rem",
											}}
										/>
									)}

									<CardMedia
										component='img'
										height='240'
										image={item.image}
										alt={item.name}
										sx={{
											objectFit: "cover",
											transition: "transform 0.4s ease",
											transform:
												hoveredItem === item.id ? "scale(1.1)" : "scale(1)",
										}}
									/>

									<CardContent
										sx={{
											position: "relative",
											zIndex: 2,
											p: 3,
											background: "rgba(255, 255, 255, 0.05)",
											backdropFilter: "blur(10px)",
										}}
									>
										{/* Seller info */}
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												gap: 1,
												mb: 2,
											}}
										>
											<Avatar
												sx={{
													width: 24,
													height: 24,
													background:
														"linear-gradient(45deg, #667eea, #764ba2)",
													fontSize: "0.75rem",
												}}
											>
												<User size={14} />
											</Avatar>
											<Typography
												variant='caption'
												sx={{
													color: "rgba(255, 255, 255, 0.7)",
													fontWeight: 500,
												}}
											>
												@{item.username}
											</Typography>
										</Box>

										{/* Item name */}
										<Typography
											variant='h6'
											sx={{
												color: "#fff",
												fontWeight: 700,
												mb: 2,
												fontSize: "1.1rem",
											}}
										>
											{item.name}
										</Typography>

										{/* Price and buy button */}
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: 2,
											}}
										>
											<Box>
												<Typography
													variant='h5'
													sx={{
														color: "#fff",
														fontWeight: 800,
														fontSize: "1.5rem",
													}}
												>
													{item.price}
												</Typography>
												<Typography
													variant='caption'
													sx={{
														color: "rgba(255, 255, 255, 0.6)",
														fontWeight: 500,
													}}
												>
													UZHETHw
												</Typography>
											</Box>

											<Button
												variant='contained'
												onClick={() => handleBuy(item)}
												sx={{
													background:
														"linear-gradient(45deg, #667eea, #764ba2)",
													color: "#fff",
													fontWeight: 600,
													px: 3,
													py: 1,
													borderRadius: 2,
													textTransform: "none",
													fontSize: "0.95rem",
													transition: "all 0.3s ease",
													"&:hover": {
														background:
															"linear-gradient(45deg, #5a67d8, #6b46c1)",
														transform: "translateY(-2px)",
														boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
													},
												}}
											>
												Buy Now
											</Button>
										</Box>
									</CardContent>
								</Card>
							</Fade>
						</Grid>
					))}
				</Grid>

				{/* Footer text */}
				<Fade in timeout={2000}>
					<Box
						sx={{
							textAlign: "center",
							mt: 6,
							py: 3,
						}}
					>
						<Typography
							variant='body2'
							sx={{
								color: "rgba(255, 255, 255, 0.6)",
								fontWeight: 400,
							}}
						>
							Secure transactions powered by blockchain technology
						</Typography>
					</Box>
				</Fade>
			</Container>

			{selectedItem && (
				<TokenSendModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					onConfirm={handleConfirm}
					prefillRecipient={selectedItem.username}
					prefillAmount={selectedItem.price}
					disableRecipient
					disableAmount
				/>
			)}
		</Box>
	);
}

export default StorePage;
