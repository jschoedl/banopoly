import {Button, Form} from "react-bootstrap";
import Balance from "./Balance";
import {useState} from "react";
import {useRouter} from "next/router";

function AddressInput(props) {
    const [addresses, setAddresses] = useState({});


    const handleChange = (event, name) => {
        setAddresses({
            ...addresses,
            [name]: event.target.value,
        })
    }

    const router = useRouter();
    const handleSubmit = (event) => {
        router.push(props.next);
        event.preventDefault();
    }

    // TODO: option to create an account
    let inputs = [];
    for (const name of props.names) {
        inputs.push(
            <Form.Group className="mb-3" controlId="formBasicEmail" key={name}>
                <Form.Label>{name}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Adresse eingeben"
                    value={addresses[name]}
                    onChange={(event) => handleChange(event, name)}/>
                {addresses[name] &&
                    <Form.Text className="text-muted">
                        <Balance address={addresses[name]} format={true}/>
                    </Form.Text>
                }
            </Form.Group>
        );
    }

    let disabled = false;
    props.names.forEach(name => {
        if (!addresses[name])
            disabled = true;
    })

    return (
        <Form onSubmit={handleSubmit}>
            {inputs}
            <Button variant="primary" type="submit" disabled={disabled}>
                Submit
            </Button>
        </Form>
    );
}

export default AddressInput;