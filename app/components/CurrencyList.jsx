import { Link } from '@remix-run/react'

export default function CurrencyList({ ccyList }) {
  return (
    <ul id="note-list" className='flex mx-auto max-w-4xl p-6 bg-white rounded-xl'>
      {ccyList.map((ccy, index) => (
        <li key={ccy.bkt} className="note">
          <Link to={ccy.bkt}>
          <article>
            <header>
              <ul className="note-meta">
                <li>#{index + 1}</li>
                <li>
             
                </li>
              </ul>
              <h2>{ccy.ccy_code}</h2>
            </header>
            <h2>{ccy.exchange_rate}</h2>
          </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}