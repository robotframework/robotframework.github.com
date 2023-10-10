import * as contentful from 'contentful'

const client = contentful.createClient({
  space: 'bpm5i5mj2o02',
  accessToken: 'kDjw4Ergl45z3NFMv6Bhd5Z5w_HTIdcioiY4Hq9mC0I' // read-only for free plan, dont worry :)
})

export const getNews = async() => {
  const items = await client
    .getEntries({
      content_type: 'latestNews'
    })
    .then(({ items }) => items.map(({ fields }) => ({
      ...fields,
      image: fields.image?.fields
    })))
  return items
}
