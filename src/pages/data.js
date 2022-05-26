import React from "react";

const columns = [
	{
		Header: "Title",
		accessor: "title",
	},
	{
		Header: "Explanation",
		accessor: "explanation",
	},
	{
		Header: "URL",
		accessor: "url",
	},
	{
		Header: "HDURL",
		accessor: "hdurl",
	},
]

const formatData = (data) =>
	data.map(picture => ({
		title: picture.title,
		explanation: picture.explanation,
		url: (<a href={picture.url}>{picture.url}</a>),
		hdurl: (<a href={picture.hdurl}>{picture.hdurl}</a>),
	}))

const getPictures = async (page= 1, limit=10) => {
	try {
		const response = await fetch(
			`http://localhost:3333/pictures?page=${page}&limit=${limit}`
		)
		return await response.json()
	} catch (error) {
		console.log()
	}
}

export { columns, formatData, getPictures }
