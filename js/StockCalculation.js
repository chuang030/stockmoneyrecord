/**
 * 股價計算類別，計算公式為元大證卷計算公式
 * @link https://www.yuanta.com.tw/eYuanta/securities/aporder/Instructions/836878aa-5e5f-4dc8-9d18-984e9bf5c1cd?TargetId=8bc55154-c7ef-4f09-9e6d-e65a8ceb0f39&TargetMode=1
 */
class StockCalculation {

    /**
     * @class 股價計算類別建構子
     * @param {Object} [valueObject] 輸入市價、成交價、購買股數、手續費折扣、股票類別所構成的Object
     * @param {Number} [valueObject.marketPrice = 0 ] 輸入市價，預設為0元
     * @param {Number} [valueObject.sharePrice = 0 ] 輸入成交價，預設為0元
     * @param {Number} [valueObject.numberOfPiles = 0 ] 輸入購買股數，預設為0股
     * @param {Number} [valueObject.boardLotLowestNumberOfPiles = 0 ] 輸入購買整股股數，預設為0股
     * @param {Number} [valueObject.oddLotLowestNumberOfPiles = 0 ] 輸入購買零股股數，預設為0股
     * @param {Number} [valueObject.chargeDiscount = 10 ]  輸入手續費折扣，ex:手續費6折，輸入6，預設值為10(無折扣)
     * @param {Number} [valueObject.meansOfTransaction = 0 ] 輸入交易方式(0整股、1零股)，預設為0
     * @param {Number|String} [valueObject.type = 0 ] 輸入股票類別，預設值為編號0：普通股票Common Stocks(縮寫CS)，輸入中文、英文全名、英文縮寫、編號皆可);，編號0：普通股票Common Stocks(縮寫CS)、編號1：當沖Day-Trading(縮寫DT)、編號2：指數股票型基金Exchange Traded Funds(縮寫ETF)
     * @description
     * marketPrice：輸入市價，預設為0元
     * 
     * sharePrice：輸入成交價，預設為0元
     * 
     * numberOfPiles：輸入購買股數，預設為0股
     * 
     * boardLotLowestNumberOfPiles：輸入購買整股股數，預設為0股(選填)
     * 
     * oddLotLowestNumberOfPiles：輸入購買零股股數，預設為0股(選填)
     * 
     * chargeDiscount：輸入手續費折扣，ex:手續費6折，輸入6，預設值為10(無折扣)
     * 
     * meansOfTransaction：輸入交易方式(0整股、1零股)
     * 
     * type：輸入股票類別，預設值為編號0
     * 
     * --編號0：普通股票Common Stocks(縮寫CS)
     * 
     * --編號1：當沖Day-Trading(縮寫DT)
     * 
     * --編號2：指數股票型基金Exchange Traded Funds(縮寫ETF)
     * @example 
     * let obj = 
     *  {
            marketPrice: 100,
            sharePrice: 100,
            numberOfPiles: 100,
            boardLotLowestNumberOfPiles: 0,
            oddLotLowestNumberOfPiles: 0,
            chargeDiscount: 10,
            meansOfTransaction: 0,
            boardLotLowestCharge: 20,
            oddLotLowestCharge: 1,
            type: 0
        }
        let stockCalculation = new StockCalculation(obj);
     */
    constructor(
        valueObject =
            {
                marketPrice: 0,
                sharePrice: 0,
                numberOfPiles: 0,
                boardLotLowestNumberOfPiles: 0,
                oddLotLowestNumberOfPiles: 0,
                chargeDiscount: 10,
                meansOfTransaction: 0,
                boardLotLowestCharge: 20,
                oddLotLowestCharge: 1,
                type: 0
            }
    ) {
        this.marketPrice = valueObject.marketPrice || 0;
        this.sharePrice = valueObject.sharePrice || 0;
        this.numberOfPiles = valueObject.numberOfPiles || 0;
        this.boardLotLowestNumberOfPiles = valueObject.boardLotLowestNumberOfPiles * 1000 || 0;
        this.oddLotLowestNumberOfPiles = valueObject.oddLotLowestNumberOfPiles || 0;
        this.chargeDiscount = valueObject.chargeDiscount || 10;
        this.boardLotLowestCharge = valueObject.boardLotLowestCharge || 20;
        this.oddLotLowestCharge = valueObject.oddLotLowestCharge || 1;
        this.meansOfTransaction = valueObject.meansOfTransaction || 0;
        this.type = valueObject.type || 0;
    }

