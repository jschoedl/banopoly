import {Component} from "react";
import Participant from "./Participant";

export default class Participants extends Component {
    constructor(props) {
        super(props);
        this.state = {participants: []};
    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.updateParticipants(), 1000);
    }

    componentWillUnmount() {
        if (this.update)
            clearInterval(this.updateInterval);
    }

    updateParticipants() {
        fetch(this.props.apiHost + "/api/getParticipants?gameId=" + this.props.gameId)
            .then(response => response.json())
            .then(result => this.setState({participants: result.result.players}));
    }

    render() {
        if (!this.state.participants)
            return <p>bisher keine Teilnehmer</p>
        let participantsList = [];
        for (const participant of this.state.participants) {
            participantsList.push(<Participant key={participant.name} name={participant.name} address={participant.address}/>);
        }
        return participantsList
    }
}

