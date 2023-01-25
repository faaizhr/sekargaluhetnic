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
        className={style.carouselCard}
        style=
          {{
            backgroundImage: `url(${props.item.image})`,
            backgroundSize: "cover"
          }}>
            <div className={style.cardLayer}>
              <div className="container pt-5 pb-5 d-flex justify-content-end">
                <div className={style.carouselContent}>
                  <h2 className="text-right">{props.item.name}</h2>
                  <p className="text-right">{props.item.description}</p>
                  <button onClick={link}>{props.item.button}</button>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CarouselItem