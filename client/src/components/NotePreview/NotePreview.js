import './notePreview.css'

const NotePreview = ({ onClick, content, title, date }) => {
  const formattedDate = new Date(date).toDateString()
  
  return (
    <div 
      className="note-preview-container"
      onClick={onClick}
      tabIndex={0}
    >
      <div className="note-preview-content">
        <span>{content}</span>
      </div>
      <div className='note-preview-title-container'>
        <span className='note-preview-date'>{formattedDate}</span>
        <span>{title}</span>
      </div>
    </div>
  )
}

export default NotePreview
