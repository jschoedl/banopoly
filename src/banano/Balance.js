import {Component} from "react";
import bananojs from "@bananocoin/bananojs";

bananojs.setBananodeApiUrl('https://kaliumapi.appditto.com/api');

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {balance: NaN, address: props.address};
        this.update = props.update || false;
        this.format = props.format || false;
        this.factor = 10e-30;
        this.decimals = 4;
    }

    componentDidMount() {
        if (this.update)
            this.updateInterval = setInterval(() => this.updateBalance(), 1000);
        else
            this.updateBalance();
    }

    componentWillUnmount() {
        if (this.update)
            clearInterval(this.updateInterval);
    }

    componentDidUpdate(prevProps) {
        if (this.props.address !== prevProps.address) {
            this.setState({address: this.props.address}, () => this.updateBalance());
            console.log(this.props.address)
        }
    }

    updateBalance() {
        async function fetchBalance(address) {
            return bananojs.getAccountInfo(address);
        }

        fetchBalance(this.state.address).then((res) => {
            this.setState({balance: (res.balance * this.factor).toFixed(this.decimals)});
        });
    }

    render() {
        if (this.format)
            return (
                <>{isNaN((this.state.balance)) ?
                    <>Konto nicht gefunden</> : <>Kontostand: {this.state.balance} BANANO</>}</>
            )
        return (
            <>{this.state.balance || NaN}</>
        );
    }
}

export default Balance;