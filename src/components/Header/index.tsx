import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useIsScroll from '@/hooks/use-is-scroll'
import { cn } from '@/lib/utils'

type MenuData = {
  name: string
  href: string
}

const menuData: MenuData[] = [
  { name: '首页', href: '/' },
  { name: '产品介绍', href: '/#intro' },
  { name: '产品使用', href: '/demo' },
]

export default function Header() {
  // 监听页面滚动，滚动则给header加背景
  const isScroll = useIsScroll()
  const router = useRouter()
  // 每次路由变化时更新 activeMenuHref,pathname 不会包含查询参数或锚点,asPath 会完整保留查询和锚点
  useEffect(() => {
    const matchedMenu = menuData.find((menu) => router.asPath === menu.href)
    setActiveMenuHref(matchedMenu?.href || '/')
  }, [router.asPath])
  // 初始化激活页面是首页
  const [activeMenuHref, setActiveMenuHref] = useState<string>('/')
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 h-[80px]',
        isScroll && 'bg-[#f5f8ff]/70 backdrop-blur-lg',
      )}
    >
      <div className={'w-full h-full flex items-center px-20 gap-[200px]'}>
        <Link href="/" className={'flex-shrink-0'}>
          <img src="/logo.png" width={120} alt="Logo" />
        </Link>
        <div className={'flex items-center justify-between min-w-[450px]'}>
          {menuData.map((menu, index) => {
            const isActive = activeMenuHref === menu.href
            return (
              <Link
                href={menu.href}
                key={index}
                className={cn('text-xl text-[#666666]', isActive && 'text-[#855AFF] font-semibold')}
              >
                {menu.name}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
