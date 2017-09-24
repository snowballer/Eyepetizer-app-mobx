import { observable, action , runInAction } from 'mobx'
import axios from 'axios';

class detailVideoInfoStore{
  @observable videoInfo= {}

  @action getDetailVideoInfo(id){
    axios.get(`/api/v1/video/${id}`).then(
    	response =>{
        let payload = response.data;
        runInAction(()=>{
          this.videoInfo = payload
        })
    	}
    )
  }
}

export default new detailVideoInfoStore();
