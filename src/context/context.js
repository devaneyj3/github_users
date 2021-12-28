import React, { useContext, useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

export const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	const [requests, setRequests] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: "" });

	const searchGithubUser = async (user) => {
		toggleError(false, "");
		setLoading(true);
		const res = await axios.get(`${rootUrl}/users/${user}`).catch((err) => {
			console.log(err);
		});
		if (res) {
			setGithubUser(res.data);
		} else {
			toggleError(true, "No User Found");
		}
		checkRequests();
		setLoading(false);
	};

	const checkRequests = async () => {
		const res = await axios.get(`${rootUrl}/rate_limit`);
		let {
			rate: { remaining },
		} = res.data;
		setRequests(remaining);
		if (remaining === 0) {
			toggleError(true, "sorry, you have exceeded your rate limit");
		}
	};

	const toggleError = (show = false, msg = "") => {
		setError({ msg, show });
	};

	useEffect(checkRequests, []);
	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				error,
				loading,
				searchGithubUser,
			}}>
			{children}
		</GithubContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(GithubContext);
};
