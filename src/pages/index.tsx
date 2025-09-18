import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <h1>首页</h1>
      <Link href="/demo">
        <Button>立即使用</Button>
      </Link>
    </div>
  )
}

// 每个页面上使用不同的layout时候
// Home.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <Layout>
//             {page}
//         </Layout>
//     )
// }
