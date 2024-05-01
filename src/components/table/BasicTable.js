import React from "react";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { basicTableData } from "./bsaicTableData";

export const BasicTable = () => {
  const data = basicTableData;

  const columns = [
    { header: "Brand", accessorKey: "model" },
    { header: "#Phones", accessorKey: "phones" },
  ];

  const table = useReactTable({ data, columns,getCoreRowModel:getCoreRowModel() });
  return (
    <div>
      <table style={{width:"100%"}}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} >
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{textAlign:"center"}}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
