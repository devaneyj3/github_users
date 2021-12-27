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

	const checkRequests = async () => {
		const res = await axios.get(`${rootUrl}/rate_limit`);
		const {
			rate: { remaining },
		} = res.data;
		setRequests(remaining);
	};

	useEffect(checkRequests, []);
	return (
		<GithubContext.Provider value={{ githubUser, repos, followers, requests }}>
			{children}
		</GithubContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(GithubContext);
};
