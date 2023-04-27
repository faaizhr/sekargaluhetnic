import style from"./carousel.module.css"
import { useNavigate } from "react-router-dom"

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

function CarouselItem(props) {

  const navigate = useNavigate()

  const link = () => {
    navigate(props.item.link)
  }

  return (
    <div>
      <div 
        className="w-full h-[600px]"
        style=
          {{
            backgroundImage: `url(${props.item.image})`,
            backgroundSize: "cover"
          }}>
            <div className={style.cardLayer}>
              <div className="container mx-auto flex justify-end pt-40">
                <div className={`${style.carouselContent}`}>
                  <h2 className="text-right text-secondary3 text-3xl font-bold mb-3">{props.item.name}</h2>
                  <p className="text-right text-white">{props.item.description}</p>
                  <div className="flex justify-end">
                    <button onClick={link} className="px-10 py-2 rounded-md mt-5 bg-secondary2 text-white ">{props.item.button}</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CarouselItem