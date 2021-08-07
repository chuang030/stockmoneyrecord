/**
 * 設置查詢連結
 * @param {Number|String} date 輸入日期，EX:2021年1月1日則輸入20210101
 * @param {Number|String} stockNo 輸入股票編號
 * @returns 查詢連結
 */
function setUrl(date, stockNo) {
    return `https://cors-anywhere.herokuapp.com/https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${stockNo}&_=1498059436321`;
}


Vue.createApp({
    data: function () {
        return {
            hintState: "",
            hintMessage: "",
            selectToday: this.getFullToday(),
            fullDateTW: this.getFullTodayTW(),
            item: [
                {
                    no: 0,
                    sName: "中鋼",
                    date: this.getFullTodayTW(),
                    stockNo: 2002
                },
                {
                    no: 1,
                    sName: "長榮",
                    date: this.getFullTodayTW(),
                    stockNo: 2603
                },
                {
                    no: 2,
                    sName: "萬海",
                    date: this.getFullTodayTW(),
                    stockNo: 2615
                },
                {
                    no: 3,
                    sName: "聯詠",
                    date: this.getFullTodayTW(),
                    stockNo: 3034
                }
            ],
            account: [
                {
                    averagePrice: 39.85,
                    numberOfPiles: 400
                },
                {
                    averagePrice: 177.84,
                    numberOfPiles: 260
                },
                {
                    averagePrice: 281.54,
                    numberOfPiles: 90
                },
                {
                    averagePrice: 503.00,
                    numberOfPiles: 30
                },
            ],
            dataObjClass: [
                {
                    sName: "",
                    date: [],
                    marketPrice: [],
                    averagePrice: [],
                    numberOfPiles: [],
                    marketValue: [],
                    carryingCosts: [],
                    anticipatedRevenue: [],
                    profitAndLoss: [],
                    profitAndLossPercentage: [],
                },
                {
                    sName: "",
                    date: [],
                    marketPrice: [],
                    averagePrice: [],
                    numberOfPiles: [],
                    marketValue: [],
                    carryingCosts: [],
                    anticipatedRevenue: [],
                    profitAndLoss: [],
                    profitAndLossPercentage: [],
                },
                {
                    sName: "",
                    date: [],
                    marketPrice: [],
                    averagePrice: [],
                    numberOfPiles: [],
                    marketValue: [],
                    carryingCosts: [],
                    anticipatedRevenue: [],
                    profitAndLoss: [],
                    profitAndLossPercentage: [],
                },
                {
                    sName: "",
                    date: [],
                    marketPrice: [],
                    averagePrice: [],
                    numberOfPiles: [],
                    marketValue: [],
                    carryingCosts: [],
                    anticipatedRevenue: [],
                    profitAndLoss: [],
                    profitAndLossPercentage: [],
                },
            ]


        }
    },
    methods: {
        /**
         * 資料撈取方法
         * @param {Array} arrar 
         * @param {Number} index 
         * @returns 資料陣列
         */
        itemDataFun(arrar = [], index) {
            let arr = [];
            for (i = 0; i < arrar.length; i++) {
                arr.push(arrar[i][index]);
            }
            return arr;
        },
        /**
         * 傳入日期(yyyymmdd)取得對應星期
         * @param {String} date 
         * @returns 星期
         */
        judgeDay(date) {
            return new Date(date).getDay();
        },
        /**
         * 取得當前民國完整日期(yyy/mm/dd)，並設定this.selectToday值
         * @returns 民國完整日期(yyy/mm/dd)
         */
        getToday() {
            let today = new Date();
            let month = "";
            let day = "";
            if (today.getMonth() + 1 < 10) {
                month = `0${today.getMonth() + 1}`
            } else {
                month = today.getMonth() + 1;
            }
            if (today.getDate() < 10) {
                day = `0${today.getDate()}`;
            } else {
                day = `${today.getDate()}`;
            }
            this.selectToday = `${today.getFullYear()}-${month}-${day}`;
            return `${today.getFullYear()}-${month}-${day}`;
        },
        /**
         * 日期字串格式轉換yyyy-mm-dd => yyyymmdd
         * @param {String} str 
         * @returns 轉換後日期字串(yyyymmdd)
         */
        changeStr(str = "") {
            return str.replace(/-/g, "");
        },
        /**
         * 日期字串格式轉換yyyy-mm-dd => yyy/mm/dd
         * @param {String} str 
         * @returns 轉換後日期字串(yyy/mm/dd)
         */
        changeStrTW(str = "") {
            str = str.replace(/-/g, "/");
            str = str.replace(str.substring(0, 4), str.substring(0, 4) - 1911);
            return str;
        },
        /**
         * 取得當前西元完整日期(yyyy/mm/dd)，並設定this.selectFullToday值
         */
        getFullToday() {
            let today = this.getToday();
            today = today.replace(/-/g, "");
            this.selectFullToday = today;
            return today;
        },
        /**
         * 取得當前西元完整日期(yyyy/mm/dd)，並設定this.selectFullToday值
         */
        getFullTodayTW() {
            let today = this.getToday();
            today = today.replace(/-/g, "/");
            today = today.replace(today.substring(0, 4), today.substring(0, 4) - 1911);
            this.selectFullToday = today;
            return today;
        },
        /**
         * 股票計算方法
         * @param {Array} marketPrice 輸入撈出的市價陣列
         * @param {Number} sharePrice 輸入成交價
         * @param {Number} numberOfPiles 輸入股數
         * @param {Number} chargeDiscount 輸入手續費折扣
         * @param {Number|String} type 輸入股票類別
         * @param {Number} index 輸入欲推送資料之位置
         */
        stockCalculation(marketPrice = [], sharePrice, numberOfPiles, chargeDiscount, type, index) {
            let marketPricePush = [];
            let averagePricePush = [];
            let numberOfPilesPush = [];
            let marketValuePush = [];
            let carryingCostsPush = [];
            let anticipatedRevenuePush = [];
            let profitAndLossPush = [];
            let profitAndLossPercentagePush = [];
            let marketPriceArr = marketPrice[this.todayIndex];
            let sc = new StockCalculation(marketPriceArr, sharePrice, numberOfPiles, chargeDiscount, type);
            marketPricePush.push(sc.getMarketPrice());
            averagePricePush.push(sc.getAveragePrice());
            numberOfPilesPush.push(sc.getNumberOfPiles());
            marketValuePush.push(sc.getMarketValue());
            carryingCostsPush.push(sc.getCarryingCosts());
            anticipatedRevenuePush.push(sc.getAnticipatedRevenue());
            profitAndLossPush.push(sc.getProfitAndLoss());
            profitAndLossPercentagePush.push(sc.getProfitAndLossPercentage());
            this.dataObjClass[index].marketPrice = marketPricePush;
            this.dataObjClass[index].averagePrice = averagePricePush;
            this.dataObjClass[index].numberOfPiles = numberOfPilesPush;
            this.dataObjClass[index].marketValue = marketValuePush;
            this.dataObjClass[index].carryingCosts = carryingCostsPush;
            this.dataObjClass[index].anticipatedRevenue = anticipatedRevenuePush;
            this.dataObjClass[index].profitAndLoss = profitAndLossPush;
            this.dataObjClass[index].profitAndLossPercentage = profitAndLossPercentagePush;
        },
        /**
         * 各類陣列處理方法
         * @param {Number} index 
         * @param {String} todayStr 
         */
        arrFun(index = 0, todayStr) {
            let sName = "";
            sName = this.item[index].sName;
            this.dataObjClass[index].sName = sName;
            let datePush = [];
            //todayStr有傳入時取得傳入日期在陣列(撈出資料的陣列)中的位置，反之以今日日期在陣列中的位置
            todayStr = (typeof todayStr !== undefined) ? this.todayIndex = this.itemDataFun(this.dataOriginalObject, 0).indexOf(todayStr) : this.todayIndex = this.itemDataFun(this.dataOriginalObject, 0).indexOf(this.selectToday);
            //將指定位置日期撈出
            datePush.push(this.itemDataFun(this.dataOriginalObject, 0)[this.todayIndex]);
            //在指定位置推送撈出之日期
            this.dataObjClass[index].date = datePush;
            //取得資料傳入股票計算方法
            this.stockCalculation(this.itemDataFun(this.dataOriginalObject, 6), this.account[index].averagePrice, this.account[index].numberOfPiles, 6, 0, index);
        },
        /**
         * 更換查詢日期，並送出請求後執行後續資料處理
         * @param {String} date 輸入日期(yyyymmdd)，可不傳入，預設為今日西元日期(yyyymmdd)
         * @param {String} taiwanYear 輸入日期(yyy/mm/dd)，可不傳入，預設為今日民國日期(yyy/mm/dd)
         */
        changeDay(date, taiwanYear) {
            this.item.forEach(element => {
                setTimeout(() => {
                    element.date = date;
                    let requestURL = setUrl(element.date, element.stockNo);
                    let request = new XMLHttpRequest();
                    request.open("GET", requestURL, true);
                    request.responseType = "json";
                    request.send();
                    request.onreadystatechange = () => {
                        if (request.readyState === 4 && request.status === 200) {
                            this.dataOriginalObject = request.response.data;
                            if (this.dataOriginalObject !== undefined) {
                                this.hintState = "成功";
                                this.hintMessage = "";
                                if(this.itemDataFun(this.dataOriginalObject, 0).indexOf(taiwanYear) === -1){
                                    this.hintState = "成功，但是~";
                                    this.hintMessage = "今天似乎還沒收盤或沒開盤喔~";
                                }
                            } else {
                                if (request.response.stat === "很抱歉，沒有符合條件的資料!") {
                                    this.hintState = "成功，但是~";
                                    this.hintMessage = "今天似乎還沒收盤或沒開盤喔~";
                                }
                                if (request.response.stat === "查詢日期大於今日，請重新查詢!") {
                                    this.hintState = "成功，但是~";
                                    this.hintMessage = "我沒辦法預測未來~"
                                }
                            }
                            hintBox.style.display = "none";
                            this.arrFun(element.no, taiwanYear);
                        }
                        if (request.readyState === 4 && request.status === 429) {
                            hintBox.style.display = "none";
                            this.hintState = "失敗";
                            this.hintMessage = "過多請求";
                        }
                        if (request.readyState === 4 && request.status === 403) {
                            this.hintState = "失敗";
                            this.hintMessage = "請確認是否有點擊啟動按鈕，若有請回報錯誤~~";

                        }
                        if (request.readyState === 4 && request.status === 0) {
                            this.hintState = "失敗";
                            this.hintMessage = "請確認是否有點擊啟動按鈕，若有請回報錯誤~~";

                        }
                    }
                }, 300 * element.no);

            });
        }
    },
    mounted() {
        this.changeDay(this.getFullToday(), this.getFullTodayTW());
    }
}).mount('#app')

const app = document.getElementById("app");
const iframe = document.getElementsByTagName("iframe")[0];
const hintBoxContinueBtn = document.getElementById("hint-box-continue-btn");
const hintBox = document.getElementById("hint-box");
hintBoxContinueBtn.addEventListener("click", function () {
    history.go(0);
})



