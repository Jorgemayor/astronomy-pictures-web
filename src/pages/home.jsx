import React, { useState, useEffect } from "react"
import { getPictures, columns, formatData } from "./data"
import Table from "../components/table/table"
import { useForm } from "react-hook-form"
import "./styles.css"

const Home = () => {
	const [pageData, setPageData] = useState({
		rowData: [],
		isLoading: false,
		totalPages: 10,
		totalPictures: 0,
	})
	
	const [currentPage, setCurrentPage] = useState(1)
	const [currentLimit, setCurrentLimit] = useState(10)
	
	const pages = Array.from({length: pageData.totalPages}, (_, i) => i + 1)
	
	const { register, handleSubmit } = useForm();
	const [dataForm, setDataForm] = useState("");
	
	
	useEffect(() => {
		setPageData(prevState => ({
			rowData: [],
			isLoading: true,
			totalPages: prevState.totalPages,
			totalPictures: prevState.totalPictures,
		}))
		
		getPictures(currentPage, currentLimit).then((data) => {
			const { totalPages, totalDocs: totalPictures, docs: pictures } = data
			
			setPageData({
				rowData: formatData(pictures),
				isLoading: false,
				totalPages,
				totalPictures,
			})
			if (currentPage > totalPages) {
				setCurrentPage(1)
			}
		})
	}, [currentPage, currentLimit])
	
	return (
		<div>
			<p>Total Pictures: {pageData.totalPictures || ""}</p>
			<label htmlFor="page"> Page </label>
			<select id="page" onChange={(e) => setCurrentPage(e.target.value)}>
				{
					pages.map((item) =>
						<option value={item}>{item}</option>
					)
				}
			</select>
			<label htmlFor="limit"> Limit </label>
			<select id="limit" onChange={(e) => setCurrentLimit(e.target.value)}>
				<option value={10}>{10}</option>
				<option value={15}>{15}</option>
				<option value={20}>{20}</option>
			</select>
			{/*<form onSubmit={handleSubmit((dataForm) => setData(JSON.stringify(dataForm)))}>
				<input {...register("firstName")} placeholder="First name" />
				
				<textarea {...register("aboutYou")} placeholder="About you" />
				<p>{dataForm}</p>
				<input type="submit" />
			</form>*/}
			<div className="home">
				{pageData.isLoading ? (
					<h2>Loading pictures...</h2>
				) : (
				<Table
					columns={columns}
					data={pageData.rowData}
				/>)}
			</div>
		</div>
	)
}

export default Home
