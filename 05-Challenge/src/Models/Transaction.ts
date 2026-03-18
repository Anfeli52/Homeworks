import getRandomDate from "../Utils/RandomDate";

const startDate = new Date(2024, 0, 1);
const endDate = new Date();

export default class Transaction {
    private name: string;
    private amount: number;
    private createdAt: Date;

    constructor(name: string, amount: number){
        this.name = name;
        this.amount = amount;
        this.createdAt = getRandomDate(startDate, endDate);
    }
    
    getName() {
        return this.name;
    }

    getAmount() {
        return this.amount;
    }

    getCreatedDate() {
        return this.createdAt;
    }

}