import React from 'react'
import styles from '../../styles/index.module.css'
import { Link, useLocation} from "react-router-dom";
interface Props{
    title : string;
    path : string;
    source : string;
    alt : string;
}
export const Card = ({title, path, source, alt}:Props) => {
  return (
    <div className={styles.card}>
        <div
            className={styles.top_inside_card}
        >
            <h2 className={styles.card_title}>{title}</h2>
        
        </div>
        <div className={styles.bottom_inside_card}>
            <ul 
                className={styles.card_list}
            >
                <Link to={path}>
                    <img 
                        src = {source}
                        alt = {alt}
                        className = {styles.img}
                    />
                </Link>
            </ul>
        </div>
    </div>
  )
}
