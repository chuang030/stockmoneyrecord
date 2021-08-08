/**
 * 股價計算類別，計算公式為元大證卷計算公式
 * @link https://www.yuanta.com.tw/eYuanta/securities/aporder/Instructions/836878aa-5e5f-4dc8-9d18-984e9bf5c1cd?TargetId=8bc55154-c7ef-4f09-9e6d-e65a8ceb0f39&TargetMode=1
 */
class StockCalculation {

    /**
     * 股價計算類別建構子
     * @param {Number} marketPrice 輸入市價，預設為1元
     * @param {Number} sharePrice 輸入成交價，預設為1元
     * @param {Number} numberOfPiles 輸入購買股數，預設為1股
     * @param {Number} chargeDiscount 輸入手續費折扣，ex:手續費6折，輸入6，預設值為10(無折扣)
     * @param {Number|String} type 輸入股票類別，預設值為編號0：普通股票Common Stocks(縮寫CS)，輸入中文、英文全名、英文縮寫、編號皆可);，編號0：普通股票Common Stocks(縮寫CS)、編號1：當沖Day-Trading(縮寫DT)、編號2：指數股票型基金Exchange Traded Funds(縮寫ETF)
     */
     constructor(marketPrice = 1, sharePrice = 1, numberOfPiles = 1, chargeDiscount = 10, type = 0) {
        this.marketPrice = marketPrice;
        this.sharePrice = sharePrice;
        this.numberOfPiles = numberOfPiles;
        this.chargeDiscount = chargeDiscount;
        this.type = type;
    }

    /**
     * 設定成交價
     * @param {Number} sharePrice 輸入成交價
     */
    setCost(sharePrice) {
        this.sharePrice = sharePrice;
    }

    /**
     * 取得成交價
     * @returns {Number} 成交價
     */
    getCost() {
        return this.sharePrice;
    }

    /**
     * 設定股數
     * @param {Number} numberOfPiles 輸入購買股數
     */
    setNumberOfPiles(numberOfPiles) {
        this.numberOfPiles = numberOfPiles;
    }

    /**
     * 取得股數
     * @returns 股數
     */
    getNumberOfPiles() {
        return this.numberOfPiles;
    }

    /**
     * 設定購買價金(市價、股數)
     * @param {Number} sharePrice 輸入成交價
     * @param {Number} numberOfPiles 輸入購買股數
     */
    setCostPrice(sharePrice, numberOfPiles) {
        this.sharePrice = sharePrice;
        this.numberOfPiles = numberOfPiles;
    }

    /**
     * 取得購買價金(市價*股數)
     * @returns 購買價金
     */
    getCostPrice() {
        return Math.round(this.sharePrice * this.numberOfPiles);
    }

    /**
     * 設定市價
     * @param {Number} marketPrice 輸入市值
     */
    setMarketPrice(marketPrice) {
        this.marketPrice = marketPrice;
    }

    /**
     * 取得市價
     * @returns 市價
     */
     getMarketPrice() {
        return this.marketPrice;
    }

    /**
     * 設定市值
     * @param {Number} marketPrice 輸入市值
     * @param {Number} marketPrice 輸入市值
     */
    setMarketValue(marketPrice, numberOfPiles) {
        this.marketPrice = marketPrice;
        this.numberOfPiles = numberOfPiles;
    }

    /**
     * 取得市值(市價*股數)
     * @returns 市值
     */
    getMarketValue() {
        return Math.round(this.marketPrice * this.numberOfPiles);
    }

    /**
     * 設定手續費折扣
     * @param {Number} chargeDiscount 輸入手續費折扣，ex:手續費6折，輸入6，預設值為10(無折扣)
     */
    setChargeDiscount(chargeDiscount) {
        chargeDiscount = (typeof chargeDiscount !== "undefined") ? chargeDiscount : 10;
        this.chargeDiscount = chargeDiscount;
    }

    /**
     * 取得手續費，取個位數無條件捨去(買進、賣出成交價金x1.425x手續費折扣/1000)
     * 如果手續費金額小於1(即為0)則以最低手續費計算，最低手續費為1元新台幣
     * @returns 買進手續費
     */
    getBuyCharge() {
        let charge = Math.floor((this.getCostPrice() * (1.425 * this.chargeDiscount / 10 / 1000) * 100000) / 100000);
        return charge == 0 ? 1 : charge;
    }

    /**
     * 取得手續費，取個位數無條件捨去(買進、賣出成交價金x1.425x手續費折扣/1000)
     * 如果手續費金額小於1(即為0)則以最低手續費計算，最低手續費為1元新台幣
     * @returns 賣出手續費
     */
    getSellCharge() {
        let charge = Math.floor((this.getMarketValue() * (1.425 * this.chargeDiscount / 10 / 1000) * 100000) / 100000);
        return charge == 0 ? 1 : charge;
    }

    /**
     * 設定股票類別
     * @param {Number|String} type 輸入股票類別，預設值為編號0：普通股票Common Stocks(縮寫CS)，輸入中文、英文全名、英文縮寫、編號皆可);，編號0：普通股票Common Stocks(縮寫CS)、編號1：當沖Day-Trading(縮寫DT)、編號2：指數股票型基金Exchange Traded Funds(縮寫ETF)
     */
    setType(type) {
        type = (typeof type !== "undefined") ? type : 0;
        this.type = type;
    }

