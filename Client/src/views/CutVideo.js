import React, { useEffect, useRef } from 'react'

function VideoSegmenter({ videoSrc }) {
  const videoRef = useRef(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const segments = [
    {
      title: 'Đoạn 1',
      start: 0,
      end: 10,
    },
    {
      title: 'Đoạn 2',
      start: 20,
      end: 30,
    },
    // Thêm các đoạn khác nếu cần
  ] 

  useEffect(() => {
    if (!videoRef.current) return

    // Xử lý tách video thành các đoạn nhỏ
    segments.forEach((segment, index) => {
      const segmentVideo = document.createElement('video')
      segmentVideo.src = videoSrc
      segmentVideo.currentTime = segment.start
      segmentVideo.ontimeupdate = () => {
        if (segmentVideo.currentTime >= segment.end) {
          segmentVideo.pause()
          setTimeout(() => {
            segmentVideo.currentTime = segment.start
          }, 1000)
        }
      }

      // Thêm video đoạn vào component
      videoRef.current.appendChild(segmentVideo)

      // Hiển thị tiêu đề cho đoạn video
      const title = document.createElement('div')
      title.textContent = segment.title
      videoRef.current.appendChild(title)

      segmentVideo.play()
    })
  }, [videoSrc, segments])

  return (
    <div>
      <div ref={videoRef}>
        {/* Các đoạn video và tiêu đề tương ứng sẽ được hiển thị tại đây */}
      </div>
    </div>
  )
}

export default VideoSegmenter
