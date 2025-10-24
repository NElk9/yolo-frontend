import { useEffect, useState } from 'react'
import { SidebarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import useIsScroll from '@/hooks/use-is-scroll'
import { cn, getImgSrc } from '@/lib/utils'

type MenuData = {
  name: string
  href: string
  id: string
}

const menuData: MenuData[] = [
  {
    name: '首页',
    href: '/',
    id: '#hero',
  },
  {
    name: '产品介绍',
    href: '/#intro',
    id: '#intro',
  },
  {
    name: '产品使用',
    href: '/demo',
    id: '#use',
  },
]

export default function Header() {
  // 监听页面滚动，滚动则给header加背景
  const isScroll = useIsScroll()
  // 初始化激活页面是首页
  const [activeMenuId, setActiveMenuId] = useState<string>('#hero')
  const router = useRouter()
  // 监听页面是否在可视窗口（分情况讨论：同一页面的锚点、不同页面）
  useEffect(() => {
    // 只有在首页下才进行锚点监听，如果当前在其他页面，就通过路由监听激活菜单
    if (router.pathname !== '/') {
      const matchedMenu = menuData.find((menu) => router.pathname === menu.href)
      setActiveMenuId(matchedMenu?.id || '#hero')
      return
    }
    const sections = menuData.map((menu) => document.querySelector(menu.id)) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`
            setActiveMenuId(id)
          }
        })
      },
      {
        threshold: 0.6, // 超过 60% 可见才算“激活”
      },
    )
    sections.forEach((sec) => sec && observer.observe(sec))

    return () => {
      sections.forEach((sec) => sec && observer.unobserve(sec))
    }
  }, [router.pathname])
  // 路由一变化就重新挂载监听，否则跳转到新界面，observer找不到相关id
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 h-[60px] z-10',
        isScroll && 'bg-[#f5f8ff]/70 backdrop-blur-lg',
      )}
    >
      <div className={'w-full h-full flex items-center justify-between px-18 xl:gap-[200px]'}>
        <Link href="/" className={'flex-shrink-0 flex items-center gap-4'}>
          <Image src={getImgSrc('/logo.png')} height={100} width={100} alt="Logo" />
          <Image src={getImgSrc('/bank-logo.png')} height={100} width={180} alt="Logo" />
        </Link>
        <div
          className={'flex items-center justify-start gap-24 min-w-[450px] flex-1 max-xl:hidden'}
        >
          {menuData.map((menu, index) => {
            const isActive = activeMenuId === menu.id
            return (
              <Link
                href={menu.href}
                key={index}
                className={cn('text-[#666666]', isActive && 'text-[#855AFF] font-semibold')}
              >
                {menu.name}
              </Link>
            )
          })}
        </div>
        <Sheet>
          <SheetTrigger className={'xl:hidden h-8 w-8'}>
            <SidebarIcon />
          </SheetTrigger>
          <SheetContent
            className={'flex flex-col items-start justify-start gap-6 bg-[#DDDEFF]'}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {menuData.map((menu, index) => {
              const isActive = activeMenuId === menu.id
              return (
                <Link
                  href={menu.href}
                  key={index}
                  className={cn('text-[#666666]', isActive && 'text-[#855AFF] font-semibold')}
                >
                  {menu.name}
                </Link>
              )
            })}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
