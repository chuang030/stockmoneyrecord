const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("header")[0];
const wrapper = document.getElementById("wrapper");
const appBox = document.getElementById("app");
const content = document.getElementById("content");
const topBox = document.getElementById("top-box");

header.innerHTML += `
<div id="nav-open-btn" class="nav-open-btn">
    <i class="fas fa-bars"></i>
</div>
<div id="nav-bar" class="nav-bar">
    <nav>
        <div class="nav-title"><span><img src="../../images/menu/icon/TitleIcon.webp" alt=""></span>
            <p>メニュー</p>
        </div>
        <ul>
            <li><a href="../../index.php"><span><img src="../../images/menu/icon/Home.webp" alt=""></span>　首頁</a></li>
            <li><a href="../../pages/stock/index.html"><span><img src="../../images/menu/icon/MoneyRecord.webp" alt=""></span>　庫存</a></li>
            <li><a href="../../pages/account/index.html"><span><img src="../../images/menu/icon/Account.webp" alt=""></span>　分帳戶</a></li>
            <li><a href="../../pages/profitAndLoss/index.html"><span><img src="../../images/menu/icon/ProfitAndLoss.webp" alt=""></span>　損益明細</a>
            </li>
            <li><a href="../../pages/calculation/index.html"><span><img src="../../images/menu/icon/ProfitAndLossCalculation.webp"
                            alt=""></span>　損益計算</a></li>
            <li><a href="../../pages/directions/index.html"><span><img src="../../images/menu/icon/Description.webp" alt=""></span>　本站說明</a>
            </li>
            <li id="nav-close-btn"><a href="javascript:void(0)">關閉</a></li>
        </ul>
    </nav>
</div>
`;

const navOpenBtn = document.getElementById("nav-open-btn");
const navBar = document.getElementById("nav-bar");
const navCloseBtn = document.getElementById("nav-close-btn");

navOpenBtn.addEventListener("click", function () {
    navBar.style.transform = "scale(1)";
    navBar.style.zIndex = "100";
    wrapper.style.filter = "brightness(0.5)";
})

navCloseBtn.addEventListener("click", function () {
    navBar.style.transform = "scale(0)";
    navBar.style.zIndex = "0";
    wrapper.style.filter = "brightness(1)";
})