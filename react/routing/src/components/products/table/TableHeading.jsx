import React from "react";

export const TableHeading = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Quantity Per Unit
        </th>
        <th scope="col" className="px-6 py-3">
          Unit Price
        </th>
      </tr>
    </thead>
  );
};
