import {
  BanknotesIcon,
  DocumentMagnifyingGlassIcon,
  PresentationChartLineIcon,
  CubeIcon,
  ArchiveBoxArrowDownIcon,
  ShoppingCartIcon,
  CircleStackIcon,
  SpeakerWaveIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";

const actions = [
  {
    icon: DocumentMagnifyingGlassIcon,
    name: "Overview",
    to: "/demo/dashboard/overview",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: PresentationChartLineIcon,
    name: "Demand",
    to: "/demo/dashboard/demand",
    iconForeground: "text-green-700",
    iconBackground: "bg-green-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: CubeIcon,
    name: "Supply",
    to: "/demo/dashboard/supply",
    iconForeground: "text-rose-500",
    iconBackground: "bg-rose-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: ArchiveBoxArrowDownIcon,
    name: "Inventory",
    to: "/demo/dashboard/inventory",
    iconForeground: "text-yellow-600",
    iconBackground: "bg-yellow-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: ShoppingCartIcon,
    name: "Spend",
    to: "/demo/dashboard/spend",
    iconForeground: "text-gray-700",
    iconBackground: "bg-gray-300",
    description: "Last message sent an hour ago",
  },
  {
    icon: BanknotesIcon,
    name: "Finance",
    to: "/demo/dashboard/finance",
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: CircleStackIcon,
    name: "Sales & Marketing",
    to: "/demo/dashboard/sales",

    iconForeground: "text-sky-600",
    iconBackground: "bg-sky-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: SpeakerWaveIcon,
    name: "Campaign",
    to: "/demo/dashboard/campaign",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: SpeakerWaveIcon,
    name: "Balance Sheet",
    to: "/demo/dashboard/campaign",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: SpeakerWaveIcon,
    name: "Manufacturing Analytics",
    to: "/demo/dashboard/campaign",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: SpeakerWaveIcon,
    name: "My P&l",
    to: "/demo/dashboard/campaign",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: SpeakerWaveIcon,
    name: "Order-to-Cash",
    to: "/demo/dashboard/campaign",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: SpeakerWaveIcon,
    name: "Payables",
    to: "/demo/dashboard/campaign",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-100",
    description: "Last message sent an hour ago",
  },
  {
    icon: SpeakerWaveIcon,
    name: "Profit",
    to: "/demo/dashboard/campaign",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-100",
    description: "Last message sent an hour ago",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Appbar() {
  return (
    <>
      <div className="mx-4 mt-2 rounded-lg bg-white shadow  ">
        <div className="flex items-center justify-between p-2  ">
          <div className="m-2 flex-1">
            <h2 className="text-3xl font-bold leading-7 text-gray-800 ">
              Appbar
            </h2>
          </div>
        </div>
      </div>

      <div className="m-4 ">
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 ">
          {actions.map((action) => (
            <li
              key={action.name}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white hover:bg-gray-100 "
            >
              <Link to={action.to} className="focus:outline-none">
                <div className="flex items-center border-b border-gray-900/5 p-6">
                  <span
                    className={classNames(
                      action.iconBackground,
                      action.iconForeground,
                      "inline-flex rounded-lg p-2"
                    )}
                  >
                    <action.icon
                      className="h-8 w-8 flex-none rounded-lg"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="ml-4 text-xl font-semibold text-gray-900">
                    {action.name}
                  </div>
                  <div className="relative ml-auto">
                    <button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                      <ArrowUpRightIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-base text-gray-500">
                    Doloribus dolores nostrum quia qui natus officia quod et
                    dolorem. Sit repellendus qui ut at blanditiis et quo et
                    molestiae.
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
