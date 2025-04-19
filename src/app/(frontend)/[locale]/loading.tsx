import Image from 'next/image'

export default function Loading() {
  return (
    <div className="relative flex items-center justify-center flex-1 w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <Image src="/media/6_w_b.png" alt="" width={96} height={96} />
        <h1>Loading...</h1>
      </div>
    </div>
  )
}
