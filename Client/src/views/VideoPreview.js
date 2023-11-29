import React, { useState } from 'react'
import CutVideo from './CutVideo'

const VideoPreview = ({ videoUrl }) => {
  const [startTime, setStartTime] = useState(0) // Thời gian bắt đầu mặc định
  const [endTime, setEndTime] = useState(0) // Thời gian kết thúc mặc định

  const handleCutVideo = () => {
    // Xử lý cắt video dựa trên startTime và endTime
    // Chuyển startTime và endTime sang định dạng phù hợp (giây, mili-giây, vv.) và gọi hàm cắt video ở đây
  }

  return (
    <div>
      {videoUrl && (
        <div>
          <video width="320" height="240" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
{/* 
          <div>
            <label htmlFor="startTime">Thời gian bắt đầu (giây):</label>
            <input
              type="number"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <button onClick={handleCutVideo}>Cắt Video</button> */}
          <CutVideo videoSrc={videoUrl} />
        </div>
      )}
    </div>
  )
}

export default VideoPreview
