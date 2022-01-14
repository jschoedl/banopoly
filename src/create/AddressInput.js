import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import Balance from "../banano/Balance";

class AddressInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.names = props.names
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, name) {
        this.setState({[name]: event.target.value});
    }

    handleSubmit(event) {
        // TODO
        event.preventDefault();
    }

    render() {
        let inputs = [];
        for (const name of this.names) {
            inputs.push(
                <Form.Group className="mb-3" controlId="formBasicEmail" key={name}>
                    <Form.Label>{name}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Adresse eingeben"
                        value={this.state[name]}
                        onChange={(event) => this.handleChange(event, name)}/>
                    {this.state[name] &&
                        <Form.Text className="text-muted">
                            <Balance address={this.state[name]} format={true}/>
                        </Form.Text>
                    }
                </Form.Group>
            );
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                {inputs}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default AddressInput;