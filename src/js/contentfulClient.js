import * as contentful from 'contentful'

const client = contentful.createClient({
  space: 'bpm5i5mj2o02',
  accessToken: 'kDjw4Ergl45z3NFMv6Bhd5Z5w_HTIdcioiY4Hq9mC0I' // read-only for free plan, dont worry :)
})

export const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

// --------- one cached fetch for *all* entries ---------

let allEntriesPromise = null

export const getEntries = async() => {
  if (allEntriesPromise) return allEntriesPromise

  allEntriesPromise = (async() => {
    const pageSize = 1000
    let skip = 0
    const all = []

    while (true) {
      const res = await client.getEntries({ limit: pageSize, skip })
      all.push(...res.items)
      skip += res.items.length
      if (all.length >= res.total || res.items.length === 0) break
    }

    return all
  })().catch((err) => {
    allEntriesPromise = null
    throw err
  })

  return allEntriesPromise
}

const byType = (items, contentTypeId) =>
  items.filter((e) => e.sys?.contentType?.sys?.id === contentTypeId)

export const getNews = async() => {
  const items = byType(await getEntries(), 'latestNews')
  return items.map(({ fields }) => ({
    ...fields,
    image: fields.image?.fields,
    imageDark: fields.imageDark?.fields
  }))
}

export const getEvents = async() => {
  const items = byType(await getEntries(), 'event')
  return items.map(({ fields }) => ({
    ...fields,
    image: fields.image?.fields
  }))
}

export const getSponsors = async() => {
  return byType(await getEntries(), 'sponsor')
}

export const clearEntriesCache = () => {
  allEntriesPromise = null
}
