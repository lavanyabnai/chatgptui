import * as React from "react";
import { Fragment, useState } from "react";
import { Link } from "@remix-run/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Tab, Dialog, Transition, RadioGroup } from "@headlessui/react";
import {
  Filter,
  Operators,
  TextFilter,
  NumericFilter,
  BooleanFilter,
} from "@progress/kendo-react-data-tools";

const initialFilter = {
  logic: "and",
  filters: [
    {
      field: "UnitPrice",
      operator: "gt",
      value: 20,
    },
    {
      field: "UnitPrice",
      operator: "lt",
      value: 50,
    },
  ],
};

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
const alertdown = [
  { id: "interval", title: "At fixed interval" },
  { id: "schedule", title: "On given Schedule" },
];
const plans = [
  {
    icon: ChartBarIcon,
    color: "text-rose-500",
    name: "High Priority",
    priceMonthly: 29,
    priceYearly: 290,
    limit: "Needs to be solved as soon as possible",
  },
  {
    icon: ChartBarIcon,
    color: "text-yellow-500",
    name: "Medium Priority",
    priceMonthly: 99,
    priceYearly: 990,
    limit: "Requires immediate attention",
  },
  {
    icon: ChartBarIcon,
    color: "text-gray-500",
    name: "Low Proirity",
    priceMonthly: 249,
    priceYearly: 2490,
    limit: "Requires attention but not very important",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [open, setOpen] = useState(true);
  const [filter, setFilter] = React.useState(initialFilter);
  const onFilterChange = (event) => {
    setFilter(event.filter);
  };
  const [pselected, psetSelected] = useState(plans[0]);
  return (
    <>
      <div className="w-full bg-sky-500">
        <div className="ml-4 flex h-16 items-center justify-start">
          <div className="text-3xl font-bold text-white">Alerts</div>
        </div>
      </div>
      <div className="m-4 rounded-lg border bg-slate-600 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1 p-4">
          <h1 className="text-xl font-semibold leading-6 text-white">
            Alerts Summary
          </h1>
        </div>
        <div className="mr-2 mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            className="rounded-full bg-rose-500 p-1.5 font-semibold text-white shadow-sm "
            onClick={() => setOpen(!open)}
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
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

          <div className="flex items-center rounded-lg border">
            <select
              id="tabs"
              name="tabs"
              className="m-1 mr-2 block w-full rounded-md border-gray-300 p-2 text-sm font-medium text-gray-500 focus:outline-none"
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
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
                  >
                    Ticket Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Ticket Description
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
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

                    <td className="whitespace-nowrap px-3 py-4 text-left text-sm font-semibold text-gray-800">
                      {person.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-left text-sm text-gray-500 sm:pr-0">
                      {person.des}
                    </td>

                    <td className="flex space-x-2 px-3 py-4 text-left">
                      <Link to="/demo/incidents_2">
                        <button
                          type="button"
                          className="rounded-lg bg-rose-500 p-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          Open Tickets
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
                              Create Alerts
                            </Dialog.Title>

                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md  text-slate-300 outline-none hover:text-white "
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
                        <div className="px-4 py-2">
                          <div className="rounded-lg border bg-gray-100 p-2">
                            <h2 className="text-base font-medium leading-6 text-gray-900 ">
                              {" "}
                              Query Condition
                            </h2>
                          </div>

                          <div className="pt-4">
                            <Filter
                              value={filter}
                              onChange={onFilterChange}
                              fields={[
                                {
                                  name: "ProductName",
                                  label: "Name",
                                  filter: TextFilter,
                                  operators: Operators.text,
                                },
                                {
                                  name: "UnitPrice",
                                  label: "Price",
                                  filter: NumericFilter,
                                  operators: Operators.numeric,
                                },
                                {
                                  name: "Discontinued",
                                  label: "Discontinued",
                                  filter: BooleanFilter,
                                  operators: Operators.boolean,
                                },
                              ]}
                            />
                          </div>
                          <div className="">
                            <div className="rounded-lg border bg-gray-100 p-2">
                              <h2 className="text-base font-medium leading-6 text-gray-900 ">
                                {" "}
                                How frequently do you want the Sql query to be
                                run?
                              </h2>
                            </div>

                            <fieldset className="mt-4 px-4">
                              <div className="flex items-center justify-between">
                                {alertdown.map((notificationMethod) => (
                                  <div
                                    key={notificationMethod.id}
                                    className="flex items-center pl-2 pr-4"
                                  >
                                    <input
                                      id={notificationMethod.id}
                                      name="notification-method"
                                      type="radio"
                                      defaultChecked={
                                        notificationMethod.id === "interval"
                                      }
                                      className="h-4 w-4 border-gray-300 text-indigo-500 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={notificationMethod.id}
                                      className="ml-2 block text-sm font-medium text-gray-800"
                                    >
                                      {notificationMethod.title}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </fieldset>
                          </div>

                          <div className="mt-6 pt-4">
                            <div className="rounded-lg border bg-gray-100 p-2">
                              <h2 className="text-base font-medium leading-6 text-gray-900 ">
                                {" "}
                                Incident Type/Priority
                              </h2>
                            </div>

                            <RadioGroup
                              value={pselected}
                              onChange={psetSelected}
                            >
                              <div className="mt-2 rounded-md bg-white">
                                {plans.map((plan) => (
                                  <RadioGroup.Option
                                    key={plan.name}
                                    value={plan}
                                    className={({ checked }) =>
                                      classNames(
                                        checked ? "z-10  bg-gray-50 " : "",
                                        "relative grid cursor-pointer  grid-cols-1 rounded-lg border-b p-4 focus:outline-none"
                                      )
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <span className="flex items-center text-sm">
                                          <span
                                            className={classNames(
                                              checked
                                                ? "border-transparent bg-blue-500"
                                                : "border-gray-300 bg-white",
                                              active
                                                ? "ring-2 ring-blue-600 ring-offset-2"
                                                : "",
                                              "flex h-4 w-4 items-center justify-center rounded-full border"
                                            )}
                                            aria-hidden="true"
                                          >
                                            <span className="h-2 w-2 rounded-full bg-white" />
                                          </span>
                                          <RadioGroup.Description
                                            as="span"
                                            className={classNames(
                                              plan.color,
                                              "mx-4 flex items-center text-sm "
                                            )}
                                          >
                                            <plan.icon className="h-5 w-5" />
                                          </RadioGroup.Description>
                                          <RadioGroup.Label
                                            as="span"
                                            className={classNames(
                                              checked
                                                ? "text-blue-900"
                                                : "text-gray-500",
                                              "ml-2 font-medium "
                                            )}
                                          >
                                            {plan.name}
                                          </RadioGroup.Label>
                                        </span>
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
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
                          type="submit"
                          className="text-md ml-2 inline-flex justify-center rounded-md bg-rose-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-rose-600"
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
