
import { json, redirect } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

import NewCurrency from "~/components/NewCurrency";
import CurrencyList from "~/components/CurrencyList";
import {
  // getCurrency,
  getCurrencyListItems,
  createCurrency,
} from "~/models/ccy.server";

export default function CurrencyPage() {
  const currencyList = useLoaderData();
  return (
    <main>
      <NewCurrency />
      <CurrencyList ccyList={currencyList} />
    </main>
  );
}

export async function loader() {

  const currencyList = await getCurrencyListItems();
 
  if (!currencyList || currencyList.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  return currencyList;
}

export async function action({ request }) {
  const formData = await request.formData();
  console.log("formData", formData);

  const bkt = Number(formData.get("bkt"))
  const ccy_code = formData.get("ccy-code");
  const exchange_rate = Number(formData.get("exchange-rate"))

  await createCurrency({ bkt, ccy_code, exchange_rate })
  return redirect("/demo/profile");
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error">
        <h1>An error related to your notes occurred!</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
        <p>
          Back to <Link to="/">Saftey</Link>!
        </p>
      </div>
    );
  }

  let errorMessage = "Unknown error";
  if (error) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p className="info-message">{errorMessage}</p>
    </div>
  );
}
