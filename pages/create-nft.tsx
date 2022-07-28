import { useState, useMemo, useCallback, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import { Button } from '../components'
import images from '../assets'
import { SkeletonCreateNFTs } from '../components/Skeleton'

const CreateNFT = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <SkeletonCreateNFTs />
}

export default CreateNFT
