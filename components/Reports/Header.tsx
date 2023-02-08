
import {PDFViewer, Document, Page, Text, View,Image} from '@react-pdf/renderer';
// import {Mantenimiento } from '../../interfaces';
import Logo from '../../assets/LogoCrop.png';
interface Props {
    tipoDocumento : string;
    nombre : string;
    direccion : string
}
export const Header = ({tipoDocumento,  nombre, direccion}:any)=>{
    return(
        <>
            {/* DIV PARA EL ENCABEZADO HORIZONTAL  */}
            <View style={{
                flexDirection : 'row',
                height: '6%',
                justifyContent : 'center',
                borderColor : 'rgba(0,0,0,0.1)',
                borderWidth : 1,
                marginVertical : '8%'
                // backgroundColor : 'blue',
                }}>
                {/* HEADER  */}
                <View
                    style={{
                    flex : 1,
                    // backgroundColor : 'black',
                    flexDirection : 'row',
                    // borderColor : 'rgba(0,0,0,0.1)',
                    // borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                    }}
                >
                    <Image
                    src={Logo}
                    style = {{
                        width : '30%'
                    }}
                    />
                </View>
                <View
                style={{
                    flex : 1,
                    // backgroundColor : 'white',
                    justifyContent : 'center',
                    alignContent : 'center',
                    alignItems : 'center',
                    // borderColor : 'rgba(0,0,0,0.1)',
                    // borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                }}
                >
                    <Text
                        style={{
                            fontSize : 10,
                            alignSelf : 'center'
                        }}
                    >
                    {nombre}
                    </Text>
                    <Text
                        style={{
                            fontSize : 8,
                            // alignSelf : 'center',
                            // paddingVertical : 10
                        }}
                    >
                    Dirección : {direccion}
                    </Text>
                    <Text
                        style={{
                            fontSize : 8,
                            // alignSelf : 'center',
                            // paddingVertical : 10
                        }}
                    >
                     {tipoDocumento}
                    </Text>
                </View>
                
                {/* FIN HEADER  */}
                </View>
                {/* FIN DIV PARA LA DIVISION DEL ENCABEZADO  */}
        </>
    )
}