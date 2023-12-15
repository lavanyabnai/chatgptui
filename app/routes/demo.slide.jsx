import { React, Fragment, useState } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import {
  Form,
  useLoaderData,
  useSearchParams,
  Link,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import {
  XMarkIcon,
  PlusSmallIcon,
  MinusSmallIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/20/solid";

import { WrapperSalesGrid } from "~/kendo/grid/WrapperGrid2";
import { json } from "@remix-run/node";
import { getDemand, getDemandListItems } from "~/models/demand.server";
import { Button } from "@progress/kendo-react-buttons";

const CUSTOMER = [
  "Benelux",
  "France",
  "Germany",
  "Italy",
  "Nordics",
  "Spain",
  "UK",
];
const SITE = [
  "HALOL I",
  "Paonta",
  "Dewas",
  "HALOL II",
  "Halol I",
  "re-packing",
  "Mohali",
  "Goa",
  "Dadra",
];
const BUCKET = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export async function loader({ request }) {
  const url = new URL(request.url);
  const customer = url.searchParams.get("cust");
  const site = url.searchParams.get("site");
  const bucket = Number(url.searchParams.get("bucket"));

  let demandQuery = {};

  // Add conditions based on the parameters
  if (customer !== null) {
    demandQuery = { ...demandQuery, customer };
  }

  if (site !== null) {
    demandQuery = { ...demandQuery, site };
  }

  if (bucket !== null) {
    demandQuery = { ...demandQuery, bucket };
  }

  const data = await getDemand(demandQuery);

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ data });
}

