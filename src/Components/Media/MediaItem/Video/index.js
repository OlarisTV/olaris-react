import React from 'react'
import videojs from 'video.js'
import chromecast from '@silvermine/videojs-chromecast'

videojs.registerPlugin('chromecast', chromecast);

export default class Video extends React.Component {
    componentDidMount() {
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            
        });
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <div>
                <div data-vjs-player>
                    <video ref={node => this.videoNode = node} className="video-js"></video>
                </div>
            </div>
        )
    }
}
