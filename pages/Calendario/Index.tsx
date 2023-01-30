
import { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import {Calendar, momentLocalizer} from "react-big-calendar"
import moment from 'moment'
import "moment/locale/es.js"
import "react-big-calendar/lib/css/react-big-calendar.css";
import {fetchTrabajosNoRutinarios} from '../../redux/actions/trabajosNoRutinarios'
import {TipoMantenimiento, TrabajoNoRutinario} from '../../interfaces/'
interface Props{
    fetchTrabajosNoRutinarios : ()=>any,
    trabajosNoRutinarios : Array<any>
}
const Index = ({fetchTrabajosNoRutinarios, trabajosNoRutinarios} : Props) => {
    const [localizer, setLocalizer] = useState(momentLocalizer(moment));

    useEffect(() => {
        fetchTrabajosNoRutinarios();
        console.log(trabajosNoRutinarios)
        return () => {
        
        };
    }, [])
    const handleSelect = ({ start, end }:any) => {
        console.log('desde handle select')
        console.log(start, end) 
       
    }

    const eventsFilter =  trabajosNoRutinarios.map((trabajoNoRutinario:TrabajoNoRutinario) => {
        return {
            title: trabajoNoRutinario.nombre,
            start: moment(trabajoNoRutinario.fecha).toDate(),
            end: moment(trabajoNoRutinario.fecha).toDate(),
            tipo : trabajoNoRutinario.tipo,
            // id_reserva : reservaCita.id
        }
    })
  return (
    <Calendar
        selectable
        events={eventsFilter}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style = {{
            height: '100vh',
            width: '100%',
        }}
        messages={{
            next: ">",
            previous: "<",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
        }}
        defaultDate={moment().toDate()}
        onSelectEvent={(event:any) => {
            console.log('enveer')
            console.log(event);
            

        }}
        onSelectSlot={handleSelect}
        eventPropGetter ={
            (event:any, start:any, end:any, isSelected:any) => {
                let newStyle = {
                color: 'black',
                borderRadius: "10px",
                boxShadow : "5px 5px 5px rgba(0,0,0,0.3)",
                fontSize : '14px',
                padding : '7px',
                width: '80%',
                height:'90%',
                textAlign: 'center',
                display: 'flex',
                alignItems : 'center',
                margin: 'auto',
                backgroundImage : 'linear-gradient(to right, #f6d365, #fda085)',
                };
        
                
            if (event.tipo === TipoMantenimiento.PREVENTIVO){
                newStyle.backgroundImage = "linear-gradient(to left, #88bd95, #138934b9)";
                newStyle.color = "white"
            } else if(event.tipo === TipoMantenimiento.PREDICTIVO){
                newStyle.backgroundImage = `linear-gradient(to right, #f6f700, #feffdf)`;
                newStyle.color = "white"
            } else if(event.tipo === TipoMantenimiento.CORRECTIVO){
                newStyle.backgroundImage = `linear-gradient(to right, #fc0000, #ffdfdf)`;
                newStyle.color = "white"
            }

        
                return {
                className: "",
                style: newStyle
                };
            }
        }
    />
  )
}
const mapStateToProps = ( state : any )=>{
    const {trabajosNoRutinarios} = state;
    return {
        trabajosNoRutinarios : Object.values(trabajosNoRutinarios)
    }
}

export default connect(
    mapStateToProps,
    {fetchTrabajosNoRutinarios}
)(Index);