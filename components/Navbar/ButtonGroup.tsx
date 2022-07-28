import { Dispatch, SetStateAction } from 'react'
import { NextRouter } from 'next/router'
import PropTypes from 'prop-types'

import { Button } from '../'

type Props = { setActive: Dispatch<SetStateAction<string>>; router: NextRouter }

export const ButtonGroup = ({ setActive, router }: Props) => {
  const hasConnected = true

  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('')
        router.push('/create-nft')
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {}}
    />
  )
}

ButtonGroup.propType = {
  setActive: PropTypes.func.isRequired,
  router: PropTypes.func.isRequired
}
