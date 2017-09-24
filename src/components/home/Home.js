import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {is,fromJS} from 'immutable';
import { mediaSize } from '../style';
import { observer, inject } from 'mobx-react';

//底层样式
import Container from './container';
//banner
import Banner from './banner/container';
import BannerMenu from './banner/menu';
import BannerContent from './banner/content';
import BannerPlayer from './banner/player';
import BannerAlbum from './banner/album';

import Divider from './divider';

import Cover from './cover'
//downloader
import Downloader from './downloader';
import DownloaderSlogan from './downloader/slogan';
import DownloaderLogos from './downloader/logos/container'
import LogosIcon from './downloader/logos/icon'
import LogosLogo from './downloader/logos/logo'
import LogosDownload from './downloader/logos/download'

//footer
import Footer from './footer'

import Modal from '../common/modal'

@inject('homeVideoList')
@observer
class Home extends Component {
  constructor (props) {
    super(props)
    const today = moment().format('MMM. D');
    this.state = {
      today: `- ${today} -`,
      platform: null,
      videoUrl: 'http://static.kaiyanapp.com/eyepetizer-web/homepage.mp4',
      isShowVideo: this.isShowVideo() // mount并不会触发resize
    }
    this.handlerPlatform = this.handlerPlatform.bind(this)
  }

  componentWillMount () {
    window.scrollTo(0, 0)
    const { homeVideoList } = this.props;
    homeVideoList.getHomeVideoList();
  }

  componentDidMount () {
    window.onresize = _ => {
      // 调试时响应式切换
        this.setState({
          isShowVideo: this.isShowVideo()
        })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !is(fromJS(nextProps), fromJS(this.props)) || !is(fromJS(this.state), fromJS(nextState))
  }

  // 处理平台信息
  handlerPlatform (platform) {
    platform = platform || null;
    switch (platform) {

      case 'BackEnd':
        window.open('http://open.eyepetizer.net/#!/landing')
        break

      case 'Weibo':
        window.open('//weibo.com/eyepetizer')
        break

      case 'Email':
        window.location.href = 'mailto:bd@eyepetizer.net'
        break

      default:
        this.setState({ platform }) // WeChat iOS Android ''
        break

    }
  }

  isShowVideo () {
    return !(window.innerWidth <= mediaSize)
  }

  render() {
    const { videoList } = this.props.homeVideoList;
    const { platform, isShowVideo, videoUrl, today } = this.state;
    return (
      <Container>
        <Banner>
          <BannerMenu clickHandler={this.handlerPlatform}/>
          <BannerContent clickHandler={this.handlerPlatform}/>
          {
            isShowVideo
            ? <div>
                <BannerPlayer isPlay autoPlay loop muted url={videoUrl}/>
              </div>
            : <BannerAlbum/>
          }
        </Banner>

        <Divider text={today}/>
        {
          videoList && videoList.map(item => (
          <Link to={`/detail/${item.id}`} key={item.id}>
            <Cover cover={item.coverForFeed} title={item.title} category={item.category} time={item.duration} />
          </Link>
        ))
        }

        <Downloader>
          <DownloaderSlogan/>

          <DownloaderLogos>
            <LogosIcon/>
            <LogosLogo/>
            <LogosDownload clickHandler={this.handlerPlatform}/>
          </DownloaderLogos>

        </Downloader>


        <Footer />
        <Modal platform={platform} isShow={!!platform} close={this.handlerPlatform}/>

      </Container>
    );
  }
}

export default Home
