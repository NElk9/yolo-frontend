import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null)
    setResult(null)
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      setResult('okk')
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (res.ok) {
        setResult(data.prediction)
      } else {
        setResult(`Error: ${data.error}`)
      }
    } catch (err) {
      setResult(`Request failed: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={'h-screen flex flex-col items-center gap-3 py-6 text-2xl font-semibold'}>
      <h1>图片上传与预测</h1>
      <div className={'w-full h-full px-8 py-4 flex justify-between gap-7'}>
        <Card className={'w-1/3 h-full'}>
          <CardContent className={'flex flex-col justify-center items-center gap-6'}>
            <Input type="file" accept="image/*" onChange={handleFileChange} />

            <Button onClick={handleUpload} disabled={!file || loading}>
              {loading ? '预测中...' : '上传并预测'}
            </Button>

            {previewUrl && (
              <div className="w-full h-auto rounded overflow-hidden">
                <img src={previewUrl} alt="preview" className="w-full h-full object-contain" />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className={'w-2/3 h-full'}>
          <CardHeader>
            <CardTitle>预测结果</CardTitle>
          </CardHeader>
          <CardContent className={'flex justify-between gap-4 h-9/10 text-xl font-medium'}>
            {result ? (
              <>
                <div className={'w-1/2 flex flex-col gap-5'}>
                  第一步：已识别到印章，如下图所示
                  <div>111</div>
                </div>
                <div className={'w-1/2 h-full flex flex-col justify-between gap-4'}>
                  <div className={'h-1/2'}>第二步结果输出</div>
                  <div className={'h-1/2'}>第三步结果输出</div>
                </div>
              </>
            ) : (
              '无'
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
