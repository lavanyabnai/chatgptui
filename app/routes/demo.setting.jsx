/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from "react";
import Pet from "~/components/Pet";
import { useState, Fragment, useEffect } from "react";

import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Form } from "@remix-run/react";
import {
  ChevronDownIcon,
  CheckIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

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

export default function SearchParams() {
  const [mode, setMode] = useState(items[0]);

  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const breeds = [];

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  function handleChange(e) {
    setLocation(e.target.value);
  }
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mx-4 mt-1 rounded-lg bg-white shadow">
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
          </div>
        </div>
      </div>

      <button
        type="button"
        className="top-15 fixed right-0 mt-4 flex cursor-pointer items-center 
                rounded-l-lg border bg-white p-2 text-sm font-semibold text-gray-900 shadow-xl hover:bg-rose-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={() => setOpen(!open)}
      >
        <AdjustmentsHorizontalIcon
          className="h-5 w-5 items-center"
          aria-hidden="true"
        />
      </button>

      <div className="mx-auto mt-4 max-w-4xl  rounded-lg bg-white p-4 shadow-xl">
        <div className="grid grid-cols-3 gap-4">
          {pets.map((pet) => (
            <Pet
              name={pet.name}
              animal={pet.animal}
              breed={pet.breed}
              key={pet.id}
            />
          ))}
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0 mt-10">
            <div className="mt-6">
              <div className="pointer-events-none ">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full -translate-y-1/3"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="top-15 pointer-events-auto fixed right-0 z-10">
                    <div className=" ">
                      {/* Filters */}
                      <section aria-labelledby="filter-heading">
                        <div className="my-4 rounded-lg border bg-white py-2 shadow-2xl">
                          <div className="px-4">
                            <div className="flow-root">
                              <div className="-mx-4  flex items-center divide-x divide-gray-200">
                                <span className="mx-4 inline-flex">
                                  Filters
                                </span>
                                <Form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    requestPets();
                                  }}
                                >
                                  <label htmlFor="location" className="ml-4">
                                    Location
                                    <input
                                      id="location"
                                      value={location}
                                      placeholder="Location"
                                      onChange={handleChange}
                                      className="mx-4"
                                    />
                                  </label>

                                  <label htmlFor="animal" className="mx-2">
                                    Animal
                                    <select
                                      id="animal"
                                      value={animal}
                                      className="mx-2"
                                      onChange={(e) =>
                                        setAnimal(e.target.value)
                                      }
                                    >
                                      <option />
                                      {ANIMALS.map((animal) => (
                                        <option key={animal} value={animal}>
                                          {animal}
                                        </option>
                                      ))}
                                    </select>
                                  </label>

                                  <label htmlFor="breed" className="mx-2">
                                    Breed
                                    <select
                                      disabled={!breeds.length}
                                      id="breed"
                                      value={breed}
                                      onChange={(e) => setBreed(e.target.value)}
                                      onBlur={(e) => setBreed(e.target.value)}
                                      className="mx-2"
                                    >
                                      <option />
                                      {breeds.map((breed) => (
                                        <option key={breed} value={breed}>
                                          {breed}
                                        </option>
                                      ))}
                                    </select>
                                  </label>

                                  <div className="m-1 inline-flex ">
                                    <button
                                      type="submit"
                                      className="rounded-full border bg-gray-200 p-2 hover:bg-gray-100 "
                                    >
                                      <FunnelIcon
                                        className="h-4 w-4 text-gray-500"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </Form>
                                <button
                                  type="button"
                                  className="mx-2 flex items-center pr-2 text-gray-500 hover:text-gray-900"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    className="h-4 w-4  "
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
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
// const CustomItem = (props) => {
//   return (
//     <span className="contact-item">
//       <Avatar type="image">
//         <img src={props.item.image} alt="KendoReact Buttons Contacts Image" />
//       </Avatar>
//       <span className="contact-details">
//         <span className="contact-name">{props.item.name}</span>
//         <span className="contact-role">{props.item.role}</span>
//       </span>
//     </span>
//   );
// };
