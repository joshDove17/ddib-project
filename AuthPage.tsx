import React, { useState } from "react";
import { Container } from "@mui/material";
import "./AuthPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const AuthPage: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true);

	const toggleForm = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div className='auth-root'>
			<Container maxWidth='sm'>
				{isLogin ? (
					<LoginForm onToggleForm={toggleForm} />
				) : (
					<RegisterForm onToggleForm={toggleForm} />
				)}
			</Container>
		</div>
	);
};

export default AuthPage;
