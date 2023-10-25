import { useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import VideoPreview from './VideoPreview'

const Starter = () => {
  const [videoUrl, setVideoUrl] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile)
      setVideoUrl(objectURL)
    }
  }

  return (
    <div>
      <FormGroup>
        <Label for="exampleFile">Video</Label>
        <Input
          id="exampleFile"
          name="file"
          type="file"
          onChange={handleFileChange}
        />
      </FormGroup>
      <VideoPreview videoUrl={videoUrl} />
    </div>
  )
}

export default Starter
