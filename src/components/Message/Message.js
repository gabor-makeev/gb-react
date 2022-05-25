import style from './Message.module.scss'

export const Message = (props) => {
  return <p className={style.message}>Message: "{props.content}"</p>
}