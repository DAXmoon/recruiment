import api from './index'
import axios from 'axios'


let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + localStorage.getItem('token')
}

export default {
    getCompany () {
      return axios.get(api.getCompany(), {params: {size: 9}}, {headers: headers})
    },
    getCompanyDetail(){
        return axios.get(api.getCompanyDetail(id),{headers:headers})
    }
}