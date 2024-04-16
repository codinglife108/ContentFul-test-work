'use client';

import { useState } from 'react';
import { gql } from '@apollo/client';
import { contentClient } from '../lib/apollo-client/index';
import PageItemComponent from './item/item';

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [dataStatus, setDataStatus] = useState<boolean>(false);

  const init = async () => {
    contentClient
      .query({
        query: gql`
          {
            assetCollection {
              items {
                title
                fileName
              }
            }
          }
        `,
      })
      .then((result) => {
        const {
          data: {
            assetCollection: { items },
          },
        } = result;
        setData(items);
        setDataStatus(true);
      });
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <title>ContentFul</title>

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
          <p style={{ color: 'red', fontSize: '18px' }}>
            This data is from contentful
          </p>
          <p>
            LoadStatus:{' '}
            <span data-testid="loader">
              {dataStatus ? 'Finished' : 'Loading'}
            </span>
          </p>

          <hr />

          {!dataStatus ? (
            <button data-testid="contentful" onClick={() => init()}>
              Get Data
            </button>
          ) : (
            <></>
          )}
          {dataStatus ? (
            data.map((item: any, key) => (
              <PageItemComponent item={item} key={key} />
            ))
          ) : (
            <></>
          )}

        </div>
      </div>
    </main>
  );
}
