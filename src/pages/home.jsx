import React, { useState, useEffect } from "react"
import { getPictures, columns, formatData } from "./data"
import Table from "../components/table/table"
import {Container, Col, Form, Row} from "react-bootstrap"
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
		<Container>
			<Row>
				<p>Total Pictures: {pageData.totalPictures || ""}</p>
			</Row>
			
			<Form>
				<Row className="mb-3">
					<Col>
						<Form.Label htmlFor="page"> Page </Form.Label>
						<Form.Select id="page" onChange={(e) => setCurrentPage(e.target.value)}>
							{
								pages.map((item) =>
									<option value={item}>{item}</option>
								)
							}
						</Form.Select>
					</Col>
					<Col>
						<Form.Label htmlFor="limit"> Limit </Form.Label>
						<Form.Select id="limit" onChange={(e) => setCurrentLimit(e.target.value)}>
							<option value={10}>{10}</option>
							<option value={15}>{15}</option>
							<option value={20}>{20}</option>
						</Form.Select>
					</Col>
				</Row>
			</Form>
			
			<Row className="home">
				{pageData.isLoading ? (
					<h2>Loading pictures...</h2>
				) : (
				<Table
					columns={columns}
					data={pageData.rowData}
				/>)}
			</Row>
		</Container>
	)
}

export default Home
