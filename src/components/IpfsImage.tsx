import Image from 'next/image'

interface IpfsImageProps {
  hash: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}

const GATEWAY = "https://ipfs.io/ipfs/"

export function IpfsImage({ hash, alt = "", className, style }: IpfsImageProps) {
  const src = hash.startsWith("ipfs://")
    ? hash.replace("ipfs://", GATEWAY)
    : hash.startsWith("Qm") || hash.startsWith("bafy")
    ? `${GATEWAY}${hash}`
    : hash

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      style={style}
      unoptimized={src.startsWith("https://ipfs.io")}
    />
  )
}
