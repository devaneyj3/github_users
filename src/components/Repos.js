import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
	const { repos } = useGlobalContext();
	let languages = repos.reduce((total, item) => {
		const { language } = item;
		if (!language) return total;
		if (!total[language]) {
			total[language] = { label: language, value: 1 };
		} else
			total[language] = {
				...total[language],
				value: total[language].value + 1,
			};
		return total;
	}, {});
	languages = Object.values(languages)
		.sort((a, b) => {
			return a - b;
		})
		.slice(0, 5);
	console.log(languages);
	return (
		<section className="section">
			<Wrapper className="section-center">
				<Pie3D data={languages} />;<div></div>
				<Doughnut2D data={languages} />
				<div></div>
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

export default Repos;
