import { action, computed, makeObservable, observable } from "mobx";

export type appleVo = {
    id: number;
    weight: number;
    isEaten: boolean;
};

type statusVo = {
    appleNow: {
        quantity: number;
        weight: number;
    };
    appleEaten: {
        quantity: number;
        weight: number;
    };
};

export default class RootStore {
    apples: appleVo[];
    newAppleId: number;
    isPicking: boolean;
    buttonText: string;
    constructor() {
        this.apples = [
            {
                id: 0,
                weight: 233,
                isEaten: false,
            },
            {
                id: 1,
                weight: 235,
                isEaten: true,
            },
            {
                id: 2,
                weight: 256,
                isEaten: false,
            },
        ];
        this.newAppleId = 3;
        this.isPicking = false;
        this.buttonText = "摘苹果";
        makeObservable(this, {
            apples: observable,
            newAppleId: observable,
            isPicking: observable,
            buttonText: observable,
            status: computed,
            pickApple: action.bound,
        });
    }

    /**  计算当前已吃和未吃苹果的状态 */
    get status() {
        let status: statusVo = {
            appleNow: {
                quantity: 0,
                weight: 0,
            },
            appleEaten: {
                quantity: 0,
                weight: 0,
            },
        };
        this.apples.forEach((apple) => {
            let selector: "appleEaten" | "appleNow" = apple.isEaten
                ? "appleEaten"
                : "appleNow";
            status[selector].quantity++;
            status[selector].weight += apple.weight;
        });
        return status;
    }

    /*摘苹果的异步操作*/
    pickApple() {
        /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
        if (this.isPicking) {
            return;
        }

        this.isPicking = true;
        this.buttonText = "正在采摘...";
        fetch("https://hacker-news.firebaseio.com/v0/jobstories.json").then(
            (res) => {
                /** 备注这里的url只是测试用的，这个是之前hackernews的api, 这里只是确保接口是通的，至于数据还是自己mock */
                let weight = Math.floor(200 + Math.random() * 50);
                this.isPicking = false;
                this.buttonText = "摘苹果";
                this.apples.push({
                    id: this.newAppleId++,
                    weight: weight,
                    isEaten: false,
                });
            }
        );
    }

    /* 这里需要写成箭头函数的形式，这样此函数从父组件传递到子组件的时候才能调用成功*/
    eatApple = (appleId: number) => {
        let targetIndex: number = 0;
        this.apples.forEach((apple, index) => {
            if (apple.id === appleId) {
                targetIndex = index;
            }
        });
        this.apples[targetIndex].isEaten = true;
    };
}
