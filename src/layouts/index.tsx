import Header from '@/components/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={'overflow-x-hidden mt-[80px] bg-blue-300'}>{children}</main>
    </>
  )
}
