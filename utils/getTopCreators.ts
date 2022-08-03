export const getCreators = (nfts: any[]) => {
  const creators = nfts.reduce((creatorObject, nft) => {
    ;(creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft)
    return creatorObject
  }, {})

  return Object.entries(creators).map((creator: [string, any]) => {
    const seller = creator[0]
    const sum = creator[1]
      .map((item: { price: string }) => Number(item.price))
      .reduce((prev: string, curr: string) => prev + curr, 0)
    return { seller, sum }
  })
}

// creators
// {
//   'A': [{},{}]
//   'B': [{}]
//   'C': [{}]
// }

// Object.entries
// [[A,B,C], [[{},{}]]]
