import { useState, Fragment } from 'react';
import { Transition,Listbox,Tab } from '@headlessui/react'
import { DocumentArrowDownIcon, ShareIcon, ClipboardDocumentCheckIcon, ChevronDownIcon, CheckIcon, } from '@heroicons/react/20/solid'
import CardLayout from '~/components/CardLayout';

import { kpiService_m,} from '~/data/dashboard/balanceData';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BalanceRoute(){

  const items = [
    { id: 1, name: 'Review', description: 'Conduct periodic (month/quarter/year) performance review of key business KPIs', to: `review`},
    { id: 2, name: 'Meeting', description: 'Conduct daily/weekly data driven meetings and create plan of action ', to: `meeting` },
  ]
  const centericon = [
    { name: "Download as PDF", icon: DocumentArrowDownIcon },
    { name: "Email KPIs", icon: ShareIcon },
    { name: "Copy as Image", icon: ClipboardDocumentCheckIcon },
  ];
  const [mode, setMode] = useState(items[0])
  
  const reviewTabs = ['Month', 'Quarter', 'Year']
  const [reviewIndex, setReviewIndex] = useState(0)  

  const meetingTabs = ['Daily', 'Weekly']
  const [meetingIndex, setMeetingIndex] = useState(0)
  
    return ( 
      <>
                           <div className="relative mt-3">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="ml-4 mr-4 w-full border-t border-gray-300 " />
        </div>
        <div className="relative flex justify-between ">
          <div>
            <Listbox value={mode} onChange={setMode}>
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only">
                    Display Mode
                  </Listbox.Label>
                  <div className="relative">
                    <div className="inline-flex divide-x divide-rose-700 px-4 ">
                      <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-rose-500 px-3 py-2 text-white shadow-sm">
                        <CheckIcon
                          className="-ml-0.5 h-5 w-5 "
                          aria-hidden="true"
                        />
                        <p className="text-sm font-semibold">{mode.name}</p>
                      </div>
                      <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-rose-500 p-2 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                        <span className="sr-only">Change published status</span>
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
                      <Listbox.Options className="absolute left-4 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                      selected ? "font-semibold" : "font-normal"
                                    }
                                  >
                                    {option.name}
                                  </p>
                                  {selected ? (
                                    <span
                                      className={
                                        active ? "text-white" : "text-rose-600"
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
                                    active ? "text-rose-200" : "text-gray-500",
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
          </div>
          <div className="relative">
            <div className="relative ml-24 flex justify-center rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300">
              {centericon.map((icons) => (
                <div key={icons} className="isolate inline-flex -space-x-px">
                  <button
                    type="button"
                    className="relative inline-flex items-center  border-x px-3 py-2  text-gray-400 focus:z-10 "
                  >
                    <span className="sr-only">{icons.name}</span>
                    <icons.icon
                      className="h-5 w-5 hover:text-rose-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* hidden sm:block */}
            <div className="">
              <nav
                className="isolate ml-4 mr-4 flex rounded-lg border border-gray-200"
                aria-label="Tabs"
              >
                {mode.name === "Review" ? (
                  <Tab.Group
                    selectedIndex={reviewIndex}
                    onChange={setReviewIndex}
                  >
                    <Tab.List
                      className="isolate flex divide-x divide-gray-200  "
                      aria-label="Tabs"
                    >
                      {reviewTabs.map((category, categoryIdx) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "bg-rose-500 text-white"
                                : "bg-white text-gray-500 hover:text-rose-500",
                              categoryIdx === 0 ? "rounded-l-lg" : "",
                              categoryIdx === reviewTabs.length - 1
                                ? "rounded-r-lg"
                                : "",
                              "group relative  flex-1  px-4 py-2 text-center text-sm font-medium "
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                  </Tab.Group>
                ) : (
                  <Tab.Group
                    selectedIndex={meetingIndex}
                    onChange={setMeetingIndex}
                  >
                    <Tab.List
                      className="isolate flex divide-x divide-gray-200"
                      aria-label="Tabs"
                    >
                      {meetingTabs.map((category, categoryIdx) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "bg-rose-500 text-white"
                                : "bg-gray-100 text-gray-500 hover:text-rose-500",
                              categoryIdx === 0 ? "rounded-l-lg" : "",
                              categoryIdx === meetingTabs.length - 1
                                ? "rounded-r-lg"
                                : "",
                              "group relative flex-1 overflow-hidden px-4 py-2 text-center text-sm font-medium focus:z-10"
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                  </Tab.Group>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>           <main>
              <CardLayout mode={mode.name==='Review' ? reviewTabs : meetingTabs} tab={mode.name==='Review' ? reviewIndex : meetingIndex} kpiData={kpiService_m} />
            </main>
      </>
    )
}