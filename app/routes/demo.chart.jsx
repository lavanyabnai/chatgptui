/* eslint-disable no-unused-vars */
import { React, Fragment, useState, useEffect, useCallback } from "react";
import {
  Form,
  useLoaderData,
  useSearchParams,
  Link,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { getCountryForecast, getDemand } from "~/models/demand.server";
import CardLayout from "~/components/CardLayout";
import WrapperMultiColumnChart from "~/kendo/charts/column/WrapperColumnChart";
import { dataJsonIcon } from "@progress/kendo-svg-icons";

// const mktFcstQtys = dataInput.map((item) => item._sum.mkt_fcst_qty);
// const series = columnSeriesData("", mktFcstQtys)

const CUSTOMER = [
  "Benelux",
  "France",
  "Germany",
  "Italy",
  "Nordics",
  "Spain",
  "UK",
];

export async function loader({ request }) {
  const url = new URL(request.url);
  const customer = url.searchParams.get("cust");

  const dataInput = await getCountryForecast(
    "Benelux",
    "France",
    "Germany",
    "Italy",
    "Nordics",
    "Spain",
    "UK",
    { customer }
  );

  if (!dataInput) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ dataInput });
}

function columnSeriesData(dataInput) {
  const transformedData = {};

  dataInput.forEach((item) => {
    const customer = item.customer;
    const qty = item._sum.mkt_fcst_qty;

    if (!transformedData[customer]) {
      transformedData[customer] = [];
    }

    transformedData[customer].push(qty);
  });

  const result = Object.keys(transformedData).map((customer) => ({
    name: customer,
    dataInput: transformedData[customer],
  }));
  return result;
}

export default function SalesTest() {
  const { dataInput } = useLoaderData();
  const series = columnSeriesData(dataInput);

  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  const [customers, setCustomers] = useState("");
  const buckets = dataInput.map((item) => item.bucket);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/path/to/your/api?cust=${customers}`
        // &site=${site}&bucket=${bucket}
      );
      const result = await response.json();
      filteredData(result.dataInput); // Update filtered data
    };

    fetchData();
  }, [customers, filteredData]);

  console.log(filteredData);
  return (
    <>
      <div className="w-full bg-sky-500">
        <div className="ml-4 flex h-16 items-center justify-start">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="text-3xl font-bold text-white">
                Chart Test Dashboard
              </div>
            </div>
          </div>
        </div>
      </div>
      <Form
        method="GET"
        className="flex items-center justify-between rounded-lg bg-white p-2 shadow-md"
        id="auth-form"
      >
        <label
          htmlFor="customers"
          className="text-md block py-4 font-medium leading-6 text-gray-900"
        >
          Customer
          <select
            id="customers"
            name="customers"
            value={customers}
            className="mt-2 flex w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            onChange={(e) => setCustomers(e.target.value)}
          >
            <option />
            {CUSTOMER.map((customer) => (
              <option key={customer} value={customer}>
                {customer}
              </option>
            ))}
          </select>
        </label>

        <button
          className="my-4 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </Form>
      <main>
        <WrapperMultiColumnChart category={buckets} series={series} />
        {/* <WrapperMultiColumnChart
          category={buckets}
          series={series(dataInput)}
        /> */}
      </main>
    </>
  );
}

// export async function loader({ params }) {
//   const dataInput = await getCountryForecast(
//     "Spain",
//     "Benelux",
//     "France",
//     "Germany",
//     "Italy",
//     "Nordics",
//     "UK"
//   );
//   if (!dataInput) {
//     throw new Response("Not Found", { status: 404 });
//   }
//   return json({ dataInput });
// }

// function columnSeriesData(data) {
//   const transformedData = {};

//   // Loop through the data to group it by customer
//   data.forEach((item) => {
//     const customer = item.customer;
//     const qty = item._sum.mkt_fcst_qty;

//     if (!transformedData[customer]) {
//       transformedData[customer] = [];
//     }

//     transformedData[customer].push(qty);
//   });

//   // Transform the object into the desired format
//   const result = Object.keys(transformedData).map((customer) => ({
//     name: customer,
//     data: transformedData[customer],
//   }));
//   return result;
// }

// export default function SalesTest() {
//   const { dataInput } = useLoaderData();
//   const series = columnSeriesData(dataInput);
//   const buckets = dataInput.map((item) => item.bucket);
//   return (
//     <main>
//       {" "}
//       <WrapperMultiColumnChart category={buckets} series={series} />
//     </main>
//   );
// }
