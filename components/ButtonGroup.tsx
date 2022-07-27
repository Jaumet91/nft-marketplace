import { Button } from './'

type Props = {}

export const ButtonGroup = (props: Props) => {
  const hasConnected = false

  return hasConnected ? <Button /> : <Button />
}
