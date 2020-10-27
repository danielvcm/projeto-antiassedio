import axios from 'axios';
import { Alert } from 'react-native';
import GeoLocation from './GeoLocation'

export default{
    async sendAlertRequest(){
        const location = await GeoLocation.getLocation()
        const response = await axios.post('http://35.198.25.208:80/alert',{
            location: location
        })
        return response.status
    },
    async reportHarassment(){
        let status = await this.sendAlertRequest()
        if (status == 200){
            Alert.alert("Pronto","Assédio Reportado")
            return
        }
        Alert.alert("Erro","Algo deu errado")
    }
}