    /**
     * 設定成交價
     * @description 單純輸入成交價，不區分整股或零股
     * @param {Number} sharePrice 輸入成交價
     */
    setCost(sharePrice) {
        this.sharePrice = sharePrice || 0;
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
     * @description 單純輸入股數，不區分整股或零股
     * @param {Number} numberOfPiles 輸入購買股數
     */
    setNumberOfPiles(numberOfPiles) {
        this.numberOfPiles = numberOfPiles || 0;
    }

    /**
     * 設定股數
     * @description 區分整股及零股，分別輸入
     * @param {Number} boardLotLowestNumberOfPiles 輸入購買股數(整股)
     * @param {Number} oddLotLowestNumberOfPiles 輸入購買股數(零股)
     */
    setNumberOfPilesDetailed(boardLotLowestNumberOfPiles, oddLotLowestNumberOfPiles) {
        this.boardLotLowestNumberOfPiles = boardLotLowestNumberOfPiles * 1000 || 0;
        this.oddLotLowestNumberOfPiles = oddLotLowestNumberOfPiles || 0;
    }

    /**
     * 取得股數
     * @description
     * 1.自動判斷以「單純輸入股數模式」或「整股、零股分別輸入模式」
     * 
     * 2.單純輸入股數模式：回傳輸入股數
     * 
     * 3.整股、零股分別輸入模式：回傳整股、零股加總股數
     * @returns 股數
     */
    getNumberOfPiles() {
        let numberOfPiles = this.boardLotLowestNumberOfPiles + this.oddLotLowestNumberOfPiles;
        if (numberOfPiles === 0 || numberOfPiles === null) {
            return this.numberOfPiles;
        } else {
            return numberOfPiles;
        }
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
        return Math.round(this.sharePrice * this.getNumberOfPiles());
    }

    /**
     * 設定市價，單純輸入市價，不區分整股或零股
     * @param {Number} marketPrice 輸入市值
     */
    setMarketPrice(marketPrice) {
        this.marketPrice = marketPrice;
    }

    /**
     * 設定市價，區分整股及零股，分別輸入
     * @param {Number} boardLotLowestMarketPrice 輸入市值(整股)
     * @param {Number} oddLotLowestMarketPrice 輸入市值(零股)
     */
    // setMarketPriceDetailed(boardLotLowestMarketPrice, oddLotLowestMarketPrice) {
    //     this.boardLotLowestMarketPrice = boardLotLowestMarketPrice;
    //     this.oddLotLowestMarketPrice = oddLotLowestMarketPrice;
    // }

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
        return Math.round(this.marketPrice * this.getNumberOfPiles());
    }

    /**
     * 設定交易方式
     * @param {Number} meansOfTransaction 輸入交易模式(0整股、1零股)
     */
    setMeansOfTransaction(meansOfTransaction) {
        meansOfTransaction = (typeof meansOfTransaction !== "undefined") ? meansOfTransaction : 0;
        this.meansOfTransaction = meansOfTransaction;
    }

    /**
     * 取得交易方式
     * @returns 交易方式(0整股、1零股)
     */
    getMeansOfTransaction() {
        return this.meansOfTransaction;
    }

    /**
     * 設定最低手續費
     * @param {Number} boardLotLowestCharge 輸入整股最低手續費(預設20元)
     * @param {Number} oddLotLowestCharge 輸入零股最低手續費(預設1元)
     */
    setLowestCharge(boardLotLowestCharge, oddLotLowestCharge) {
        this.boardLotLowestCharge = boardLotLowestCharge;
        this.oddLotLowestCharge = oddLotLowestCharge;
    }

    /**
     * 取得整股或零股(以設定之股票類型取得)最低手續費
     * @returns 整股或零股(以設定之股票類型取得)最低手續費
     */
    getLowestCharge() {
        if (this.meansOfTransaction === 0) {
            return this.boardLotLowestCharge;
        } else {
            return this.oddLotLowestCharge;
        }

    }

