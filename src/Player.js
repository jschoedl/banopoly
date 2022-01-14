import {Component} from "react";
import bananojs from "@bananocoin/bananojs";

bananojs.setBananodeApiUrl('https://kaliumapi.appditto.com/api');

class Player extends Component {
    constructor(props) {
        super(props);
        this.address = props.address;
        this.state = {balance: NaN};
    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.updateBalance(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    updateBalance() {
        async function fetchBalance(address) {
            return bananojs.getAccountInfo(address);
        }

        fetchBalance(this.address).then((res) => {
            this.setState({balance: res.balance});
        });
    }

    render() {
        return (
            <div className="App">
                <p>Balance: {this.state.balance}</p>
            </div>
        );
    }
}

export default Player;