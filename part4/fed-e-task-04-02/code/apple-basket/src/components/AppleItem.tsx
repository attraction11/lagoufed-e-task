import { observer } from "mobx-react-lite";
import "../styles/appleItem.scss";
import type { appleVo } from "../store/appleStore";

type IProps = React.PropsWithChildren<{
    apple: appleVo;
    eatApple: (id: number) => void;
}>;

const AppleItem: React.FC<IProps> = (props) => {
    let { apple, eatApple } = props;
    return (
        <div className="appleItem">
            <div className="apple">
                <img src={require("../images/apple.png")} alt="" />
            </div>
            <div className="info">
                <div className="name">红苹果 - {apple.id}号</div>
                <div className="weight">{apple.weight}克</div>
            </div>
            <div className="btn-div">
                <button onClick={() => eatApple(apple.id)}> 吃掉 </button>
            </div>
        </div>
    );
};

export default observer(AppleItem);
