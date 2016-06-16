import React, { Component } from 'react';

//import TorrentsList from './TorrentsList.react';



/*
|--------------------------------------------------------------------------
| Global View
|--------------------------------------------------------------------------
*/

export default class Torrents extends Component {

    constructor(props) {

        super(props);
        this.state = {}
    }

    render() {

        let content;

        if(this.props.torrents === null) {
            content = (
                <div className='full-message'>
                    <p>{ 'Loadin\' stuff...' }</p>
                </div>
            );
        }else if (this.props.torrents.length == 0) {
            content = (
                <div className='full-message'>
                    <p>Not torrents available</p>
                </div>
            );
        }
        else {
            /*content = (
                <TorrentsList
                    torrents={ this.props.torrents }
                />
            );*/
        }

        return (
            <div className='view view-torrents-list' >
                { content }
            </div>
        );
    }
}
