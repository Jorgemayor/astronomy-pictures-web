import React, { useState, useEffect } from "react"
import { getPictures, columns, formatRowData } from "./data"
import Table from "../components/table/table"

const Home = () => {
	const [pageData, setPageData] = useState({
		rowData: [],
		isLoading: false,
		totalPages: 0,
		totalPictures: 100,
	})
	
	const [currentPage, setCurrentPage] = useState(1)
	const [currentLimit, setCurrentLimit] = useState(10)
	
	useEffect(() => {
		setPageData(prevState => ({
			rowData: [],
			isLoading: true,
			totalPages: prevState.totalPages,
			totalPictures: prevState.totalPictures,
		}))
		
		getPictures(currentPage, currentLimit).then((data) => {
			const { totalPages, totalDocs: totalPictures, docs: pictures } = data
			
			pictures.map(picture => {
				picture.url = (<a href={picture.url}>{picture.url}</a>)
				picture.hdurl = (<a href={picture.hdurl}>{picture.hdurl}</a>)
				return picture
			})
			
			setPageData({
				rowData: formatRowData(pictures),
				isLoading: false,
				totalPages,
				totalPictures,
			})
		})
	}, [currentPage, currentLimit])
	
	return (
		<div>
			<p>Total Pictures: {pageData.totalPictures || "Loading..."}</p>
			<div style={{ height: "600px" }}>
				<Table
					columns={columns}
					data={pageData.rowData}
					isLoading={pageData.isLoading}
				/>
			</div>
			{/*<Pagination
				totalRows={pageData.totalPictures}
				pageChangeHandler={setCurrentPage}
				rowsPerPage={currentLimit}
			/>*/}
		</div>
	)
}

export default Home
