import { RootStoreProvier } from "./store";
import AppleBasket from "./components/AppleBasket";

type IProps = React.PropsWithChildren<{}>;

const App: React.FC<IProps> = (props) => {
    return (
        <RootStoreProvier>
            <AppleBasket></AppleBasket>
        </RootStoreProvier>
    );
};

export default App;
