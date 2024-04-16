import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { stripIgnoredCharacters } from 'graphql'

const NEXT_PUBLIC_CONTENTFUL_SPACE_ID = 'bwwroaemw6wm'
const NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN = '-DyAaFQCvxzXwGXDs2bkVqz76R6rh6MLRw4c3c-wXU4'
const NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT='master'

export const client = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
});

const customContentfulDirectFetch = (uri: any, options: any) => {
    return fetch(uri, options).then((response) => {
      if (response.status >= 500) {
        // or handle 400 errors
        return Promise.reject(response.status)
      }
      return response
    })
  }

export const contentClient = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([
        new HttpLink({
          uri: `https://graphql.contentful.com/content/v1/spaces/${NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
          fetch: customContentfulDirectFetch,
          credentials: 'same-origin',
          headers: {
            Authorization: `Bearer ${NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
          },
          print(ast, originalPrint) {
            return stripIgnoredCharacters(originalPrint(ast))
          },
        }),
      ]),
    
    cache: new InMemoryCache(),
});