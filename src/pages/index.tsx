import Hero from '@/components/Hero'
import Intro from '@/components/Intro'

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
    </>
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
