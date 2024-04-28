import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
    
    console.log(param.id ,param.token)
	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:8000/api/v1/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log("this",data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<>
			{validUrl ? (
				<div>
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default EmailVerify;