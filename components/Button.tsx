import PropTypes from 'prop-types'
type Props = { classStyles: string; btnName: string }

export const Button = ({ classStyles, btnName }: Props) => (
  <button
    type="button"
    className={`nft-gradient py-2 px-6 font-poppins text-sm font-semibold text-white minlg:px-8 minlg:text-lg ${classStyles}`}>
    {btnName}
  </button>
)

Button.propTypes = {
  classStyles: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired
}