    /**
     * 設定手續費折扣
     * @description EX：手續費6折，輸入6，預設值為10(無折扣)
     * @param {Number} chargeDiscount 輸入手續費折扣
     * @example
     * //設定手續費折扣6折
     * setChargeDiscount(6);
     */
    setChargeDiscount(chargeDiscount) {
        chargeDiscount = (typeof chargeDiscount !== "undefined") ? chargeDiscount : 10;
        this.chargeDiscount = chargeDiscount;
    }

    /**
     * 取得手續費
     * @param {Number} price0 輸入價金或市值
     * @param {Number} price1 輸入買價或市價
     * @description 
     * 1.取個位數無條件捨去(買進、賣出成交價金x1.425x手續費折扣/1000)
     * 
     * 2.分別以「單純輸入股數模式」與「整股、零股分別輸入模式」進行計算
     * 
     * 3.「單純輸入股數模式」下如果交易模式設為「整股」，則股數需要大於999股才會以整股手續費機算
     * 
     * 4.如果手續費金額小於最低手續費則以最低手續費計算
     * 
     * 5.如果輸入股數、買價為0，手續費為0
     * @returns 買進/賣出手續費
     */
    chargeSelector(price0, price1) {
        let charge = Math.floor((price0 * (1.425 * this.chargeDiscount / 10 / 1000) * 100000) / 100000);
        let boardLotLowestCharge = Math.floor((this.boardLotLowestNumberOfPiles * price1 * (1.425 * this.chargeDiscount / 10 / 1000) * 100000) / 100000);
        let oddLotLowestCharge = Math.floor((this.oddLotLowestNumberOfPiles * price1 * (1.425 * this.chargeDiscount / 10 / 1000) * 100000) / 100000);
        let numberOfPiles = this.boardLotLowestNumberOfPiles + this.oddLotLowestNumberOfPiles;
        if (numberOfPiles === 0 || numberOfPiles === null) {
            //用單純輸入股數方式
            if (this.numberOfPiles !== 0 && price1 !== 0) {
                if (this.getMeansOfTransaction() === 0 || this.getMeansOfTransaction() === null) {
                    if (this.numberOfPiles < 1000) {
                        this.boardLotLowestCharge = this.oddLotLowestCharge;
                    }
                    return charge <= this.boardLotLowestCharge ? this.boardLotLowestCharge : charge;
                } else {
                    return charge <= this.oddLotLowestCharge ? this.oddLotLowestCharge : charge;
                }
            } else {
                return charge = 0;
            }
        } else {
            //整股、零股分別輸入方式
            if (this.boardLotLowestNumberOfPiles !== 0 && price1 !== 0) {
                boardLotLowestCharge <= this.boardLotLowestCharge ? boardLotLowestCharge = this.boardLotLowestCharge : boardLotLowestCharge;
            } else {
                boardLotLowestCharge = 0;
            }
            if (this.oddLotLowestNumberOfPiles !== 0 && price1 !== 0) {
                oddLotLowestCharge <= this.oddLotLowestCharge ? oddLotLowestCharge = this.oddLotLowestCharge : oddLotLowestCharge;
            } else {
                oddLotLowestCharge = 0;
            }
            return boardLotLowestCharge + oddLotLowestCharge;
        }
    }

    /**
     * 取得手續費
     * @description 
     * 1.取個位數無條件捨去(買進、賣出成交價金x1.425x手續費折扣/1000)
     * 
     * 2.分別以「單純輸入股數模式」與「整股、零股分別輸入模式」進行計算
     * 
     * 3.「單純輸入股數模式」下如果交易模式設為「整股」，則股數需要大於999股才會以整股手續費機算
     * 
     * 4.如果手續費金額小於最低手續費則以最低手續費計算
     * 
     * 5.如果輸入股數、買價為0，手續費為0
     * @returns 買進手續費
     */
    getBuyCharge() {
        return this.chargeSelector(this.getCostPrice(), this.getCost());
    }

    /**
     * 取得手續費
     * @description 
     * 1.取個位數無條件捨去(買進、賣出成交價金x1.425x手續費折扣/1000)
     * 
     * 2.分別以「單純輸入股數模式」與「整股、零股分別輸入模式」進行計算
     * 
     * 3.「單純輸入股數模式」下如果交易模式設為「整股」，則股數需要大於999股才會以整股手續費機算
     * 
     * 4.如果手續費金額小於最低手續費則以最低手續費計算
     * 
     * 5.如果輸入股數、買價為0，手續費為0
     * @returns 賣出手續費
     */
    getSellCharge() {
        return this.chargeSelector(this.getMarketValue(), this.getMarketPrice());
    }

