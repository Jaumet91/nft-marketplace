import { ChangeEventHandler } from 'react'
import PropTypes from 'prop-types'

type Props = {
  inputType: string
  title: string
  placeholder: string
  handleInputChange?: ChangeEventHandler<HTMLInputElement>
  handleTextChange?: ChangeEventHandler<HTMLTextAreaElement>
}

export const Input = ({
  inputType,
  title,
  placeholder,
  handleInputChange,
  handleTextChange
}: Props) => (
  <div className="mt-10 w-full">
    <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
      {title}
    </p>
    {inputType === 'number' ? (
      <div className="flexBetween mt-4 w-full flex-row rounded-lg border border-nft-gray-2 bg-white px-4 py-3 font-poppins text-base text-nft-gray-2 outline-none dark:border-nft-black-1 dark:bg-nft-black-1 dark:text-white">
        <input
          type="number"
          className="outiline-none flex w-full bg-white dark:bg-nft-black-1"
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
          ETH
        </p>
      </div>
    ) : inputType === 'textarea' ? (
      <textarea
        rows={10}
        className="mt-4 w-full rounded-lg border border-nft-gray-2 bg-white px-4 py-3 font-poppins text-base text-nft-gray-2 outline-none dark:border-nft-black-1 dark:bg-nft-black-1 dark:text-white"
        placeholder={placeholder}
        onChange={handleTextChange}
      />
    ) : (
      <input
        className="mt-4 w-full rounded-lg border border-nft-gray-2 bg-white px-4 py-3 font-poppins text-base text-nft-gray-2 outline-none dark:border-nft-black-1 dark:bg-nft-black-1 dark:text-white"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    )}
  </div>
)

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}
