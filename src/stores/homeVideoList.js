import { observable, action , runInAction } from 'mobx'
import axios from 'axios';

class homeVideoListStore{
  //初始数据
  @observable videoList= []

  //action
  @action getHomeVideoList(){
    axios.get(`/api/v1/feed`).then(
    	response =>{
        let payload = response.data.dailyList[0];
        runInAction(()=>{
          this.videoList = payload.videoList
        })
    	}
    )
  }
}

export default new homeVideoListStore();
