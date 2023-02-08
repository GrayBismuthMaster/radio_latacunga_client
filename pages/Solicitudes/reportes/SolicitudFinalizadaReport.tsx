import { useLocation } from "react-router-dom";
import { PDFViewer, Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { Header } from '../../../components/Reports/Header';
import style from './ordenStyles.module.css';
export const SolicitudFinalizadaReport = () => {
    const location = useLocation();
    console.log(location.state.datosFila);
    const { area_mantenimiento, mantenimiento_detalles, componente_detalles, usuario, motivo_mantenimiento, hora_salida, fecha_salida, observaciones_mantenimiento, nombreAuth, cedula } = location.state.datosFila;
    return (
        <PDFViewer style={{
            width: '100%',
            height: '100%'
        }}>
            <Document>
                <Page >
                    <View style={{
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                        // backgroundColor: 'green',
                        padding: '1% 5%',
                    }}>
                        <Header
                            tipoDocumento={'MANTENIMIENTO FINALIZADO'}
                            nombre={'RADIO LATACUNGA'}
                            direccion={'Latacunga - Gualundun'}
                        />
                        {/* TOP BODY  */}
                        <View
                            style={{
                                display: 'flex',
                                // flex : 1,
                                // backgroundColor: 'red',
                                height: '28%',
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor: 'blue',
                                    justifyContent: 'center',
                                    alignContent: 'center',

                                    borderWidth: 1,
                                    borderColor: 'black'
                                    // alignItems : 'center'
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        // backgroundColor: 'white',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 10,
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        width: '100%'
                                    }}
                                >
                                    <Text>
                                        Lugar : Latacunga
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 5,
                                        // backgroundColor: 'yellow',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'light',
                                        fontSize: 8
                                    }}
                                >
                                    <Text>
                                        NOMBRES Y APELLIDOS DEL SOLICITANTE : {usuario}
                                    </Text>
                                    <Text>
                                        CARGO : {area_mantenimiento}
                                    </Text>
                                    <Text>
                                        MOTIVO : {motivo_mantenimiento}
                                    </Text>
                                    <Text>
                                        HORA DE SALIDA : {hora_salida}
                                    </Text>
                                    <Text>
                                        OBSERVACIONES : {observaciones_mantenimiento}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    // backgroundColor: 'green',

                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        alignContent: 'center',
                                        alignItems: 'center',

                                        fontWeight: 'bold',
                                        fontSize: 10,
                                        width: '100%',
                                    }}
                                >
                                    <Text>
                                        Fecha : {new Date(Date.now()).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 5,
                                        // backgroundColor: 'yellow',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'light',
                                        fontSize: 8
                                    }}
                                >
                                    <Text>
                                        C.I : {cedula}
                                    </Text>
                                    <Text>
                                        Área : {area_mantenimiento}
                                    </Text>
                                    <Text>
                                        Tiempo de duración : {mantenimiento_detalles.duracion} horas
                                    </Text>
                                </View>
                            </View>
                        </View>
                        
                            <View
                                style={{
                                    display : 'flex',
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    height : '15%',
                                    justifyContent : 'center',
                                    alignContent : 'center',
                                    alignItems : 'center',
                                    flexDirection : 'column',
                                    fontSize : 10
                                }}
                            >
                                <Text>
                                    ___________________
                                </Text>
                                <Text>
                                    Firma del Solicitante
                                </Text>
                            </View>
                        {/* FIN TOP BODY  */}


                        {/* BODY  */}
                        <View
                            style={{
                                display: 'flex',
                                // flex : 1,
                                // backgroundColor: 'red',
                                height: '35%',
                                justifyContent: 'space-around',
                                flexDirection: 'column',
                                marginTop: '2%',
                                borderWidth: 1,
                                borderColor: 'black'
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor: 'white',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    width: '100%'
                                }}
                            >
                                <Text>
                                    DESCRIPCIÓN DEL COMPONENTE
                                </Text>
                            </View>


                            <View
                                style={{
                                    flex: 3,
                                    // backgroundColor: 'gray',
                                    flexDirection: 'row',
                                }}
                            >
                                {/* FIRST ROW  */}
                                <View
                                    style={{
                                        flex: 1,
                                        // backgroundColor: 'blue',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        // alignItems : 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            // backgroundColor: 'white',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 6
                                        }}
                                    >
                                        <Text>
                                            COMPONENTE : {componente_detalles.nombre}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            // backgroundColor: 'yellow',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'light',
                                            fontSize: 6
                                        }}
                                    >
                                        <Text>
                                            SERIAL : {componente_detalles.num_serie}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        // backgroundColor: 'green'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            // backgroundColor: 'white',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 6
                                        }}
                                    >
                                        <Text>
                                            MARCA : {componente_detalles.marca}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            // backgroundColor: 'yellow',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'light',
                                            fontSize: 6
                                        }}
                                    >
                                        <Text>
                                            SOLICITANTE : {usuario}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        // backgroundColor: 'green'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            // backgroundColor: 'white',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 6
                                        }}
                                    >
                                        <Text>
                                            TIPO : {componente_detalles.tipo}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            // backgroundColor: 'yellow',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'light',
                                            fontSize: 6
                                        }}
                                    >
                                        <Text>
                                            TIEMPO DE DURACIÓN : {mantenimiento_detalles.duracion} horas
                                        </Text>
                                    </View>
                                </View>
                                {/* FIN FIRST ROW  */}

                            </View>

                            {/* COMPONENTE ROW  */}
                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor : 'white',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'light',
                                    fontSize: 6
                                }}
                            >
                                <Text>
                                    MOTIVO : {motivo_mantenimiento}
                                </Text>
                            </View>
                            {/* FIN COMPONENTE ROW  */}
                            {/* COMPONENTE ROW  */}
                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor : 'white',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'light',
                                    fontSize: 6
                                }}
                            >
                                <Text>
                                    ACTIVIDADES A REALIZAR : {mantenimiento_detalles.actividad}
                                </Text>
                            </View>
                            {/* FIN COMPONENTE ROW  */}
                            {/* COMPONENTE ROW  */}
                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor : 'white',
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    fontWeight: 'light',
                                    fontSize: 6,
                                    flexDirection: 'row',
                                }}
                            >
                                <Text
                                    style={{
                                        marginHorizontal: 15
                                    }}
                                >
                                    HORA DE SALIDA : {hora_salida}
                                </Text>
                                <Text>
                                    FECHA DE SALIDA : {fecha_salida}
                                </Text>
                            </View>
                            {/* FIN COMPONENTE ROW  */}
                            {/* COMPONENTE ROW  */}
                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor : 'white',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'light',
                                    fontSize: 6
                                }}
                            >
                                <Text>
                                    OBSERVACIONES : {observaciones_mantenimiento}
                                </Text>
                            </View>
                            {/* FIN COMPONENTE ROW  */}
                        </View>

                        {/* FIN BODY  */}
                        {/* FOOTER  */}
                        <View
                                style={{
                                    display : 'flex',
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    height : '15%',
                                    justifyContent : 'center',
                                    alignContent : 'center',
                                    alignItems : 'center',
                                    flexDirection : 'column',
                                    fontSize : 10
                                }}
                            >
                                <Text>
                                    ___________________
                                </Text>
                                <Text>
                                    Firma del Responsable
                                </Text>
                            </View>
                        {/* FIN FOOTER  */}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}