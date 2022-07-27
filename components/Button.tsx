import PropTypes from 'prop-types'
import { MouseEventHandler } from 'react'
type Props = {
  classStyles: string
  btnName: string
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ classStyles, btnName, handleClick }: Props) => (
  <button
    type="button"
    className={`nft-gradient py-2 px-6 font-poppins text-sm font-semibold text-white minlg:px-8 minlg:text-lg ${classStyles}`}
    onClick={handleClick}>
    {btnName}
  </button>
)

Button.propTypes = {
  classStyles: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}
