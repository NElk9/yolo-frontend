import TabsPanel from '@/components/TabsPanel'
import UploadPanel from '@/components/UploadPanel'

export default function index() {
  return (
    <div id={'use'} className={'w-full h-screen pt-15 px-20 bg-[#f5f8ff] flex gap-16'}>
      <div className={'w-4/10 h-[460px]'}>
        <UploadPanel />
      </div>
      <div className={'w-6/10 h-full'}>
        <TabsPanel />
      </div>
    </div>
  )
}
