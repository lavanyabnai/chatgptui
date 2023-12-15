import { Fragment, useState, useLayoutEffect, useRef } from "react";
import { Link } from "@remix-run/react";
import { Dialog, Transition} from "@headlessui/react";

import {
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DropDownList } from "@progress/kendo-react-dropdowns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const summary = [
  {
    type: "MOM Sales Forcast Change",
    high: "23",
    medium: "54",
    low: "-",
    total: "77",
  },
  {
    type: "Unsatisfied Demand by Item",
    high: "23",
    medium: "54",
    low: "374",
    total: "374",
  },
  {
    type: "Unsatisfied Demand by Product Line",
    high: "-",
    medium: "-",
    low: "8",
    total: "8",
  },
];

const details = [
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-Apr07",
    date: "12/30/2023",
    month: "2500",
    forcast: "1",
    forechange: "99.96",
    action: "-",
    resolution: "-",
  },
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-Apr14",
    date: "12/30/2023",
    month: "2500",
    forcast: "1",
    forechange: "99.96",
    action: "-",
    resolution: "-",
  },
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-Apr21",
    date: "12/30/2023",
    month: "2500",
    forcast: "1",
    forechange: "99.96",
    action: "-",
    resolution: "-",
  },
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-Apr28",
    date: "12/30/2023",
    month: "1670",
    forcast: "2",
    forechange: "99.88",
    action: "-",
    resolution: "-",
  },
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-May05",
    date: "12/30/2023",
    month: "2500",
    forcast: "1",
    forechange: "99.96",
    action: "-",
    resolution: "-",
  },
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-May12",
    date: "12/30/2023",
    month: "2500",
    forcast: "1",
    forechange: "99.96",
    action: "-",
    resolution: "-",
  },
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-May19",
    date: "12/30/2023",
    month: "2500",
    forcast: "1",
    forechange: "99.96",
    action: "-",
    resolution: "-",
  },
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-May26",
    date: "12/30/2023",
    month: "1670",
    forcast: "2",
    forechange: "99.88",
    action: "-",
    resolution: "-",
  },
  {
    site: "Dallas",
    customer: "Best Buy",
    item: "GS25-227-2.5G",
    week: "08W14-Jun02",
    date: "12/30/2023",
    month: "1999",
    forcast: "1",
    forechange: "99.95",
    action: "-",
    resolution: "-",
  },
  {
    site: "Miami",
    customer: "Wal Mart",
    item: "LC36-2500",
    week: "08W14-Apr07",
    date: "12/30/2023",
    month: "275",
    forcast: "106",
    forechange: "61.45",
    action: "-",
    resolution: "-",
  },
  {
    site: "Miami",
    customer: "Wal Buy",
    item: "LC36-2500",
    week: "08W14-Apr14",
    date: "12/30/2023",
    month: "275",
    forcast: "106",
    forechange: "61.45",
    action: "-",
    resolution: "-",
  },
  {
    site: "Miami",
    customer: "Wal Buy",
    item: "LC36-2500",
    week: "08W14-Apr21",
    date: "12/30/2023",
    month: "275",
    forcast: "105",
    forechange: "61.82",
    action: "-",
    resolution: "-",
  },
  {
    site: "Miami",
    customer: "Wal Buy",
    item: "LC36-2500",
    week: "08W14-May05",
    date: "12/30/2023",
    month: "285",
    forcast: "105",
    forechange: "63.16",
    action: "-",
    resolution: "-",
  },
  {
    site: "Miami",
    customer: "Wal Buy",
    item: "LC36-2500",
    week: "08W14-May12",
    date: "12/30/2023",
    month: "284",
    forcast: "105",
    forechange: "63.03",
    action: "-",
    resolution: "-",
  },
  {
    site: "Miami",
    customer: "Wal Buy",
    item: "LC36-2500",
    week: "08W14-May19",
    date: "12/30/2023",
    month: "284",
    forcast: "105",
    forechange: "63.03",
    action: "-",
    resolution: "-",
  },
  {
    site: "Miami",
    customer: "Wal Buy",
    item: "LC36-2500",
    week: "08W14-Jun02",
    date: "12/30/2023",
    month: "210",
    forcast: "89",
    forechange: "57.62",
    action: "-",
    resolution: "-",
  },
];

