import style from './ContactList.module.scss'
import {useState} from "react";

export const ContactList = (props) => {
  const [show, setShow] = useState(true)

  const toggleContactList = () => {
    document
      .querySelector(`.${style.button}`)
      .classList
      .toggle(style['button-close'])

    setShow(!show)
  }

  return (
    <div className={style.wrapper}>
      <h2 className={style.header}>List of contacts:</h2>
      <button className={style.button} onClick={toggleContactList}>🔽</button>
      {show &&
        <ul className={style.list}>
          {props.contacts.map((contact, idx) => <span className={style['list-item']} key={idx}>{contact}</span>)}
        </ul>
      }
    </div>
  )
}