    /**
     * 設定股票類別
     * @param {Number|String} type 輸入股票類別，預設值為編號0：普通股票Common Stocks(縮寫CS)
     * 
     * @description
     * 輸入中文、英文全名、英文縮寫、編號皆可
     * 
     * 編號0：普通股票Common Stocks(縮寫CS)
     * 
     * 編號1：當沖Day-Trading(縮寫DT)
     * 
     * 編號2：指數股票型基金Exchange Traded Funds(縮寫ETF)
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
     * 取得股票證交稅金
     * @description
     * 1.取個位數無條件捨去(市價x3/1000)
     * 
     * 2.如果稅金金額小於1(即為0)則以最低稅金計算，最低稅金為1元
     * 
     * 3.如果市價(賣價)為0，稅金為0元
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
        taxes = Math.floor((this.getMarketValue() * rate / 1000))
        taxes === 0 ? taxes = 1 : taxes;
        return this.getMarketPrice() !== 0 ? taxes : 0;
    }

    /**
     * 取得成交均價
     * @description
     * 1.均價：取小數點後2位四捨五入((買進成交價金+手續費)/股數)
     * 
     * 2.如果：購買價金、手續費、股數為0，則均價為0元
     * @returns 成交均價
     */
    getAveragePrice() {
        if (this.getCostPrice() + this.getBuyCharge() + this.getNumberOfPiles() !== 0) {
            return Math.round(((Math.round(((this.getCostPrice() + this.getBuyCharge()) * 100) / 100)) / this.getNumberOfPiles()) * 100) / 100;
        } else {
            return 0;
        }
    }

    /**
     * 取得持有成本
     * @description 取個位數四捨五入(買進成交價金 + 手續費)
     * @returns 持有成本
     */
    getCarryingCosts() {
        return Math.round(((this.getCostPrice() + this.getBuyCharge()) * 100) / 100);
    }

    /**
     * 取得預估收入
     * @description 取個位數四捨五入(市值 - 手續費 - 稅金)
     * @returns 預估收入
     */
    getAnticipatedRevenue() {
        return Math.round(((this.getMarketValue() - this.getSellCharge() - this.getTaxes()) * 100) / 100);
    }

    /**
     * 取得應付損益
     * @description 預估收入 - 持有成本
     * 
     * @returns 應付損益
     */
    getProfitAndLoss() {
        return this.getAnticipatedRevenue() - this.getCarryingCosts();
    }

    /**
     * 取得報酬率
     * @description 預估收入 - 持有成本 / 100
     * @returns 報酬率
     */
    getProfitAndLossPercentage() {
        if (this.getCarryingCosts() !== 0) {
            return Math.round(this.getProfitAndLoss() / this.getCarryingCosts() * 100 * 100) / 100;
        } else {
            return Infinity;
        }
    }

}





// let obj1 = {
    // sharePrice: 0,
    // numberOfPiles: 1,
    // marketPrice: 10,
    // chargeDiscount: 6,
    // type: 1
// }
// let c1 = new StockCalculation(obj1);
// c1.setCost(83.0);
// c1.setMarketPrice(90.5);
// c1.setNumberOfPiles(50);
// c1.setType(2);
// c1.setChargeDiscount(6);
// console.log(c1.getCostPrice());
// console.log(c1.getBuyCharge());
// console.log(c1.getSellCharge());
// c1.setMeansOfTransaction(1)
// c1.setCostPrice(10, 1000)
// c1.setMarketValue(10,0)
// c1.setNumberOfPilesDetailed(1, 10);
// c1.setLowestCharge(18, 20)
// console.log(c1.getLowestCharge());
// console.log(c1.getMeansOfTransaction());
// console.log(c1.getType());
// console.log(c1.getNumberOfPiles());
// console.log(c1.getCostPrice());
// console.log(c1.getMarketPrice());
// console.log(c1.getBuyCharge());
// console.log(c1.getSellCharge());
// console.log(c1.getTaxes());
// console.log(c1.getAveragePrice());
// console.log(c1.getCarryingCosts());
// console.log(c1.getAnticipatedRevenue());
// console.log(c1.getProfitAndLoss());
// console.log(c1.getProfitAndLossPercentage());
