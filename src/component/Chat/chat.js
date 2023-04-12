
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

// import ListItem from "./ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Chat.module.css"

import { GetAnotherKatalog } from "../../graphql/query"
import useInsertToCart from "../../hooks/useInsertToCart"
import useInsertChat from "../../hooks/useInsertChat";

import { AiOutlineRight } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { borderTop } from "@mui/system"
import Cookies from "js-cookie"

const SubscriptionChat = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_chat(where: {pesanan_pakaian_id: {_eq: $_eq}}) {
    id
    message
    pesanan_pakaian_id
    user_id
  }
}
`;


const Chat = ({id}) => {

  console.log("cek item", id)

  const LoggedIn = Cookies.get("token")

  const [message, setMessage] = useState("")

  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }
  console.log("cek message", message)
  
  // const location = useLocation()
  // const { id } = location.state
  // console.log("cek state", location.state)
  // const navigate = useNavigate()

  const {data: dataChat, loading: loadingChat, error:errorChat} = useSubscription(SubscriptionChat, {variables: { _eq: id}})
  console.log("cek data pesanaan", dataChat)

  const {insertChat, loadingInsertChat} = useInsertChat()
  const sendChat = (e) => {
    e.preventDefault()
    if(LoggedIn) {
      insertChat({
        variables: {
          object: {
            pesanan_pakaian_id : id,
            user_id : Cookies.get("okogaye"),
            message : message
          }
        }
      })
    }
    setMessage("")
  }

  

    return (
        <div className={style.chat}>
          <div>
            <div>
              <div className="border-bottom mb-3 ps-2">
                <h6>SekarGaluhEtnic</h6>
                <p className="mb-2">Admin</p>
              </div>
              <div className={style.chatMessage}>
                {dataChat?.sekargaluhetnic_chat?.map((el) => 
                  <div className={el.user_id == Cookies.get("okogaye") ? style.me : style.notme}>
                    <p className="m-0">{el.message}</p>
                  </div>
                )}
              </div>
              <div className={`border-top ${style.inputChat}`}>
                <form onSubmit={sendChat}>
                  <input id="message" onChange={handleChangeMessage} type="text" name="message" placeholder="Ketik disini . . . .  :)" value={message}></input>
                  <button type="submit">Kirim</button>
                </form>
              </div>
            </div>
          </div>
      </div>
    )

}

export default Chat