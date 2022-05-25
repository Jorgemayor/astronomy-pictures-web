import React, { useMemo } from "react"
import { useTable } from "react-table"
import styles from "./styles.css"

const Table = ({ columns, data, isLoading, manualPagination = false }) => {
  const columnData = useMemo(() => columns, [columns])
  const rowData = useMemo(() => data, [data])
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columnData,
    data: rowData,
    manualPagination,
  })
  
  return (
    <>
      {isLoading ? (
        <h2>Loading pictures...</h2>
      ) : (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default Table
