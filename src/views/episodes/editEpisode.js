import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { updateEpisode } from '../../redux/actions/episode/episodeAction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// Styling
class CreateEpisode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: this.props.EditEpisodeList.description,
            episodeDate: this.props.EditEpisodeList.episodeDate,
            episodeStartTime: new Date(this.props.EditEpisodeList.episodeStartTime),
            season: this.props.EditEpisodeList.season,
            channelId: this.props.EditEpisodeList.channelId,
            showId: this.props.EditEpisodeList.showId,
            episodeEndTime: new Date(this.props.EditEpisodeList.episodeEndTime),
            status: this.props.EditEpisodeList.status,
            createdBy: JSON.parse(localStorage.getItem('user')).id,
            updatedBy: JSON.parse(localStorage.getItem('user')).id,
            id: this.props.EditEpisodeList.id

        }

    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }
    componentWillReceiveProps(nextProps) {

        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.EditEpisodeList.id !== this.state.id) {
            this.setState({
                description: nextProps.EditEpisodeList.description,
                episodeDate: nextProps.EditEpisodeList.episodeDate,
                episodeStartTime: nextProps.EditEpisodeList.episodeStartTime,
                season: nextProps.EditEpisodeList.season,
                channelId: nextProps.EditEpisodeList.channelId,
                showId: nextProps.EditEpisodeList.showId,
                episodeEndTime: nextProps.EditEpisodeList.episodeEndTime,
                status: nextProps.EditEpisodeList.status,
                createdBy: 21,
                updatedBy: 21,
                id: nextProps.EditEpisodeList.id
            })
        }

    }
    handleStartDateChange = date => {
        // let data = new Date();
        // data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            episodeStartTime: date
        });
    };
    handleEndDateChange = date => {
        // let data = new Date();
        // data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            episodeEndTime: date
        });
    };
    onSelectStatus = (e) => {
        if (e.target.value === "Enable") {
            this.setState({ status: true })
        } else {
            this.setState({ status: false })
        }

    }
    onEditEpisode = (e) => {
        // e.preventDefault();
        this.props.updateEpisode(this.state);
        this.props.history.push('/episode')
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { shows, chanels, episode } = this.props
        const startTime = this.props.EditEpisodeList.episodeStartTime.substring(11, 16);
        const endTime = this.props.EditEpisodeList.episodeEndTime.substring(11, 16);
        return (
            <Fragment>
                <form>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Show Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Input type="select" name="showId" className="custom_arrow" onChange={this.onChange}>
                                            {/* <option value="">Select show</option> */}
                                            <option value={this.props.EditEpisodeList.show.id}>{this.props.EditEpisodeList.show.showName}</option>
                                            {shows.shows.map((item, index) => (
                                                <option value={item.id} key={'SH_TYPE' + item.id}>{item.showName}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col sm="5" className="text-right">
                                        <Label>Channel Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Input type="select" name="channelId" className="custom_arrow" onChange={this.onChange}>
                                            <option value={this.props.EditEpisodeList.channel.id}>{this.props.EditEpisodeList.channel.channelName}</option>
                                            {chanels.chanels.map((item, index) => (
                                                <option value={item.id} key={'CH_TYPE' + item.id}>{item.channelName}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Short description</Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="textarea" name="description" placeholder="Short description"
                                                value={this.state.description}
                                                onChange={this.onChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Episode Date: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="date" name="episodeDate" placeholder="Episode Date" onChange={this.onChange}
                                                defaultValue={this.props.EditEpisodeList.episodeDate}
                                            ></Input>
                                            {/* {<Calendar size={21} className='calender_icon' />} */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">

                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Episode Start Time: </Label>
                                    </Col>
                                    {/* <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="time" name="episodeStartTime" placeholder="Episode Date"
                                                defaultValue={startTime}
                                                onChange={this.onChangestart} ></Input>
                                        </FormGroup>
                                    </Col> */}
                                    <DatePicker
                                        selected={this.state.episodeStartTime}
                                        onChange={this.handleStartDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Episode End Time: </Label>
                                    </Col>
                                    {/* <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="time" name="episodeEndTime" placeholder="Episode Date"
                                                defaultValue={endTime}
                                                onChange={this.onChangeEnd} ></Input>
                                        </FormGroup>
                                    </Col> */}
                                    <DatePicker
                                        selected={this.state.episodeEndTime}
                                        onChange={this.handleEndDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>STATUS: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onSelectStatus} >
                                                {this.props.EditEpisodeList.status ? <option>Enable</option> : <option>Disable</option>}
                                                {this.props.EditEpisodeList.status ? <option>Disable</option> : <option>Enable</option>}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" className="text-right"
                                            className="btn btn-primary submit_btn1"
                                            onClick={this.onEditEpisode}>Submit
                                    </button>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </div>
                </form>
            </Fragment>
        );
    }
}

// export default CreateEpisode;
const mapStateToProps = state => ({
    chanels: state.chaneldata.chanels,
    shows: state.showsdata.shows,
    episode: state.episodedata.episode
});

export default compose(
    withRouter,
    connect(mapStateToProps, { updateEpisode })
)(CreateEpisode);
