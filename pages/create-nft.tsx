import { useState, useMemo, useCallback, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import { NFTContext } from '../context/NFTContext'
import { Button, Input } from '../components'
import images from '../assets'
import { SkeletonCreateNFTs } from '../components/Skeleton'

const CreateNFT = () => {
  const { uploadToIPFS } = useContext(NFTContext)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)
  const [formInput, setFormInput] = useState({
    price: '',
    name: '',
    description: ''
  })

  const onDrop = useCallback(async (acceptedFile: File[]) => {
    // upLoad image to ipfs
    const url = await uploadToIPFS(acceptedFile[0])
    console.log({ url })
    setFileUrl(url)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg', '.webm'] },
    maxSize: 5000000
  })

  const fileStyle = useMemo(
    () => `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-grey-2 flex-col items-center p-5 rounded-sm border-dashed 
      ${isDragActive ? ' border-file-active' : ''} 
      ${isDragAccept ? ' border-file-accept' : ''} 
      ${isDragReject ? ' border-file-reject' : ''}`,
    [isDragActive, isDragAccept, isDragReject]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <SkeletonCreateNFTs />

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white">
          Create new NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
                  JPG, PNG, GIF, SVG, WEBM. Max 100mb.
                </p>
                <div className="my-12 flex w-full justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' ? 'invert filter' : undefined}
                  />
                </div>
                <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white">
                  Drag and Drop File
                </p>
                <p className="mt-2 font-poppins text-sm font-semibold text-nft-black-1 dark:text-white">
                  or Browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleInputChange={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleTextChange={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleInputChange={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />

        <div className="mt-7 flex w-full justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateNFT
