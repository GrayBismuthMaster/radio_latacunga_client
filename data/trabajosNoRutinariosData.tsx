import { Prioridad, TipoMantenimiento } from "../interfaces"

export const trabajosNoRutinariosData = [
    {
        name : "nombre",
        type : 'text'
    },
    {
        name : "actividad",
        type : 'text'
    },
    
    {
        name : "duracion",
        type : 'text'
    },
    {
        name : "area",
        type : 'text'
    },
    {
        name : "responsable",
        type : 'text'
    },
    {
        name : "procedimiento",
        type : 'text'
    },
    {
        name : "dias_paro",
        type : 'number'
    },
    {
        name : "fecha",
        type : 'date'
    },
]
export const trabajosNoRutinariosCheckboxData = [
    {
        name : 'TECLADO',
        type : 'checkbox'
    },
    {
        name : 'MONITOR',
        type : 'checkbox'
    },
    {
        name : 'PARLANTE',
        type : 'checkbox'
    },
    {
        name : 'MOUSE',
        type : 'checkbox'
    },
    {
        name : 'CONSOLA',
        type : 'checkbox'
    },
    {
        name : 'MICROFONO',
        type : 'checkbox'
    },
    {
        name : 'CPU',
        type : 'checkbox'
    },
    {
        name : 'SERVIDOR',
        type : 'checkbox'
    },
    {
        name : 'IMPRESORA',
        type : 'checkbox'
    }
]

export const selectTNRTipoData = [
        { 
            value: TipoMantenimiento.CORRECTIVO, 
            label: 'M. Correctivo' 
        },
        { 
            value: TipoMantenimiento.PREDICTIVO, 
            label: 'M. Predictivo' 
        },
        { 
            value: TipoMantenimiento.PREVENTIVO, 
            label: 'M. Preventivo' 
        },
]
export const selectTNRPrioridadData = [
    { 
        value: Prioridad.ALTA, 
        label: 'P. Alta' 
    },
    { 
        value: Prioridad.MEDIA, 
        label: 'P. Media' 
    },
    { 
        value: Prioridad.BAJA, 
        label: 'P. baja' 
    },
]