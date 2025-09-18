import Link from 'next/link'

export default function Header() {
  return (
    <div className={'flex justify-between items-center'}>
      <Link href="/">
        <img src="/logo.png" width={100} alt="Logo" />
      </Link>
    </div>
  )
}
