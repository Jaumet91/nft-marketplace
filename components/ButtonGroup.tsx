import { Button } from './'

type Props = {}

export const ButtonGroup = (props: Props) => {
  const hasConnected = false

  return hasConnected ? (
    <Button btnName="Create" classStyles="mx-2 rounded-xl" />
  ) : (
    <Button btnName="Connect" classStyles="mx-2 rounded-xl" />
  )
}
