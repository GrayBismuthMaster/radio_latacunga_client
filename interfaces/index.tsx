export interface TableUsers{
    _id : string
    area : string
    email: string
    estado: boolean
    nombre: string
    roles: Array<Rol>
    username: string
}
export interface Rol {
    _id : string
    nombreRol : string
}
export interface Solicitud {
    _id : string;
    fecha_hora_solicitud : Date;
    area_mantenimiento : string;
    motivo_mantenimiento : string;
    observaciones_mantenimiento : string;
    tiempo_duracion : Date;
    hora_salida : Date;
    hora_regreso : Date;
    tipo_solicitud : TipoSolicitud;
    estado_solicitud : EstadoSolicitud;
    partes : Array<any>;
    equipo : Equipo;
    usuario : Usuario;
}
export interface Usuario {
    _id : string;
    nombre : string;
    fecha_actual : Date;
    estado : boolean;
    area : string;
    imagen ?: string;
    username : string;
    email : string;
    password ?: string;
    roles : ROL;
}
export interface Componente {
    _id : string
    nombre : string
    marca : string
    area : string
    num_serie : string
    fecha_adquirido : Date
    año_componente : string
    prioridadComponente : string
    estadoComponente : string
    equipo : Equipo
}
export interface Mantenimiento {
    _id : string;
    nombre : string;
    actividad : string;
    partes : Array<any>;
    frecuencia : string;
    prioridad : string;
    responsable : string;
    procedimiento : string;
    dias_paro : string;
    equipos : [Equipo];
    descripcion : string;
    duracion : string;
    tipo : string;
    estado : boolean
}
export interface ROL {
    _id : string;
    nombreRol : ROLES
}
export enum ROLES {
    USER = 'user',
    ADMIN = 'admin'
}
export interface Equipo {
    _id : string;
    nombre : string;
    procesador : string;
    marca : string;
    tarjeta_grafica : string;
    modelo : string;
    antivirus : string;
    sistema_operativo : string;
    espacio_disco : string;
    memoria_ram : string;
    area : string;
    estado : boolean;
    fecha_adquirido : Date;
    año_equipo : Date;
    prioridad_cpu : string;
}
export enum TipoSolicitud {
    URGENTE = 'URGENTE',
    NORMAL = 'NORMAL'
} 
export enum EstadoSolicitud {
    APROBADA = 'APROBADA',
    PENDIENTE = 'PENDIENTE',
    FINALIZADA = 'FINALIZADA',
    RECHAZADA = 'RECHAZADA'
}
export interface TrabajoNoRutinario {
    _id : string;
    tipo : string;
    nombre : string;
    actividad : string;
    equipo : Equipo
    partes : Array<any>
    area : string,
    prioridad : string,
    responsable : string,
    procedimiento : string,
    dias_paro : string,
    estado : boolean,
    duracion : string;
    fecha : Date
}
export enum TipoMantenimiento { 
    PREDICTIVO = 'PREDICTIVO',
    CORRECTIVO = 'CORRECTIVO',
    PREVENTIVO = 'PREVENTIVO'
}
export enum Prioridad {
    ALTA = 'ALTA',
    MEDIA = 'MEDIA',
    BAJA = 'BAJA'
}
export enum Area {
    EDICION = 'EDICION',
    SECRETARIA = 'SECRETARIA',
    GRABACION = 'GRABACION',
    MASTER_AM = 'MASTER_AM',
    MASTER_FM = 'MASTER_FM',
    STREAMING_AUDIO = 'STREAMING_AUDIO',
    STREAMING_VIDEO = 'STREAMING_VIDEO'
}