import { ReactElement } from 'react'
import PropTypes from 'prop-types'

type Props = {
  name: ReactElement<any, any>
  childStyles: string
  parentStyles: string
}

export const Banner = ({ name, childStyles, parentStyles }: Props) => {
  return (
    <div
      className={`nft-gradient relative z-0 flex items-center overflow-hidden ${parentStyles}`}>
      <p
        className={`font-poppins text-5xl font-bold leading-70 text-white ${childStyles}`}>
        {name}
      </p>
      <div className="white-bg absolute -top-9 -left-16 -z-5 h-48 w-48 rounded-full sm:h-32 sm:w-32" />
      <div className="white-bg absolute -bottom-24 -right-14 -z-5 h-72 w-72 rounded-full sm:h-56 sm:w-56" />
    </div>
  )
}

Banner.propTypes = {
  name: PropTypes.object.isRequired,
  childStyles: PropTypes.string.isRequired,
  parentStyles: PropTypes.string.isRequired
}
