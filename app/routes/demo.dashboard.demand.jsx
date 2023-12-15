import { useState, Fragment } from "react";
import { Transition, Listbox, Popover } from "@headlessui/react";
import {
  ChevronDownIcon,
  CheckIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import CardLayout from "~/components/CardLayout";
import { kpiService_m } from "~/data/dashboard/demandData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const items = [
  {
    id: 1,
    name: "Review",
    description:
      "Conduct periodic (month/quarter/year) performance review of key business KPIs",
    to: `review`,
  },
  {
    id: 2,
    name: "Meeting",
    description:
      "Conduct daily/weekly data driven meetings and create plan of action ",
    to: `meeting`,
  },
];

const filters = [
  {
    id: "year",
    name: "Year",
    options: [
      { value: "new-arrivals", label: "All New Arrivals", checked: false },
      { value: "tees", label: "Tees", checked: false },
      { value: "all", label: "All", checked: true },
    ],
  },

  {
    id: "region",
    name: "Region",
    options: [
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
    ],
  },
  {
    id: "products",
    name: "Products",
    options: [
      { value: "all", label: "All", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: false },
    ],
  },
];

export default function DemandRoute() {
  const [mode, setMode] = useState(items[0]);

  const reviewTabs = ["Month", "Quarter", "Year"];
  const [reviewIndex] = useState(0);

  const meetingTabs = ["Daily", "Weekly"];
  const [meetingIndex] = useState(0);

  return (
    <>
      <div className="mx-4 mt-1 rounded-lg bg-white   shadow">
        <div className="flex items-center justify-between p-2 ">
          <div className="m-2 flex-1">
            <h2 className="text-3xl font-bold leading-7 text-gray-900">
              Demand Dashboard
            </h2>
          </div>
          <div className="flex p-1 align-middle ">
            <span className="ml-1">
              <Listbox value={mode} onChange={setMode}>
                {({ open }) => (
                  <>
                    <div className="relative">
                      <div className="inline-flex divide-x divide-rose-700">
                        <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-rose-500 px-3 py-2 text-white shadow-sm">
                          <CheckIcon
                            className="-ml-0.5 h-5 w-5 "
                            aria-hidden="true"
                          />
                          <p className="text-sm font-semibold">{mode.name}</p>
                        </div>
                        <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-rose-500 p-2 hover:bg-rose-700">
                          <ChevronDownIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </Listbox.Button>
                      </div>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md border bg-gray-100 shadow-lg ">
                          {items.map((option) => (
                            <Listbox.Option
                              key={option.name}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-rose-500 text-white"
                                    : "text-gray-900",
                                  "cursor-default select-none p-4 text-sm"
                                )
                              }
                              value={option}
                            >
                              {({ selected, active }) => (
                                <div className="flex flex-col">
                                  <div className="flex justify-between">
                                    <p
                                      className={
                                        selected
                                          ? "font-semibold"
                                          : "font-normal"
                                      }
                                    >
                                      {option.name}
                                    </p>
                                    {selected ? (
                                      <span
                                        className={
                                          active
                                            ? "text-white"
                                            : "text-rose-600"
                                        }
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </div>
                                  <p
                                    className={classNames(
                                      active
                                        ? "text-rose-200"
                                        : "text-gray-500",
                                      "mt-2"
                                    )}
                                  >
                                    {option.description}
                                  </p>
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </span>

            {/* <span className="inline-flex">
              <Menu as="div" className="relative ml-2 ">
                <Menu.Button className="inline-flex items-center rounded-md bg-white px-3  py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ">
                  Utility
                  <ChevronDownIcon
                    className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0  z-10  mt-2 rounded-md bg-gray-100 shadow-lg">
                    {centericon.map((icons) => (
                      <div className="inline-flex">
                        <Menu.Item>
                          <Link
                            key={icons.name}
                            href={icons.to}
                            className="flex w-40 items-center rounded-lg p-2 text-black transition duration-150 ease-in-out hover:bg-rose-500 hover:text-white"
                          >
                            <icons.icon className="flex h-5 w-5 items-center justify-center" />

                            <div className="m-2">
                              <p className="text-xs font-medium">
                                {icons.name}
                              </p>
                            </div>
                          </Link>
                        </Menu.Item>
                      </div>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </span> */}
          </div>
        </div>
      </div>

      <div className="mx-4 mt-2">
        {/* Filters */}
        <section aria-labelledby="filter-heading">
          <div className="my-4 rounded-lg border bg-white shadow-sm md:flex md:items-center md:justify-between">
            <div className="mr-64 flex items-center px-4">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  <span className="mx-4 inline-flex">Filters</span>
                  {filters.map((section) => (
                    <Popover
                      key={section.name}
                      className="relative inline-block rounded-lg  text-gray-700 hover:bg-rose-500"
                    >
                      <Popover.Button className="group inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-400 hover:text-white">
                        <span>{section.name}</span>

                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 "
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="absolute z-10 mt-2 rounded-md bg-white p-4 shadow-2xl ">
                          <form className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900 hover:text-white"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </div>
            <div className=" m-2">
              <button
                type="button"
                className="rounded-full border bg-gray-200 p-2 hover:bg-gray-100 "
              >
                <FunnelIcon
                  className="h-4 w-4 text-gray-500"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* <div className="m-2 pl-2">
              <button className="flex items-center rounded-lg border p-2 text-gray-500  bg-gray-100 hover:bg-gray-200">
                <FunnelIcon
                  className="h-4 w-4 text-gray-600"
                  aria-hidden="true"
                />
                <span className="ml-2 inline-flex font-semibold">Filter</span>
                </button>
              </div> */}
          </div>
        </section>
      </div>
      <main>
        <CardLayout
          mode={mode.name === "Review" ? reviewTabs : meetingTabs}
          tab={mode.name === "Review" ? reviewIndex : meetingIndex}
          kpiData={kpiService_m}
        />
      </main>
    </>
  );
}
