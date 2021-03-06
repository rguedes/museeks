import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Icon from 'react-fontawesome';
import Input from 'react-simple-input';

import PlayingBar from './PlayingBar.react';
import Queue      from './Queue.react';

import AppActions from '../../actions/AppActions';

import app from '../../utils/app';



/*
|--------------------------------------------------------------------------
| Header
|--------------------------------------------------------------------------
*/

export default class Header extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showVolume : false,
            showQueue  : false
        }
    }

    render() {

        let playButton = (
            <button className='player-control play' onClick={ () => this.playToggle() }>
                <Icon name={ this.props.playerStatus === 'play' ? 'pause' : 'play' } fixedWidth />
            </button>
        );

        return (
            <header className='row'>
                <Col sm={3} className='main-controls'>
                    <div className='window-controls'>
                        <button className='window-control' onClick={ this.winClose.bind(null) }>&times;</button>
                    </div>

                    <div className='player-controls text-center'>
                        <button type='button' className='player-control previous' onClick={ this.previous.bind(null) }>
                            <Icon name='backward' />
                        </button>
                        { playButton }
                        <button type='button' className='player-control forward' onClick={ this.next.bind(null) }>
                            <Icon name='forward' />
                        </button>
                        <button type='button' className='player-control volume' onMouseEnter={ this.showVolume.bind(this) } onMouseLeave={ this.hideVolume.bind(this) } onClick={ (e) => { this.mute(e) }  }>
                            <Icon name={ app.audio.volume === 0 ? 'volume-off' : app.audio.volume > 0.5 ? 'volume-up' : 'volume-down' } />
                            <div className={ this.state.showVolume ? 'volume-control visible' : 'volume-control' }>
                                <input type={'range'} min={0} max={1} step={0.01} defaultValue={ app.audio.volume } ref='volume' onChange={ this.setVolume.bind(this) } />
                            </div>
                        </button>
                    </div>
                </Col>
                <Col sm={6} className='text-center'>
                    <PlayingBar
                        queue={ this.props.queue }
                        queueCursor={ this.props.queueCursor }
                        shuffle={ this.props.shuffle }
                        repeat={ this.props.repeat }
                    />
                </Col>
                <Col sm={1} className='queue-controls text-center'>
                    <button type='button' className='queue-toggle' onClick={ this.toggleQueue.bind(this) }>
                        <Icon name='list' />
                    </button>
                    <Queue
                        showQueue={ this.state.showQueue }
                        queue={ this.props.queue }
                        queueCursor={ this.props.queueCursor }
                    />
                </Col>
                <Col sm={2}>
                    <Input
                        selectOnClick
                        placeholder='search'
                        className='form-control input-sm search'
                        changeTimeout={250}
                        clearButton
                        ref='search'
                        onChange={ this.search.bind(null) } />
                </Col>
            </header>
        );
    }

    winClose() {
        AppActions.app.close();
    }

    search(value) {
        AppActions.library.filterSearch(value.toLowerCase())
    }

    searchSelect() {
        this.refs.search.select();
    }

    playToggle() {
        if(this.props.playerStatus === 'play') this.pause();
        else if (this.props.playerStatus === 'pause') this.play();
    }

    play() {
        AppActions.player.play();
    }

    pause() {
        AppActions.player.pause();
    }

    toggleRepeat() {
        AppActions.player.toggleRepeat();
    }

    next() {
        AppActions.player.next();
    }

    previous() {
        AppActions.player.previous();
    }

    setVolume() {
        AppActions.player.setVolume(this.refs.volume.value);
    }

    showVolume() {
        this.setState({ showVolume: true });
    }

    mute(e) {

        if(e.target.classList.contains('player-control') || e.target.classList.contains('fa')) {

            if(this.oldVolume === undefined) this.oldVolume = app.audio.volume;
            AppActions.player.setVolume(app.audio.volume === 0 ? this.oldVolume : 0);
        }
    }

    hideVolume() {
        this.setState({ showVolume: false });
    }

    toggleQueue() {
        this.setState({ showQueue: !this.state.showQueue });
    }
}
