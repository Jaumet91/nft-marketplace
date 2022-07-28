import PropTypes from 'prop-types'

type Props = { heading: string; items: string[] }

export const FooterLinks = ({ heading, items }: Props) => (
  <div className="flex-1 items-start justify-start">
    <h3 className="mb-10 font-poppins text-lg font-semibold text-nft-black-1 dark:text-white">
      {heading}
    </h3>
    {items.map((item, i) => (
      <p
        key={i}
        className="my-3 cursor-pointer font-poppins text-base font-normal text-nft-black-1 hover:text-nft-black-1 dark:text-white dark:hover:text-nft-gray-1">
        {item}
      </p>
    ))}
  </div>
)

FooterLinks.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}
