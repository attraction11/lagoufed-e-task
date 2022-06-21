import { RootStoreProvier } from './store';

type IProps = React.PropsWithChildren<{}>;

const App: React.FC<IProps> = (props) => {
  return <RootStoreProvier>App</RootStoreProvier>;
};

export default App;