    /**
     * 取得股票類別
     * @returns 市值或成本
     */
    getType() {
        return this.type;
    }

    /**
     * 取得股票證交稅金，取個位數無條件捨去(市價x3/1000)  
     * 如果稅金金額小於1(即為0)則以最低稅金計算，最低稅金為1元新台幣
     * @returns 稅金
     */
    getTaxes() {
        let typeNumber = 0;
        let rate = 0;
        let taxes = 0;
        const typeString = {
            commonStocks: ["Common Stocks", "common stocks", "CommonStocks", "commonstocks", "CS", "cs", "0", "普通", 0],
            dayTrading: ["Day-Trading", "day-trading", "Day Trading", "day trading", "DayTrading", "daytrading", "Dt", "dt", "1", "當沖", 1],
            exchangeTradedFunds: ["Exchange Traded Funds", "exchange traded funds", "ExchangeTradedFunds", "exchangetradedfunds", "ETF", "etf", "2", 2]
        };
        if (typeString.commonStocks.includes(this.type)) {
            typeNumber = 0;
        } else if (typeString.dayTrading.includes(this.type)) {
            typeNumber = 1;
        } else if (typeString.exchangeTradedFunds.includes(this.type)) {
            typeNumber = 2;
        } else {
            typeNumber = -1;
        }
        switch (typeNumber) {
            case 0:
                rate = 3;
                break;
            case 1:
                rate = 1.5;
                break;
            case 2:
                rate = 1;
                break;
            default:
                rate = -1;
                break;
        }
        if (rate === -1) {
            return "輸入錯誤";
        }
        taxes = Math.floor((this.getMarketValue() * rate / 1000));
        return taxes == 0 ? 1 : taxes;
    }

    /**
     * 取得成交均價，取小數點後2位四捨五入((買進成交價金+手續費)/股數)
     * @returns 成交均價
     */
    getAveragePrice() {
        return Math.round(((Math.round(((this.getCostPrice() + this.getBuyCharge()) * 100) / 100)) / this.numberOfPiles) * 100) / 100;
    }

    /**
     * 取得持有成本，取個位數四捨五入(買進成交價金+手續費)
     * @returns 持有成本
     */
    getCarryingCosts() {
        return Math.round(((this.getCostPrice() + this.getBuyCharge()) * 100) / 100);
    }

    /**
     * 取得預估收入，取個位數四捨五入(市值-手續費-稅金)
     * @returns 預估收入
     */
    getAnticipatedRevenue() {
        return Math.round(((this.getMarketValue() - this.getSellCharge() - this.getTaxes()) * 100) / 100);
    }

    /**
     * 取得應付損益(預估收入-持有成本)
     * 取得預估收入，取個位數四捨五入(市值-手續費-稅金)
     * @returns 應付損益
     */
    getProfitAndLoss() {
        return this.getAnticipatedRevenue() - this.getCarryingCosts();
    }

    /**
     * 取得報酬率(預估收入-持有成本)
     * 取得預估收入，取個位數四捨五入(市值-手續費-稅金)
     * @returns 報酬率
     */
    getProfitAndLossPercentage() {
        return Math.round(this.getProfitAndLoss() / this.getCarryingCosts() * 100 * 100) / 100;
    }

}







// console.log(getAveragePrice(112, 5, 6));
// console.log(getCarryingCosts(37.75, 1000, 6));
// console.log(getAnticipatedRevenue(40.5, 1000, 6));
// console.log(getCharge(35.12, 50, 6));
// console.log(getTaxes(112, 5, 6));
// console.log(Math.floor((getPrice(260, 50) * 3 / 1000) * 1) / 1);
// console.log(getProfitAndLoss2(35.12, 34.70, 50, 6));
// console.log(getTaxes(21.75, 5, 0));
// console.log(getCharge(554, 5, 6));
// console.log(getCarryingCosts(22.60, 75, 0));
// console.log(getAnticipatedRevenue(108, 5, 6, 0));
// console.log(getProfitAndLoss(108, 112, 5, 6, 0));
// console.log(getProfitAndLoss(155, 177.992, 260, 6, 0));
// console.log(getProfitAndLoss(585, 578.44, 25, 6, 0));
// console.log(getProfitAndLoss(30.1, 29.97, 600, 6, 0));
// console.log(getProfitAndLossPercentage(40.5,37.75, 1000, 6, 0));
// let c = new StockCalculation(600,554,5,6,);
// console.log(c.getCostPrice());
// console.log(c.getProfitAndLoss());

// let c1 = new StockCalculation(204.5,198.5,20,6,0);
// c1.setCost(83.0);
// c1.setMarketPrice(90.5);
// c1.setNumberOfPiles(50);
// c1.setType(0);
// c1.setChargeDiscount(6);
// console.log(c1.getCostPrice());
// console.log(c1.getBuyCharge());
// console.log(c1.getSellCharge());
// console.log(c1.getTaxes());
// console.log(c1.getCarryingCosts());
// console.log(c1.getAnticipatedRevenue());
// console.log(c1.getProfitAndLoss());
// console.log(c1.getProfitAndLossPercentage());
