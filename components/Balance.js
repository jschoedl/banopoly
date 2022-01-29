import {Component} from "react";
import bananojs from "@bananocoin/bananojs";
import {sleep} from "../lib/helpers";

bananojs.setBananodeApiUrl('https://kaliumapi.appditto.com/api');

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {balance: NaN, formattedBalance: "⏳", address: props.address};
        this.update = props.update || true;
        this.format = props.format || false;
        this.factor = 10e-30 * props.factor || 10e-30;
        this.decimals = props.decimals === undefined ? 4 : props.decimals;

        this.updateCallback = () => this.updateBalance()
    }

    componentDidMount() {
        if (this.update)
            this.updateTimeout = setTimeout(this.updateCallback, Math.floor(Math.random() * 1000))
        else
            this.updateBalance()
    }

    componentWillUnmount() {
        if (this.update)
            clearTimeout(this.updateTimeout);
    }

    componentDidUpdate(prevProps) {
        if (this.props.address !== prevProps.address) {
            this.setState({address: this.props.address}, () => this.updateBalance());
            console.log(this.props.address)
        }
    }

    async animateBalance(start, end) {
        let diff = (end - start) / 10;
        let current = start;
        while (current < end) {
            await sleep(20);
            console.log(current)
            current += diff;
            diff *= 0.9;
            this.setState({
                formattedBalance: (current * this.factor || 0).toLocaleString(undefined, {
                        maximumFractionDigits: this.decimals,
                        minimumFractionDigits: this.decimals,
                    },
                ),
            })
        }
        this.setState({
            formattedBalance: (end * this.factor || 0).toLocaleString(undefined, {
                    maximumFractionDigits: this.decimals,
                    minimumFractionDigits: this.decimals,
                },
            ),
        })
    }

    updateBalance() {
        async function fetchBalance(address) {
            return bananojs.getAccountInfo(address);
        }

        fetchBalance(this.state.address).then((res) => {
            if (res.error && res.error !== "Account not found") {
                console.log(res.error);
            } else {
                this.animateBalance(this.state.balance || 0, res.balance || 0).then(r => {
                });
                this.setState({
                    balance: res.balance,
                    formattedBalance: (res.balance * this.factor || 0).toLocaleString(undefined, {
                            maximumFractionDigits: this.decimals,
                            minimumFractionDigits: this.decimals,
                        },
                    ),
                });
            }
        });

        if (this.update) {
            this.updateTimeout = setTimeout(this.updateCallback, 3_000 + Math.floor(Math.random() * 2000))
        }
    }

    render() {
        if (this.format) { // noinspection EqualityComparisonWithCoercionJS
            return (
                <>{this.state.balance === undefined ?
                    <>keine Transaktion mit diesem Konto
                        gefunden</> : <>Kontostand: {this.state.formattedBalance} BANANO</>}</>
            )
        }
        return (
            <>{this.state.formattedBalance}</>
        );
    }
}

export default Balance;