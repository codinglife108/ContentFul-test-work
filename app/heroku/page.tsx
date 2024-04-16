"use client"

import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { client } from '../lib/apollo-client/index';

export default function Page() {

  const [data, setData] = useState([])
  const [dataStatus, setDataStatus] = useState(false)

  const init = async () => {
    client
    .query({
      query: gql`
        query GetLocations {
          locations {
            id
            name
            description
            photo
          }
        }
      `,
    })
    .then((result) => {
      const { data: { locations } } = result
      setData(locations)
      setDataStatus(true)
    });
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
        </div>

        <div>
          <p style={{ color: 'red', fontSize: '18px' }}>This data is from heroku</p>
          {
            dataStatus ? 
            data.map((item: any, key) => <div key={key}>
              <p>{item.description}</p>
              <p>{item.id}</p>
              <p>{item.name}</p>
              <p>{item.photo}</p>
            </div>) : <>Loading ...</>
          }
        </div>

      </div>
    </main>
  );
}
