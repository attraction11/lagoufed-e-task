import { makeObservable, observable } from 'mobx';

type appleVo = {
    id: number;
    weight: number;
    isEaten: boolean;
};

export default class RootStore {
    apples: appleVo[];
    newAppleId: number;
    isPicking: boolean;
    buttonText: string;
    constructor() {
        this.apples = [];
        this.newAppleId = 3;
        this.isPicking = false;
        this.buttonText = '摘苹果';
        makeObservable(this, {
            apples: observable,
            newAppleId: observable,
            isPicking: observable,
            buttonText: observable,
        });
    }
}
