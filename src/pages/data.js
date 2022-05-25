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

const formatRowData = (rawData) =>
	rawData.map((data) => ({
		title: data.title,
		explanation: data.explanation,
		url: data.url,
		hdurl: data.hdurl,
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

export { columns, formatRowData, getPictures }
