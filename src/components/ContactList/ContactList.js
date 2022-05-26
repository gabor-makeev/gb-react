import style from './ContactList.module.scss'

export const ContactList = (props) => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.header}>List of contacts:</h2>
      <ul className={style.list}>
        {props.contacts.map((contact, idx) => <span className={style['list-item']} key={idx}>{contact}</span>)}
      </ul>
    </div>
  )
}