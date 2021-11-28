import http from "../http-common.js";
class textDataService{
    getAll() {
        return http.get("/texts");
      }
    
      get(url) {
        return http.get(`/texts/${url}`);
      }
    
      create(data) {
        return http.post("/texts/add", data);
      }
      update(data) {
        return http.put("/texts/update", data);
      }
      delete(url){
          return http.delete(`/texts/delete/${url}`);
      }
}
export default new textDataService();