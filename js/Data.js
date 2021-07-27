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
            selectToday: this.getToday(),
            fullDateTW: "",
            item: [
                {
                    no: 0,
                    sName: "中鋼",
                    date: this.getFullToday(),
                    stockNo: 2002
                },
                {
                    no: 1,
                    sName: "長榮",
                    date: this.getFullToday(),
                    stockNo: 2603
                },
                {
                    no: 2,
                    sName: "萬海",
                    date: this.getFullToday(),
                    stockNo: 2615
                },
                {
                    no: 3,
                    sName: "聯詠",
                    date: this.getFullToday(),
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
         * 日期塞選方法(跳六、日)
         * @param {Number|String} date 
         * @param {String} fullDate 
         * @returns 跳躍後日期(dd)
         */
        jumpDay(date, fullDate) {
            let today = new Date();
            //預留星期變數
            let todayDay = 0;
            //預留日變數
            let day = 0;
            if (typeof date !== "undefined") {
                //指定為傳入的日
                day = Number(date);
                //取得傳入日期為星期幾
                todayDay = this.judgeDay(fullDate)
            } else {
                //指定為今天的日
                day = today.getDate();
                //取得今天為星期幾
                todayDay = today.getDay();
            }
            //判斷是否為星期六、日，是的話推算回星期五的日期(dd)
            if (todayDay == 6) {
                if (day - 1 < 10) {
                    return `0${day - 1}`;
                } else {
                    return `${day - 1}`;
                }
            } else if (todayDay == 0) {
                if (day - 2 < 10) {
                    return `0${day - 2}`;
                } else {
                    return `${day - 2}`;
                }
            } else {
                return `${day}`;
            }
        },
        /**
         * 取得當前民國完整日期(yyy/mm/dd)，並設定this.selectToday值
         * @returns 民國完整日期(yyy/mm/dd)
         */
        getToday() {
            let today = new Date();
            let month = "";
            if (today.getMonth() + 1 < 10) {
                month = `0${today.getMonth() + 1}`
            } else {
                month = today.getMonth() + 1;
            }
            this.selectToday = `${today.getFullYear() - 1911}/${month}/${this.jumpDay()}`;
            return `${today.getFullYear() - 1911}/${month}/${this.jumpDay()}`;
        },
        /**
         * 取得當前西元完整日期(yyyy/mm/dd)，並設定this.selectFullToday值
         */
        getFullToday() {
            let today = new Date();
            let month = "";
            if (today.getMonth() + 1 < 10) {
                month = `0${today.getMonth() + 1}`
            } else {
                month = today.getMonth() + 1;
            }
            this.selectFullToday = `${today.getFullYear()}${month}${this.jumpDay()}`;
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
            let datePush = [];
            //todayStr有傳入時取得傳入日期在陣列(撈出資料的陣列)中的位置，反之以今日日期在陣列中的位置
            todayStr = (typeof todayStr !== "undefined") ? this.todayIndex = this.itemDataFun(this.dataOriginalObject, 0).indexOf(todayStr) : this.todayIndex = this.itemDataFun(this.dataOriginalObject, 0).indexOf(this.selectToday);
            //將指定位置日期撈出
            datePush.push(this.itemDataFun(this.dataOriginalObject, 0)[this.todayIndex]);
            //在指定位置推送撈出之日期
            this.dataObjClass[index].date = datePush;
            //取得資料傳入股票計算方法
            this.stockCalculation(this.itemDataFun(this.dataOriginalObject, 6), this.account[index].averagePrice, this.account[index].numberOfPiles, 6, 0, index);
        },
        /**
         * 民國日期轉換西元日期(yyy/mm/dd) => (yyyymmdd)
         * @param {String} toDate 傳入民國日期(yyy/mm/dd)
         */
        toDate(toDate) {
            let yyyy = Number(toDate.substring(0, 3)) + 1911;
            let mm = Number(toDate.substring(4, 6));
            let dd = Number(toDate.substring(7));
            if (mm < 10) {
                mm = `0${mm}`;
            }
            if (dd < 10) {
                dd = `0${dd}`;
            }
            let fullDate = `${yyyy}/${mm}/${dd}`;
            //判斷取得日期為星期幾，並判斷是否跳過，回傳判斷後的日期(日)
            dd = this.jumpDay(dd, fullDate);
            if (Number(dd) < 1) {
                let newDate = new Date(yyyy, Number(mm) - 1, dd);
                mm = newDate.getMonth() + 1;
                dd = newDate.getDate();
                if (mm < 10) {
                    mm = `0${mm}`;
                }
                if (dd < 10) {
                    dd = `0${dd}`;
                }else{
                    dd = `${dd}`
                }
            }
            //保留原本日期格式(查詢陣列中的index)
            let fullDateTW = `${yyyy - 1911}/${mm}/${dd}`;
            this.fullDateTW = fullDateTW;
            this.changeDay(`${yyyy}${mm}${dd}`, fullDateTW);
        },
        /**
         * 更換查詢日期，並送出請求後執行後續資料處理
         * @param {String} date 輸入日期(yyyymmdd)，可不傳入，預設為今日西元日期(yyyymmdd)
         * @param {String} taiwanYear 輸入日期(yyy/mm/dd)，可不傳入，預設為今日民國日期(yyy/mm/dd)
         */
        changeDay(date, taiwanYear) {

            this.item.forEach(element => {
                setTimeout( () => {
                    element.date = date;
                    let requestURL = setUrl(element.date, element.stockNo);
                    let request = new XMLHttpRequest();
                    request.open("GET", requestURL, true);
                    request.responseType = "json";
                    request.send();
                    request.onreadystatechange = () => {
                        if (request.readyState === 4 && request.status === 200) {
                            this.dataOriginalObject = request.response.data;
                            iframe.style.display = "none";
                            button.style.display = "none";
                            this.arrFun(element.no, taiwanYear);
                            this.hintState = "成功";
                        }
                        if (request.readyState === 4 && request.status === 429) {
                            iframe.style.display = "none";
                            button.style.display = "none";
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
                }, 500 * element.no);

            });
        }
    },
    mounted() {
        this.changeDay();
    }
}).mount('#app')
// console.log(request.status);
const app = document.getElementById("app");
const iframe = document.getElementsByTagName("iframe")[0];
const button = document.getElementsByTagName("button")[0];
button.addEventListener("click", function () {
    history.go(0);
})



