interface IpfsImageProps {
  hash: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}

const GATEWAY = "https://cloudflare-ipfs.com/ipfs/"

export function IpfsImage({ hash, alt = "", className, style }: IpfsImageProps) {
  const src = hash.startsWith("ipfs://")
    ? hash.replace("ipfs://", GATEWAY)
    : hash.startsWith("Qm") || hash.startsWith("bafy")
    ? `${GATEWAY}${hash}`
    : hash

  return <img src={src} alt={alt} className={className} style={style} />
}