const option = ["Price drop", "Rebate", "Tv ad"];
const status = ["Open"];
const assign = ["Admin", "Sales", "Marketing"];
const meeting = [
  "Supply Review Mfg",
  "Demand Review Mfg",
  "Executive Review Mfg",
];

const card = [
  {
    id: 1,
    name: "Exceptions",
    value: "20",
    icon: CheckBadgeIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-100",
    to: "/demo/dashboard/campaign",
  },
  {
    id: 2,
    name: "Action Items",
    icon: ShieldExclamationIcon,
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-100",
    value: "30",
    to: "/demo/dashboard/campaign",
  },
  {
    id: 3,
    name: "Alerts",
    icon: ExclamationTriangleIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-100",
    value: "50",
    to: "/demo/dashboard/campaign",
  },

  {
    id: 4,
    name: "Approvals",
    icon: CheckCircleIcon,
    iconForeground: "text-green-700",
    iconBackground: "bg-green-100",
    value: "49",
    to: "/demo/dashboard/campaign",
  },
];

export default function Example() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selecteddetails, setSelecteddetails] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selecteddetails.length > 0 && selecteddetails.length < details.length;
    setChecked(selecteddetails.length === details.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selecteddetails]);

  function toggleAll() {
    setSelecteddetails(checked || indeterminate ? [] : details);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const [openRes, setOpenRes] = useState(false);
  const [openAction, setOpenAction] = useState(false);

  return (
    <>
      <div className="w-full bg-sky-500">
        <div className="ml-4 flex h-16 items-center justify-start">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="text-3xl font-bold text-white">
                Alerts & Notification
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full px-4 py-6">
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {card.map((item) => (
              <div key={card.name} value={card}>
                <Link to={item.to} className="focus:outline ">
                  <li
                    className={classNames(
                      item.iconBackground,
                      " rounded-lg border p-4 shadow-lg "
                    )}
                  >
                    <div className="flex items-center align-middle">
                      <span
                        className={classNames(
                          item.iconBackground,
                          item.iconForeground,
                          "mr-6"
                        )}
                      >
                        <item.icon className="h-16 w-16 " />
                      </span>

                      <div className="flex flex-col justify-center">
                        <div
                          className={classNames(
                            item.iconForeground,
                            "text-base font-semibold uppercase"
                          )}
                        >
                          {item.name}
                        </div>
                        <div className="text-5xl font-medium text-gray-700">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>

      {/* border */}
      <div className="mx-4 border-b-2  border-gray-300"></div>

      <div className="mx-4 my-4 grid grid-cols-3 ">
        <div className="mr-3 rounded-lg bg-white p-4">
          {/* header */}
          <div className="rounded-lg border bg-slate-600 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1 p-4">
              <h1 className="text-xl font-semibold leading-6 text-white">
                Exception Summary
              </h1>
            </div>
            <div className="mr-2 mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                className="ml-3 inline-flex items-center rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600"
              >
                Publish
              </button>
            </div>
          </div>

          <div className="bg-white pt-4 ">
            <div className="p-4 ring-1 ring-gray-200 sm:mx-0 sm:rounded-lg ">
              <div className="items-center overflow-x-auto align-middle">
                <table className="min-w-full divide-y divide-gray-300 ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="bg-gray-100 px-2 py-3.5 text-center text-sm  font-semibold text-gray-700 ring-gray-500/10"
                      >
                        Exception Type
                      </th>
                      <th
                        scope="col"
                        className="bg-red-50 px-4 py-3.5 text-center text-sm font-semibold text-red-700 ring-red-600/10"
                      >
                        High
                      </th>
                      <th
                        scope="col"
                        className="bg-green-50 px-4 py-3.5 text-center text-sm font-semibold text-green-700 ring-green-600/20"
                      >
                        Medium
                      </th>
                      <th
                        scope="col"
                        className="bg-yellow-50 py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-yellow-600 ring-yellow-500/10 sm:pr-0"
                      >
                        Low
                      </th>
                      <th
                        scope="col"
                        className="bg-blue-50 py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-blue-600 ring-blue-500/10"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {summary.map((summary) => (
                      <tr key={summary} className="mx-2 even:bg-gray-100">
                        <td className="whitespace-nowrap p-4 text-left text-sm font-medium text-gray-900 ">
                          {summary.type}
                        </td>
                        <td className="whitespace-nowrap p-4 text-center text-sm">
                          <Link
                            href="#"
                            className="text-blue-500 hover:text-blue-900 hover:underline"
                          >
                            {summary.high}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap p-4 text-center text-sm ">
                          <Link
                            href="#"
                            className="text-blue-500 hover:text-blue-900 hover:underline"
                          >
                            {summary.medium}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap p-4 text-center text-sm">
                          <Link
                            href="#"
                            className="text-blue-500 hover:text-blue-900 hover:underline"
                          >
                            {summary.low}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm font-medium sm:pr-0">
                          <Link
                            href="#"
                            className="text-blue-500 hover:text-blue-900 hover:underline"
                          >
                            {summary.total}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Exception Details */}
        <div className="col-span-2 ml-1.5 rounded-lg">
          <div className="rounded-lg bg-white p-4 ">
            {/* header */}
            <div className="rounded-lg border bg-slate-600 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1 p-4">
                <h1 className="text-xl font-semibold leading-6 text-white">
                  Exception Details
                </h1>
              </div>
              {selecteddetails.length > 0 && (
                <div className="mr-2 mt-4 flex md:ml-4 md:mt-0">
                  <button
                    type="button"
                    className="text-md ml-3 inline-flex items-center rounded-md  bg-rose-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-rose-600 "
                    onClick={() => setOpenAction(!openAction)}
                  >
                    Link to Action
                  </button>

                  <button
                    type="button"
                    className="text-md ml-3 inline-flex items-center rounded-md  bg-rose-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-rose-600"
                    onClick={() => setOpenRes(!openRes)}
                  >
                    Resolution
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white pt-4">
              <div className="rounded-lg border p-2">
                <div className="h-[576px] overflow-y-auto p-2 align-middle ">
                  <table className="min-w-full divide-y  divide-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th
                          scope="col"
                          className="relative px-7  sm:w-12 sm:px-6"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                            ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5  text-center text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Site
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Customer
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Item
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                        >
                          Fiscal Week
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                        >
                          Date Created
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                        >
                          Previous Month Sales Forecast
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                        >
                          Sales Forecast
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                        >
                          MOM Sales Forecast change
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                        >
                          Action Items
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                        >
                          Resolution
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white">
                      {details.map((detail) => (
                        <tr key={detail} className="even:bg-gray-100">
                          <td className="relative px-7 sm:w-12 sm:px-6">
                            {selecteddetails.includes(detail) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-500" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-900"
                              value={detail.description}
                              checked={selecteddetails.includes(detail)}
                              onChange={(e) =>
                                setSelecteddetails(
                                  e.target.checked
                                    ? [...selecteddetails, detail]
                                    : selecteddetails.filter(
                                        (p) => p !== detail
                                      )
                                )
                              }
                            />
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm font-medium text-gray-900 sm:pl-0">
                            {detail.site}
                          </td>
                          <td className="whitespace-nowrap p-4 text-center text-sm text-gray-500">
                            {detail.customer}
                          </td>
                          <td className="whitespace-nowrap p-4 text-center text-sm text-gray-500">
                            {detail.item}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                            {detail.week}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                            {detail.date}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm text-gray-500 sm:pr-0">
                            {detail.month}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm text-gray-500 sm:pr-0">
                            {detail.forcast}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm text-gray-500 sm:pr-0">
                            {detail.forechange}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm text-gray-500 sm:pr-0">
                            {detail.action}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm text-gray-500 sm:pr-0">
                            {detail.resolution}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={openAction} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenAction}>
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
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-blue-900 px-4 py-4">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="py-1 text-base font-semibold leading-6 text-white">
                            Action Items
                          </Dialog.Title>

                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="text-slate-300 hover:text-white"
                              onClick={() => setOpenAction(false)}
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
                      <div className="px-4 py-2">
                        <span className="text-md block font-medium leading-6 text-gray-900">
                          Site
                        </span>
                        <div className="mt-2">
                          <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                            <p>Dallas</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <span className="text-md block font-medium leading-6 text-gray-900">
                          Customer
                        </span>
                        <div className="mt-2">
                          <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                            <p>Best Buy</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <span className="text-md block font-medium leading-6 text-gray-900">
                          Item
                        </span>
                        <div className="mt-2">
                          <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                            <p>GS25-227-2.5G</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <span className="text-md block font-medium leading-6 text-gray-900">
                          Week
                        </span>
                        <div className="mt-2">
                          <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                            <p>08W14-Apr07</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <span className="text-md block font-medium leading-6 text-gray-900">
                          Action
                        </span>

                        <div className="text-md mt-2">
                          <select
                            id="location"
                            name="location"
                            className="mt-2 block w-full rounded-md border-0 px-2 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                            defaultValue="Critical Supply Shortage"
                          >
                            <option>Critical Supply Shortage</option>
                            <option>Check Capacity increase</option>
                            <option>MOM Change</option>
                            <option>NPI Review</option>
                            <option>Prepare a quarterly summary</option>
                            <option>Fix Demand Mismatch</option>
                          </select>

                          {/* <DropDownList
                            style={{
                              width: "415px",
                              height: "40px",
                            }}
                            data={des}
                            defaultValue="Critical Supply Shortage"
                          /> */}
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <label
                          htmlFor="value"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Due Date
                        </label>
                        <div className="mt-2">
                          <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                            <p>9/5/2023</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <label
                          htmlFor="value"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Assigned To
                        </label>

                        <div className="text-md mt-2">
                          <DropDownList
                            style={{
                              width: "415px",
                              height: "40px",
                            }}
                            data={assign}
                            defaultValue="Admin"
                          />
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <label
                          htmlFor="value"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Status
                        </label>

                        <div className="text-md mt-2">
                          <DropDownList
                            style={{
                              width: "415px",
                              height: "40px",
                            }}
                            data={status}
                            defaultValue="Open"
                          />
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <label
                          htmlFor="value"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Meeting
                        </label>

                        <div className="text-md mt-2">
                          <DropDownList
                            style={{
                              width: "415px",
                              height: "40px",
                            }}
                            data={meeting}
                            defaultValue="Supply Review Mfg"
                          />
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <label
                          htmlFor="description"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Comments
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-shrink-0 justify-center px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md  bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset  ring-gray-300
                        hover:bg-indigo-600"
                        onClick={() => setOpenAction(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 "
                      >
                        Create Action
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openRes} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenRes}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
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
                    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-blue-900 px-4 py-4">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="py-1 text-base font-semibold leading-6 text-white">
                              Resolution Options
                            </Dialog.Title>

                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md  text-slate-300 hover:text-white"
                                onClick={() => setOpenRes(false)}
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

                        <div className="px-4 py-2">
                          <span className="text-md block font-medium leading-6 text-gray-900">
                            Site
                          </span>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>Dallas</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <span className="text-md block font-medium leading-6 text-gray-900">
                            Customer
                          </span>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>Best Buy</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <span className="text-md block font-medium leading-6 text-gray-900">
                            Item
                          </span>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>GS25-227-2.5G</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <span className="text-md block font-medium leading-6 text-gray-900">
                            Week
                          </span>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>08W14-Apr07</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <span className="text-md block font-medium leading-6 text-gray-900">
                            Resolution
                          </span>

                          <div className="text-md mt-2">
                            <DropDownList
                              style={{
                                width: "420px",
                                height: "40px",
                              }}
                              data={option}
                              defaultValue="Price drop"
                            />
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <label
                            htmlFor="value"
                            className="text-md block font-medium leading-6 text-gray-900"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>Initiate Price drop</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <label
                            htmlFor="value"
                            className="text-md block font-medium leading-6 text-gray-900"
                          >
                            Count
                          </label>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>2</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-2">
                          <label
                            htmlFor="value"
                            className="text-md block font-medium leading-6 text-gray-900"
                          >
                            Measure
                          </label>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>Consensus Forecast</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <label
                            htmlFor="value"
                            className="text-md block font-medium leading-6 text-gray-900"
                          >
                            Value
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="value-name"
                              id="value-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                            />
                          </div>
                        </div>
                        <div className="px-4 py-2">
                          <label
                            htmlFor="description"
                            className="text-md block font-medium leading-6 text-gray-900"
                          >
                            Notes
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="description"
                              name="description"
                              rows={4}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-shrink-0 justify-center px-4 py-4">
                        <button
                          type="button"
                          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600"
                          onClick={() => setOpenRes(false)}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600"
                        >
                          Resolve Exception
                        </button>
                      </div>
                    </form>
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
