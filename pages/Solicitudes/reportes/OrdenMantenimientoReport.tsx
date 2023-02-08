import { useLocation } from "react-router-dom";
import { PDFViewer, Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { Header } from '../../../components/Reports/Header';
import style from './ordenStyles.module.css';
export const OrdenMantenimientoReport = () => {
    const location = useLocation();
    console.log(location.state.datosFila);
    const { area_mantenimiento, mantenimiento_detalles, componente_detalles, usuario, motivo_mantenimiento, hora_salida, fecha_salida, observaciones_mantenimiento, nombreAuth } = location.state.datosFila;
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
                            tipoDocumento={'ORDEN DE MANTENIMIENTO'}
                            nombre={'RADIO LATACUNGA'}
                            direccion={'Latacunga - Gualundun'}
                        />
                        {/* TOP BODY  */}
                        <View
                            style={{
                                display: 'flex',
                                // flex : 1,
                                // backgroundColor: 'red',
                                height: '8%',
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
                                        AREA
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        // backgroundColor: 'yellow',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'light',
                                        fontSize: 8
                                    }}
                                >
                                    <Text>
                                        {area_mantenimiento}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 2,
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
                                        ACTIVIDADES
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        // backgroundColor: 'yellow',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'light',
                                        fontSize: 8
                                    }}
                                >
                                    <Text>
                                        {mantenimiento_detalles.actividad}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor: 'green'
                                    borderWidth: 1,
                                    borderColor: 'black'
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
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
                                        COMPONENTE
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        // backgroundColor: 'yellow',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'light',
                                        fontSize: 8
                                    }}
                                >
                                    <Text>
                                        {componente_detalles.nombre}
                                    </Text>
                                </View>
                            </View>
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
                                marginVertical: '2%',
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
                                display: 'flex',
                                // flex : 1,
                                // backgroundColor: 'red',
                                height: '15%',
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                marginVertical: '2%',
                                width: '70%',
                                alignSelf: 'center'
                            }}
                        >
                            <View
                                style={{
                                    flex: 2,
                                    // backgroundColor : 'blue',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor : 'black',
                                    borderWidth : 1
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 8,
                                        marginVertical: 5
                                    }}
                                >NOMBRE Y FIRMA DEL SOLICITANTE</Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 10
                                    }}
                                >{usuario}</Text>
                                <Text
                                    style={{
                                        flex: 4,
                                        fontSize: 10
                                    }}
                                ></Text>
                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    // backgroundColor : 'yellow',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor : 'black',
                                    borderWidth : 1
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 8,
                                        marginVertical: 5
                                    }}
                                >NOMBRE Y FIRMA PERSONA AUTORIZADA</Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 10
                                    }}
                                >{nombreAuth}</Text>
                                <Text
                                    style={{
                                        flex: 4,
                                        fontSize: 10
                                    }}
                                ></Text>
                            </View>
                        </View>
                        {/* FIN FOOTER  */}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}