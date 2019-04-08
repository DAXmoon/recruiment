const host='http://pf.stalary.com'


export default{
    getCompany(){
        return host+'/company'
    },
    getCompanyDetail(id){
        return host+`/company/${id}`
    }
}