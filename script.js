const login_card = document.getElementById("login_card");
const main_section = document.getElementById("main_section");
const username = document.getElementById("username");
const namesubmit = document.getElementById("namesubmit");
const card_name = document.getElementById("card_name");
const balance = document.getElementById("balance");
const card_balance = document.getElementById("card_balance");
const title = document.getElementById("title");
const expense = document.getElementById("expense");
const add_expense = document.getElementById("add_expense");
const addmoney = document.getElementById("addmoney");
const addMoneyModal = document.getElementById("addMoneyModal");
const moneyInput = document.getElementById("moneyInput");
const closeModal = document.getElementById("closeModal");
const submitMoney = document.getElementById("submitMoney");
const historybutton = document.getElementById("historybutton");
const historybox = document.getElementById("historybox");
const ht = document.getElementById("ht");
const closehistory = document.getElementById("closehistory");
const historydiv = document.getElementById("historydiv");

let name = "";
let tk = 0;
let expenseHistory = [];

// load data ta
window.addEventListener("load", function () {
    let storedName = localStorage.getItem("username");
    let storedBalance = localStorage.getItem("balance");
    let storedHistory = JSON.parse(localStorage.getItem("history")) || [];

    if (storedName && storedBalance !== null) {
        name = storedName;
        tk = Number(storedBalance);
        expenseHistory = storedHistory;

        card_name.innerHTML = name;
        card_balance.innerHTML = tk;
        remove_login_card();
    }
});

function remove_login_card() {
    console.log("Removing login card...");
    login_card.classList.add("hidden");

    if (main_section) {
        main_section.classList.remove("hidden");
    } 
}

function get_name() {
    namesubmit.addEventListener("click", function (event) {
        event.preventDefault();
        let nameInput = username.value.trim();
        let balanceInput = parseFloat(balance.value);

        if (!nameInput || isNaN(balanceInput) || balanceInput < 0) {
            alert("Please enter a valid name and balance!");
            return;
        }

        name = nameInput;
        tk = balanceInput;

        localStorage.setItem("username", name);
        localStorage.setItem("balance", tk);
        localStorage.setItem("history", JSON.stringify(expenseHistory));

        card_name.innerText = name;
        card_balance.innerText = tk;

        remove_login_card();
    });
}
get_name();

function add_expences() {
    add_expense.addEventListener("click", function (event) {
        event.preventDefault();
        const expenseTitle = title.value.trim();
        let expense_of_user = parseFloat(expense.value);

        if (!expenseTitle || isNaN(expense_of_user) || expense_of_user <= 0) {
            alert("Please enter a valid expense title and amount!");
            return;
        }

        if (expense_of_user > tk) {
            alert("Not enough balance!");
            return;
        }

        expenseHistory.push({
            title: expenseTitle,
            amount: expense_of_user, 
            type: "ex"
        });

        tk -= expense_of_user;
        localStorage.setItem("balance", tk);
        localStorage.setItem("history", JSON.stringify(expenseHistory));

        card_balance.innerText = tk;

        title.value = "";
        expense.value = "";
    });
}
add_expences();

addmoney.addEventListener("click", function (e) {
    e.preventDefault();
    addMoneyModal.classList.remove("hidden");
    addMoneyModal.classList.add("flex");

    submitMoney.addEventListener("click", function (e) {
        e.preventDefault();
        let addedAmount = Number(moneyInput.value);

        if (isNaN(addedAmount) || addedAmount <= 0) {
            alert("Please enter a valid deposit amount!");
            return;
        }

        expenseHistory.push({
            title: "Deposit",
            amount: addedAmount,
            type: "dp"
        });

        tk += addedAmount;
        localStorage.setItem("balance", tk);
        localStorage.setItem("history", JSON.stringify(expenseHistory));

        card_balance.innerText = tk;
        addMoneyModal.classList.add("hidden");
        addMoneyModal.classList.remove("flex");
    });

    closeModal.addEventListener("click", function (e) {
        e.preventDefault();
        addMoneyModal.classList.add("hidden");
        addMoneyModal.classList.remove("flex");
    });
});

historybutton.addEventListener("click", function () {
    historydiv.classList.remove("hidden");
    historydiv.classList.add("flex");

    historybox.innerHTML = "";

    if (expenseHistory.length === 0) {
        ht.innerText = "No expenses recorded";
        historybox.appendChild(ht);
    } else {
        expenseHistory.forEach((item) => {
            let expenseDiv = document.createElement("div");
            expenseDiv.classList.add("hbox", "bg-blue-500", "bg-opacity-25", "rounded-2xl", "m-5", "flex", "justify-center", "items-center", "p-3");

            let titleElement = document.createElement("h3");
            titleElement.classList.add("text-2xl", "text-black", "pl-3", "font-semibold");
            titleElement.innerText = item.title ? item.title + ":" : "Deposit:";

            let amountElement = document.createElement("p");
            if (item.type === "dp") {
                amountElement.classList.add("text-green-600", "pl-7", "text-2xl");
                amountElement.innerText = "+" + item.amount + " TK";
            } else {
                amountElement.classList.add("text-red-600", "pl-7", "text-2xl");
                amountElement.innerText = "-" + item.amount + " TK";
            }

            expenseDiv.appendChild(titleElement);
            expenseDiv.appendChild(amountElement);
            historybox.appendChild(expenseDiv);
        });

        const closeButton = document.createElement("button");
        closeButton.classList.add("bg-gray-500", "text-white", "px-4", "py-2", "rounded", "mt-4");
        closeButton.innerText = "Close";

        closeButton.addEventListener("click", function () {
            historydiv.classList.add("hidden");
            historydiv.classList.remove("flex");
        });

        historybox.appendChild(closeButton);
    }
});
