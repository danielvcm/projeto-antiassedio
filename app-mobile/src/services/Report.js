import axios from 'axios';
import { Alert } from 'react-native';
import GeoLocation from './GeoLocation'

export default{
    async sendAlertRequest(){
        const location = await GeoLocation.getLocation()
        response = await axios.post('http://955cd8b51c88.ngrok.io/alert',{
            location: location
        })
        return response.status
    },
    async reportHarassment(){
        status = await this.sendAlertRequest()
        if (status == 200){
            Alert.alert("Pronto","Assédio Reportado")
            return
        }
        Alert.alert("Erro","Algo deu errado")
    }
}