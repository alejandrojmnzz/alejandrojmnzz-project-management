import React, { useEffect } from "react"
import '../index.css'
import { CreateProject } from "../components/CreateProject";

export const Home = () => {


	return (
		<>
			<div className="container d-flex justify-content-center">
				<h1>Project Management</h1>
			</div>
			<CreateProject />
		</>

	);
}; 