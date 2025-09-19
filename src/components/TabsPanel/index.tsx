import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsPanel() {
  return (
    <Tabs className={'w-full h-full'} defaultValue={'authenticity'}>
      <TabsList className={'grid w-full grid-cols-2'}>
        <TabsTrigger value={'authenticity'}>真伪鉴别</TabsTrigger>
        <TabsTrigger value={'compare'}>印章匹配</TabsTrigger>
      </TabsList>
      <TabsContent value={'authenticity'}>111</TabsContent>
      <TabsContent value={'compare'}>222</TabsContent>
    </Tabs>
  )
}
