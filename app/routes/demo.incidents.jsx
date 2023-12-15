import { Fragment } from "react";
import { Link } from "@remix-run/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
const people = [
  {
    status: CheckCircleIcon,
    color: "text-rose-500",
    type: "[Sample] Fulfilment",
    des: "50% Inward Pendency of stock is reported at FC #101",
  },
  {
    status: CheckCircleIcon,
    color: "text-gray-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
  {
    status: CheckCircleIcon,
    color: "text-yellow-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
  {
    status: CheckCircleIcon,
    color: "text-yellow-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
  {
    status: CheckCircleIcon,
    color: "text-rose-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
  {
    status: CheckCircleIcon,
    color: "text-yellow-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
  {
    status: CheckCircleIcon,
    color: "text-rose-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
  {
    status: CheckCircleIcon,
    color: "text-yellow-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
  {
    status: CheckCircleIcon,
    color: "text-rose-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
  {
    status: CheckCircleIcon,
    color: "text-yellow-500",
    type: "[Sample] High Driver",
    des: "In the past 1 hour, Driver #1467 has canceled 4 booking requests",
  },
];
const tabs = [
  { name: "My Incidents", href: "#", count: "52", current: false },
  { name: "Team Incidents", href: "#", count: "6", current: true },
  { name: "Org Incidents", href: "#", count: "4", current: false },
];

//  let [businessTab] = [useState({

//      { name: "Dashboard" },
//      { name: "Financial Plan" },
//      { name: "Income Statement" },
//  })];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <>
      <div className="w-full bg-sky-500">
        <div className="ml-4 flex h-16 items-center justify-start">
          <div className="text-3xl font-bold text-white">Incidents</div>
        </div>
      </div>
      <div className="m-4 rounded-lg border bg-slate-600 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1 p-4">
          <h1 className="text-xl font-semibold leading-6 text-white">
            Ticket Summary
          </h1>
        </div>
      </div>

      <div className="m-4 rounded-lg bg-white p-4 shadow-lg">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>

          <select
            id="tabs"
            name="tabs"
            className="block w-full  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>

        <div className="isolate flex justify-end">
          <Tab.Group className="flex-1">
            <Tab.List className="hidden sm:block">
              {tabs.map((tab, tabIdx) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      "group relative min-w-0 flex-1 border bg-white p-4 text-center text-sm font-semibold outline-none hover:bg-gray-100 focus:z-10",
                      selected
                        ? "border-b-blue-900  text-blue-900"
                        : "bg-gray-100 text-gray-500 hover:text-blue-900",
                      tabIdx === 0 ? "rounded-l-lg" : "",
                      tabIdx === tabs.length - 1 ? "rounded-r-lg" : ""
                    )
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>

          <div className="flex items-center">
            <select
              id="tabs"
              name="tabs"
              className="block ml-1 w-full rounded-lg border border-gray-300 p-2 text-sm font-medium text-gray-500 hover:text-blue-900 hover:bg-gray-100 focus:outline-none"
            >
              <option>Unresolved</option>
              <option>Unresolved</option>
              <option>Unresolved</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col">
          <div className="h-[576px] overflow-y-auto rounded-lg border bg-white align-middle ">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 "
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 "
                  >
                    Ticket Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                  >
                    Ticket Description
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 "
                  >
                    Ticket Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.map((person) => (
                  <tr key={person.email} className="even:bg-gray-100">
                    <td className="pl-4">
                      <CheckCircleIcon
                        className="h-5 w-5 flex-shrink-0 text-green-700 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="pl-4">
                      <span className={classNames(person.color)}>
                        <ChartBarIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-left text-base font-semibold text-gray-800">
                      {person.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-left text-base text-gray-500 sm:pr-0">
                      {person.des}
                    </td>

                    <td className="flex space-x-2 px-3 py-4 text-left">
                      <Link to="/demo/incidents_2">
                        <button
                          type="button"
                          className="rounded-lg bg-indigo-500 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          Open Tickets
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="flex  items-center rounded-lg bg-rose-500 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                      >
                        Status
                        <ChevronDownIcon className="ml-1 h-5 w-5 text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
