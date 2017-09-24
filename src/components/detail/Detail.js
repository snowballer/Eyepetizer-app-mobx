import React,{Component} from 'react';
import {
  is,
  fromJS
} from 'immutable'
import { observer, inject } from 'mobx-react';

import Loading from '../common/loading'
import Container from './container'
import Article from './article'
import Player from './player'
import PlayingInfo from './playingInfo'
import Download from './download'
import RelateList from './relateList'
import ReplyList from './replyList'
import Tag from './tag'
import Footer from './footer'
import Bar from './bar'

@inject('detailVideoInfo','detailVideoList','detailReplyList')
@observer
class Detail extends Component {

  componentWillMount () {
    window.scrollTo(0, 0)
    const ID = this.props.match.params.id
    if (!ID) {
      this.props.history.push('/')
    } else {
      const { detailVideoInfo, detailVideoList, detailReplyList} = this.props
      detailVideoInfo.getDetailVideoInfo(ID)
      detailVideoList.getDetailVideoList(ID)
      detailReplyList.getDetailReplyList(ID)
    }
  }

  shouldComponentUpdate (nextProps) {
    return !is(fromJS(nextProps), fromJS(this.props))
  }

  render() {
    const {
			detailVideoInfo: { videoInfo },
			detailVideoList: { videoList },
			detailReplyList: { replyList }
		} = this.props;
    if (videoInfo && videoList && replyList) {
      return (
        <div>
          <Container>
            <Player url={ videoInfo.playUrl } cover={videoInfo.coverForDetail}/>
            <Article style={{backgroundImage:`url(${videoInfo.coverBlurred})`}}>
              <PlayingInfo videoInfo={ videoInfo } />
              <Download />
              <RelateList videoList={ videoList } />
              <ReplyList replyList={ replyList } />
              {
                videoInfo.tags &&
                videoInfo.tags.length ? <Tag tags={ videoInfo.tags } /> : ""
              }
              <Footer />
            </Article>
          </Container>
          <Bar />
        </div>
      )
    } else {
      return <Loading />
    }
  }
}


export default function (props) {
  return (<Detail {...props} key={props.match.url} />);
}
