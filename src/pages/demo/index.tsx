import TabsPanel from '@/components/TabsPanel'
import UploadPanel from '@/components/UploadPanel'

export default function index() {
  return (
    <div id={'use'} className={'w-full h-screen pt-15 pb-8 px-20 bg-[#f5f8ff] flex gap-10'}>
      <div className={'w-5/12 h-[420px]'}>
        <UploadPanel />
      </div>
      <div className={'w-7/12 h-full'}>
        <TabsPanel />
      </div>
    </div>
  )
}
