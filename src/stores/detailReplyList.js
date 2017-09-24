import { observable, action , runInAction } from 'mobx'
import axios from 'axios';

class detailReplyListStore{
  @observable replyList= []

  @action getDetailReplyList(id){
    axios.get(`/api/v1/replies/video/?id=${id}&num=5`).then(
    	response =>{
        let payload = response.data;
        runInAction(()=>{
          this.replyList = payload.replyList
        })
    	}
    )
  }
}

export default new detailReplyListStore();
