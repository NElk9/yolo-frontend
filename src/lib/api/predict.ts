export const predict = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  const response = await fetch('http://127.0.0.1:5000/detect', {
    method: 'POST',
    body: formData,
  })
  return await response.json()
}

export const compare = async (formData: FormData) => {
  const response = await fetch('http://127.0.0.1:5000/process_second_image', {
    method: 'POST',
    body: formData,
  })
  return await response.json()
}
