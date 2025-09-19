type DescriptionData = {
  icon: React.ReactNode
  title: string
  description: string
}

export default function DescriptionCard({ item }: { item: DescriptionData }) {
  return (
    <div className={'flex flex-col justify-start'}>
      <div className={'flex'}>
        {item.icon}
        <p>{item.title}</p>
      </div>
      <p>content</p>
    </div>
  )
}