export default function SalesTest() {
  const { data } = useLoaderData();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [site, setSite] = useState("");
  const [bucket, setBucket] = useState("");
  console.log(data);
  // const submit = useSubmit();

  // const [searchParams] = useSearchParams();
  //  const authMode = searchParams.get("mode") || "customer"||"site"||"bucket";
  //     const q = searchParams.get("q") || "";
  const isSubmitting = navigation.state !== "idle";

  // const customerValue = searchParams.get("cust") || "";
  // const siteValue = searchParams.get("site") || "";
  // const bucketValue = searchParams.get("bucket") || "";
  // console.log(customerValue);

  return (
    <>
      {/* <div className="w-full bg-sky-500">
        <div className="ml-4 flex h-16 items-center justify-start">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="text-3xl font-bold text-white">
                Test Dashboard
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        <Form
          method="get"
          className="m-4 rounded-lg bg-white p-2 shadow-md"
          id="auth-form"
        >
          <label
            htmlFor="customer"
            className="text-md block py-4 font-medium leading-6 text-gray-900"
          >
            Customer
            <select
              id="customer"
              name="cust"
              value={customer}
              className="mt-2 flex w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
              onChange={(e) => setCustomer(e.target.value)}
            >
              <option />
              {CUSTOMER.map((customer) => (
                <option key={customer} value={customer}>
                  {customer}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="site"
            className="text-md block font-medium leading-6 text-gray-900"
          >
            Site
            <select
              id="site"
              name="site"
              value={site}
              className="mt-2 flex w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
              onChange={(e) => setSite(e.target.value)}
            >
              <option />
              {SITE.map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="bucket"
            className="text-md block font-medium leading-6 text-gray-900"
          >
            Bucket
            <select
              id="bucket"
              name="bucket"
              value={bucket}
              className="mt-2 flex w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
              onChange={(e) => setBucket(e.target.value)}
            >
              <option />
              {BUCKET.map((bucket) => (
                <option key={bucket} value={bucket}>
                  {bucket}
                </option>
              ))}
            </select>
          </label>

          {/* <button
            type="submit"
            className="m-2  rounded-lg bg-blue-500 p-1 text-white"
          >
            
            <Link to={`?cust=${customer}&site=${site}&bucket=${bucket}`}>
              Route Change
            </Link>
          </button> */}
          {/* <button
            type="submit "
            className="rounded-lg  bg-blue-500 p-1 text-white  "
          >
            Search
          </button> */}

          <button
            type="button"
            className="top-15 fixed right-0 flex cursor-pointer items-center 
                rounded-l-lg border bg-white px-2 py-4 text-sm font-semibold text-gray-900 shadow-xl hover:bg-rose-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setOpen(!open)}
          >
            <AdjustmentsHorizontalIcon
              className="h-5 w-5 items-center"
              aria-hidden="true"
            />
          </button>
          <div className="m-2">
            {/* charts */}
            <div role="list" className=" grid grid-cols-1 gap-6 ">
              <div className="mr-10 rounded-lg bg-white p-2 shadow-xl shadow-slate-900/10">
                <div className=" m-2 rounded-lg  bg-white">
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <div className="rounded-lg border bg-slate-600 md:flex md:items-center md:justify-between">
                          <div className=" flex-1 px-2">
                            <h1 className="text-2xl font-medium leading-6 text-white ">
                              Sales Grid Details
                            </h1>
                          </div>

                          <Disclosure.Button className="inline-flex items-center text-white ">
                            <div className="m-2">
                              {open ? (
                                <MinusSmallIcon
                                  className="h-8 w-8"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmallIcon
                                  className="h-8 w-8"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                          </Disclosure.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1"
                        >
                          <Disclosure.Panel className="pt-4">
                            <div className="grid grid-cols-1">
                              <div className="rounded-lg border p-1">
                                <WrapperSalesGrid data={data} />
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        className="mt-2 flex w-full rounded-md border p-2 "
        required
      />
      <button disabled={isSubmitting}>
        {isSubmitting ? "Cancelling...." : "Submit"}
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-blue-900 px-4 py-4">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="py-1 text-base font-semibold leading-6 text-white">
                              Create Scenario
                            </Dialog.Title>

                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md  text-slate-300 hover:text-white"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 pt-2">
                          <Form method="GET" id="my-form">
                            <label
                              htmlFor="customer"
                              className="text-md block py-4 font-medium leading-6 text-gray-900"
                            >
                              Customer
                              <select
                                id="customer"
                                name="customer"
                                value={customer}
                                className="mt-2 flex w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                onChange={(e) => setCustomer(e.target.value)}
                              >
                                <option />
                                {CUSTOMER.map((customer) => (
                                  <option key={customer} value={customer}>
                                    {customer}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label
                              htmlFor="site"
                              className="text-md block font-medium leading-6 text-gray-900"
                            >
                              Site
                              <select
                                id="site"
                                name="site"
                                value={site}
                                className="mt-2 flex w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                onChange={(e) => setSite(e.target.value)}
                              >
                                <option />
                                {SITE.map((site) => (
                                  <option key={site} value={site}>
                                    {site}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label
                              htmlFor="bucket"
                              className="text-md block font-medium leading-6 text-gray-900"
                            >
                              Bucket
                              <select
                                id="bucket"
                                name="bucket"
                                value={bucket}
                                className="mt-2 flex w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                onChange={(e) => setBucket(e.target.value)}
                              >
                                <option />
                                {BUCKET.map((bucket) => (
                                  <option key={bucket} value={bucket}>
                                    {bucket}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </Form>

                          <div className="mb-2 border-b p-2"></div>
                        </div>
                      </div>
                      <div className="flex justify-center p-2">
                        <button
                          type="button"
                          className="text-md rounded-md border bg-indigo-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-600"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          // <Link to={`?cust=${customer}&site=${site}&bucket=${bucket}`}>
                          Form="my-form"
                          type="submit"
                          className="text-md ml-2 inline-flex justify-center rounded-md bg-rose-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-rose-600"
                           
                          disabled={isSubmitting}
                          {...(isSubmitting ? "Cancelling...." : "Submit")}
                        >
                         
                          Create
                          
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
