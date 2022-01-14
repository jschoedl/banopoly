import {Component} from "react";
import bananojs from "@bananocoin/bananojs";

bananojs.setBananodeApiUrl('https://kaliumapi.appditto.com/api');

class Balance extends Component {
    constructor(props) {
        super(props);
        this.address = props.address;
        this.state = {balance: NaN};
        this.update = props.update;
    }

    componentDidMount() {
        if (this.update)
            this.updateInterval = setInterval(() => this.updateBalance(), 1000);
    }

    componentWillUnmount() {
        if (this.update)
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

export default Balance;