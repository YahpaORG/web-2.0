import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      alt="Logo of YAHPA"
      src={'/media/1_Without_Background.png'}
      width={400}
      height={320}
      objectFit="contain"
    />
  )
}
