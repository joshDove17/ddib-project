import { useState } from "react";
import { Container, Fade } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function LoginPage() {
	const [showLogin, setShowLogin] = useState(true);

	const toggleForm = () => {
		setShowLogin(!showLogin);
	};

	return (
		<Container
			maxWidth='sm'
			sx={{
				minHeight: "100vh",
				minWidth: "100vw",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, #F5F5F5 0%, #DDD6FE 100%)",
			}}
		>
			<Fade in timeout={600}>
				<div>
					{showLogin ? (
						<LoginForm onToggleForm={toggleForm} />
					) : (
						<RegisterForm onToggleForm={toggleForm} />
					)}
				</div>
			</Fade>
		</Container>
	);
}

export default LoginPage;
