import { React, Fragment, useState } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";


import { kpiService_m, kpiCost_m } from "~/data/optimize/inputData";
import { PlusIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const roll = [
  {
    roll: "50",
    cap: "100%",
    inv: "95.6%",
    cons: "4.4%",
    scrap: "4.4%",
  },
  {
    roll: "100",
    cap: "100%",
    inv: "100%",
    cons: "N/A",
    scrap: "0%",
  },
];

const tabs = [
  { name: "Scenarios 1", href: "#", current: true },
  { name: "Scenarios 2", href: "#", current: false },
];

const plans = [
  { name: "Blank", description: "Blank scenario with default settings" },
  {
    name: "Default_Scenario",
    description: "Multiple master rolls and multiple finals."
  },
  {
    name: "Big_Discrepancy",
    description: "Big discrepancy on the size of the master roll.",
  },
  {
    name: "Small_Discrepancy",
    description: "Small discrepancy on the master roll sizes.",
  },
  {
    name: "Real_Life_Example",
    description:
      "Source: 'An effective solution for a real cutting stock problem in manufacturing plastic rolls.'",
  },
];

export default function InputRoute() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(plans[0]);
  return (
    <>
      <div className="w-full bg-sky-500">
        <div className="ml-4 flex h-16 items-center justify-start">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="text-3xl font-bold text-white">
                Optimizer Input
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div className="my-4 rounded-lg border bg-white shadow-sm md:flex md:items-center md:justify-between">
          <div className=" border-b border-gray-200 ">
            <div className="p-2 sm:flex sm:items-baseline">
              <h3 className="text-base font-semibold leading-6 text-gray-900 ">
                Scenarios
              </h3>
              <div className="mt-4 border-l sm:ml-2 sm:mt-0">
                <nav className="-mb-px ml-4 flex space-x-8">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        tab.current
                          ? "border-rose-500 text-rose-500"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="mr-2 flex">
            <button
              type="button"
              className="rounded-full bg-rose-500 p-2 text-white shadow-sm hover:bg-rose-600"
              onClick={() => setOpen(!open)}
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* charts */}
        <ul className=" grid grid-cols-1 gap-6 lg:grid-cols-2">
          {kpiService_m.map((kpi) => (
            <li
              key={kpi.Name}
              className="col-span-1 flex flex-col divide-y divide-white rounded-lg bg-white shadow-xl shadow-slate-900/10"
            >
              <div className="relative flex flex-1 flex-col py-2 pl-3">
                <div>
                  <h3 className="mt-2 text-base font-medium text-gray-900">
                    {kpi.Name}
                  </h3>
                </div>

                <div>{kpi.container}</div>
              </div>
            </li>
          ))}
        </ul>

        <ul className="my-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {kpiCost_m.map((kpi) => (
            <li
              key={kpi.Name}
              className="col-span-1 flex flex-col divide-y divide-white rounded-lg bg-white shadow-xl shadow-slate-900/10"
            >
              <div className="relative flex flex-1 flex-col py-2 pl-3">
                <div>
                  <h3 className="mt-2 text-base font-medium text-gray-900">
                    {kpi.Name}
                  </h3>
                </div>

                <div>{kpi.container}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="my-2 bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-gray-200 sm:mx-0 sm:rounded-lg ">
          <h3 className="my-2 text-base  font-medium text-gray-900">
            Master Roll KPIs
          </h3>
          <div className="items-center overflow-x-auto align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-center text-sm  font-semibold text-gray-700 ring-gray-500/10"
                  >
                    Roll Width
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-center text-sm  font-semibold text-gray-700 ring-gray-500/10"
                  >
                    Capacity Utilization
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-center text-sm  font-semibold text-gray-700 ring-gray-500/10"
                  >
                    Inventory Efficiency
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-center text-sm  font-semibold text-gray-700 ring-gray-500/10"
                  >
                    Consumption Inefficiency
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-center text-sm  font-semibold text-gray-700 ring-gray-500/10"
                  >
                    Scrap
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {roll.map((roll) => (
                  <tr key={roll} className="mx-2 even:bg-gray-100">
                    <td className="whitespace-nowrap p-4 text-center text-sm">
                      {roll.roll}
                    </td>
                    <td className="whitespace-nowrap p-4 text-center text-sm">
                      {roll.cap}
                    </td>
                    <td className="whitespace-nowrap p-4 text-center text-sm ">
                      {roll.inv}
                    </td>
                    <td className="whitespace-nowrap p-4 text-center text-sm">
                      {roll.cons}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm font-medium sm:pr-0">
                      {roll.scrap}
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
                        <div className="px-4 py-2">
                          <span className="text-md block font-medium leading-6 text-gray-900">
                            Name
                          </span>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>Blank1</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <span className="text-md block font-medium leading-6 text-gray-900">
                            Description
                          </span>
                          <div className="mt-2">
                            <div className="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <p>Blank scenario with default settings</p>
                            </div>
                          </div>
                          <div className="p-2 border-b mb-2"></div>
                        </div>

                        <div className="px-4 py-2">

                          <RadioGroup value={selected} onChange={setSelected}>
                            <RadioGroup.Label className="text-md block font-medium leading-6 text-gray-900">
                              Select a type of scenario
                            </RadioGroup.Label>
                            <div className="space-y-4 mt-2">
                              {plans.map((plan) => (
                                <RadioGroup.Option
                                  key={plan.name}
                                  value={plan}
                                  className={({ checked, active }) =>
                                    classNames(
                                      checked
                                        ? "border-transparent"
                                        : "border-gray-300",
                                      active
                                        ? ""
                                        : "",
                                      "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <span className="flex items-center">
                                        <span className="flex flex-col text-sm">
                                          <RadioGroup.Label
                                            as="span"
                                            className="font-medium text-gray-900"
                                          >
                                            {plan.name}
                                          </RadioGroup.Label>
                                          <RadioGroup.Description
                                            as="span"
                                            className="text-gray-500"
                                          >
                                            <span className="block sm:inline">
                                              {plan.description}
                                            </span>{" "}
                                          </RadioGroup.Description>
                                        </span>
                                      </span>

                                      <span
                                        className={classNames(
                                          active ? "border" : "border-2",
                                          checked
                                            ? "border-rose-500"
                                            : "border-transparent",
                                          "pointer-events-none absolute -inset-px rounded-lg"
                                        )}
                                        aria-hidden="true"
                                      />
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>

                      </div>
                      <div className="flex justify-center p-2">
                        <button
                          type="button"
                          className="text-md rounded-md border bg-indigo-500 hover:bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="text-md ml-2 inline-flex justify-center rounded-md bg-rose-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
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
