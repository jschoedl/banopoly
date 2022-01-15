import AddressInput from "../components/AddressInput";


export default function Index() {
    return (<>
            <AddressInput names={["Bank", "Mitte"]} next="/invite"/>
        </>
    );
}
