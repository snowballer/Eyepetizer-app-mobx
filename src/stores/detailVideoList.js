import { observable, action , runInAction } from 'mobx'
import axios from 'axios';

class detailVideoListStore{
  @observable videoList= []

  @action getDetailVideoList(id){
    axios.get(`/api/v1/video/related/${id}?num=10`).then(
    	response =>{
        let payload = response.data;
        runInAction(()=>{
          this.videoList = payload.videoList
        })
    	}
    )
  }
}

export default new detailVideoListStore();
