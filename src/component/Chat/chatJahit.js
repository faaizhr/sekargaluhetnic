
import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"

// import ListItem from "./ListItem"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Chat.module.css"

import { GetAnotherKatalog } from "../../graphql/query"
import useInsertToCart from "../../hooks/useInsertToCart"
import { InsertChatJahit } from "../../graphql/mutation";
// import useInsertChat from "../../hooks/useInsertChat";

import { AiOutlineRight } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi"
import { IoSend } from "react-icons/io5"
import { AiOutlineClose } from "react-icons/ai"

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
  sekargaluhetnic_chat_jahit(where: {pesanan_jahit_id: {_eq: $_eq}}) {
    id
    message
    user_id
    pesanan_jahit_id
  }
}
`;


const ChatJahit = ({id, popUp, chatModal}) => {

  // console.log("cek item", id)
  // console.log("cek popup", popUp)
  // console.log("cek chatmodal", chatModal)

  const LoggedIn = Cookies.get("token")

  const [message, setMessage] = useState("")

  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }
  // console.log("cek message", message)
  
  // const location = useLocation()
  // const { id } = location.state
  // console.log("cek state", location.state)
  // const navigate = useNavigate()

  const {data: dataChat, loading: loadingChat, error:errorChat} = useSubscription(SubscriptionChat, {variables: { _eq: id}})
  console.log("cek data chat", dataChat)

  const [insertChat, {loading: loadingInsertChat}] = useMutation(InsertChatJahit)
  const sendChat = (e) => {
    e.preventDefault()
    if(LoggedIn) {
      insertChat({
        variables: {
          object: {
            pesanan_jahit_id : id,
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
              <div className="border-b mb-3 pl-2 flex justify-between">
                <div>
                  <h6>SekarGaluhEtnic</h6>
                  <p className="mb-2">Admin</p>
                </div>
                <div className="p-1">
                  <AiOutlineClose onClick={popUp} className="w-5 h-5 fill-secondary hover:fill-red-800 cursor-pointer"/>
                </div>
              </div>
              <div className="h-96 flex-col-reverse flex overflow-y-scroll">
                <div>
                  {dataChat?.sekargaluhetnic_chat_jahit?.map((el) => 
                    <div className={el.user_id == Cookies.get("okogaye") ? "bg-secondary px-3 py-2 w-3/4 flex justify-end mb-1 ml-auto mr-2 rounded-tl-xl rounded-bl-xl rounded-br-xl" : "bg-secondary3 text-black px-3 py-2 w-3/4 flex justify-start mb-1 ml-0 mr-auto rounded-tr-xl rounded-bl-xl rounded-br-xl"}>
                      <p className={ el.user_id == Cookies.get("okogaye") ? "m-0 font-normal text-sm text-white" : "m-0 font-normal text-sm text-black"}>{el.message}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t px-2 py-2">
                <form onSubmit={sendChat}>
                  <input className="border-b w-10/12 px-1 py-[6px] focus:outline-none text-sm focus:border-b-primary" id="message" onChange={handleChangeMessage} type="text" name="message" placeholder="Ketik disini . . . . " value={message} ></input>
                  <button className="bg-secondary w-2/12 px-1 py-3 text-white rounded-r-md text-xs hover:bg-secondary2 duration-200" type="submit">
                    <IoSend className="w-4 h-4 mx-auto"/>
                  </button>
                </form>
              </div>
            </div>
          </div>
      </div>
    )

}

export default ChatJahit