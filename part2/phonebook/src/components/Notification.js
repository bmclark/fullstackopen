const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={`${message.error ? 'error' : 'notification'}`}>
      {message.text}
    </div>
  )
}

export default Notification