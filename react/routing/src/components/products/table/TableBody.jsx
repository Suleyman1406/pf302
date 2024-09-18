import React from "react";

export const TableBody = ({ products }) => {
  return (
    <tbody>
      {products.map((product) => (
        <tr
          key={product.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {product.id}
          </th>
          <td className="px-6 py-4">{product.name}</td>
          <td className="px-6 py-4">{product.quantityPerUnit}</td>
          <td className="px-6 py-4">${product.unitPrice}</td>
        </tr>
      ))}
    </tbody>
  );
};
