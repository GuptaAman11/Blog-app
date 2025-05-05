import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
    
    console.log(param.token)
	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `${process.env.REACT_APP_API_URL}/api/v1/users/verify/${param?.token}`;
				const { data } = await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			{validUrl ? (
				<div className="text-center bg-white p-10 rounded shadow-md">
					<h1 className="text-2xl font-bold text-green-600 mb-4">Email verified successfully</h1>
					<Link to="/login">
						<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">
							Login
						</button>
					</Link>
				</div>
			) : (
				<div className="text-center bg-white p-10 rounded shadow-md">
					<h1 className="text-2xl font-bold text-red-600 mb-4">404 Not Found</h1>
					<p className="text-gray-500">The verification link is invalid or has expired.</p>
				</div>
			)}
		</div>
	);
};

export default EmailVerify;