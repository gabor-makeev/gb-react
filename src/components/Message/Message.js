import style from './Message.module.scss'

export const Message = (props) => {

  const copyMessageContent = () => {
    navigator.clipboard.writeText(props.content)
      .then(() => {
        const messageBox = document.querySelector(`.${style.message}`)
        const messageOriginalValue = messageBox.textContent

        messageBox.textContent = 'text copied'

        setTimeout(() => {
          messageBox.textContent = messageOriginalValue
        }, '1500')
      })
  }

  return <p className={style.message} onClick={copyMessageContent}>Message: "{props.content}"</p>
}