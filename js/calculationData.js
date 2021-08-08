
const sc = new StockCalculation();
const labelCheckbox = document.getElementsByClassName("label-checkbox");


Vue.createApp({
    data: function () {
        return {
            buyBoardLot: null,
            buyOddLot: null,
            sharePrice: null,
            securitiesFirms:1,
            buyDiscount: 6,
            stockType: "普通",
            boardLotBaseCharge: 20,
            oddLottBaseCharge: 1,
            buyCharge: 0,
            carryingCosts: 0,
            costPrice: 0,
            sellCharge: 0,
            taxes: 0,
            marketCosts: null,
            marketValue: 0,
            anticipatedRevenue: 0,
            profitAndLoss: 0,
            profitAndLossPercentage: 0,
            modelBox:{
                simple: true,
                full:false
            },
            checkboxItem: {
                commonStocks: true,
                dayTrading: false,
                exchangeTradedFunds: false
            }
        }
    },
    methods: {
        securitiesFirmsSelect(v){
            switch(v){
                case 0:
                    this.buyDiscount = 10;
                break;
                case 1:
                    this.buyDiscount = 6;
                break;
                case 2:
                    this.buyDiscount = 2.8;
                break;
                case 3:
                    this.buyDiscount = 6;
                break;
                case 4:
                    this.buyDiscount = 6.5;
                break;
                case 5:
                    this.buyDiscount = 2.8;
                break;
            }
            this.stockCalculation();
        },
        isCheckboxItem(v = 0) {
            switch(v){
                case 0:
                    this.checkboxItem.commonStocks = true;
                    this.checkboxItem.dayTrading = false;
                    this.checkboxItem.exchangeTradedFunds = false;
                break;
                case 1:
                    this.checkboxItem.commonStocks = false;
                    this.checkboxItem.dayTrading = true;
                    this.checkboxItem.exchangeTradedFunds = false;
                break;
                case 2:
                    this.checkboxItem.commonStocks = false;
                    this.checkboxItem.dayTrading = false;
                    this.checkboxItem.exchangeTradedFunds = true;
                break;
            }
        },
        buyValueClear() {
            this.sharePrice = null;
            this.buyBoardLot = null;
            this.buyOddLot = null;
        },
        sellValueClear() {
            this.marketCosts = null;
        },
        modelBoxItemIsShow(){
            this.modelBox.simple = !this.modelBox.simple;
            this.modelBox.full = !this.modelBox.full;
        },
        stockCalculation() {
            sc.setMarketPrice(this.marketCosts);
            sc.setCost(this.sharePrice);
            sc.setNumberOfPiles((this.buyBoardLot * 1000) + this.buyOddLot);
            sc.setChargeDiscount(this.buyDiscount);
            sc.setType(this.stockType);
            this.buyCharge = sc.getBuyCharge();
            this.carryingCosts = sc.getCarryingCosts();
            this.costPrice = sc.getCostPrice();
            this.sellCharge = sc.getSellCharge();
            this.taxes = sc.getTaxes();
            this.marketValue = sc.getMarketValue();
            this.anticipatedRevenue = sc.getAnticipatedRevenue();
            this.profitAndLoss = sc.getProfitAndLoss();
            this.profitAndLossPercentage = sc.getProfitAndLossPercentage();
        }
    },
    mounted() {

    }
}).mount('#app')
