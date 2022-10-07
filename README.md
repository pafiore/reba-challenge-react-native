# Reba: Desafío Técnico

Lista             |  Detalle
:-------------------------:|:-------------------------:
![](https://i.postimg.cc/NM39SxwV/screenshot-01.png)  |  ![](https://i.postimg.cc/x1CxrHc4/screenshot-03.png)



# Instalación
1. Instalación de dependencias: `$ npm install`
2. Deploy Android **(*)**: `$ npm run android`
3. Deploy iOS: `$ npm run ios`

**(*)** Si se intenta hacer el deploy desde Visual Code, se debe especificar el path del JDK en el archivo **\android\gradle.properties**. <br />
Ver línea 44 de dicho archivo:<br />
`org.gradle.java.home=INGRESAR_PATH` <sub>_(Ejemplo: C:\\Program Files\\Java\\jdk-11)_</sub>

#  Plataformas soportadas
- :heavy_check_mark: Android
- :heavy_check_mark: iOS

#  Tareas Realizadas

<table>
<tr><th>Requisitos mínimos</th><th>Requisitos opcionales</th></tr>
<tr><td>

|Tarea| Status |
|--|:--:|
| Usar componentes funcionales y hooks | :heavy_check_mark:   |
| Crear al menos un custom hook        | :heavy_check_mark:   |
| Usar React Navigation v5 o v6        | :heavy_check_mark:   |
| Usar typescript                      | :heavy_check_mark:   |

</td><td valign="top">

|Tarea| Status |
|--|:--:|
| Crear al menos un test unitario en Jest           | :heavy_check_mark:   |
| Crear una opción para marcar/desmarcar elementos  | :heavy_check_mark:   |
| Preservar elementos seleccionados entre sesiones  | :heavy_check_mark:   |

</td></tr> </table>
