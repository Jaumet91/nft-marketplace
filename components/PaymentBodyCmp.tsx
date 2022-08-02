type nft = {
  image: string
  tokenId: string
  name: string
  description: string
  owner: string
  price: string
  seller: string
}

type Props = {
  nft: nft
  nftCurrency: string
}

export const PaymentBodyCmp = ({ nft, nftCurrency }: Props) => <div>test</div>
