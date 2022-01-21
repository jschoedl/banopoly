import {Button, Form} from "react-bootstrap";
import Balance from "./Balance";
import {useState} from "react";
import {useRouter} from "next/router";

function AddressInput(props) {
    const names = [...(props.accountNames || []), ...(props.otherNames || [])];
    const [fields, setFields] = useState({});


    const handleChange = (event, name) => {
        setFields({
            ...fields,
            [name]: event.target.value,
        })
    }

    const router = useRouter();
    const handleSubmit = (event) => {
        router.push({
            pathname: props.next,
            query: names.map(name => fields[name])
        });
        event.preventDefault();
    }

    // TODO: option to create an account
    let inputs = [];
    for (const name of names) {
        inputs.push(
            <Form.Group className="mb-3" controlId="formBasicEmail" key={name}>
                <Form.Label>{name}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Adresse eingeben"
                    value={fields[name]}
                    onChange={(event) => handleChange(event, name)}/>
                {props.accountNames.includes(name) && fields[name] &&
                    <Form.Text className="text-muted">
                        <Balance address={fields[name]} format={true}/>
                    </Form.Text>
                }
            </Form.Group>
        );
    }

    let disabled = false;
    names.forEach(name => {
        if (!fields[name])
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