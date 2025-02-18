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
const hp = document.getElementById("hp");
const closehistory = document.getElementById("closehistory");
const historydiv = document.getElementById("historydiv");


let tk = 0;
let expenseHistory = [];

get_name();

function remove_login_card() {
    console.log("Removing login card..."); // Debugging log
    login_card.classList.add("hidden");

    if (main_section) {
        main_section.classList.remove("hidden");
    } else {
        console.error("main_section not found! Check the HTML id.");
    }
}

function get_name() {
    namesubmit.addEventListener("click", function (event) {
        event.preventDefault();
        const name = username.value.trim();
        tk = parseFloat(balance.value);


        if (!name || isNaN(tk) || tk < 0) {
            alert("Please enter a valid name and balance!");
            return;
        }

        card_name.innerText = name;
        card_balance.innerText = Number(tk);

        remove_login_card();
        add_expences();
    });
}

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
            ammount: expense_of_user,
            type:"ex"


        })

        tk -= expense_of_user;
        card_balance.innerText = tk;

        title.value = "";
        expense.value = "";
    });
}

addmoney.addEventListener("click", function (e) {
    e.preventDefault();
    addMoneyModal.classList.remove("hidden");
    addMoneyModal.classList.add("flex");

    submitMoney.addEventListener("click", function (e) {
        e.preventDefault()
        expenseHistory.push({
            title:"",
            ammount: Number(moneyInput.value) ,
            type:"dp"


        })
        tk = Number(tk) + Number(moneyInput.value);
        card_balance.innerText = tk;
        addMoneyModal.classList.add("hidden");
        addMoneyModal.classList.remove("flex");
       
        
    })

    closeModal.addEventListener("click", function (e) {
        e.preventDefault()
        addMoneyModal.classList.add("hidden");
        addMoneyModal.classList.remove("flex");
    })
})


historybutton.addEventListener("click", function () {
    historydiv.classList.remove("hidden");
    historydiv.classList.add("flex");

    // Clear previous history to avoid duplication
    historybox.innerHTML = "";

    if (expenseHistory.length === 0) {
        ht.innerText = "No expenses recorded";
        historybox.appendChild(ht);
    } else {
        expenseHistory.forEach((item, index) => {
            let expenseDiv = document.createElement("div");
            expenseDiv.classList.add("hbox", "bg-blue-500", "bg-opacity-25", "rounded-2xl", "m-5", "flex", "justify-center", "items-center", "p-3");

            let titleElement = document.createElement("h3");
            titleElement.classList.add("text-2xl", "text-black", "pl-3", "font-semibold");
            titleElement.innerText = item.title + ":";

            let amountElement = document.createElement("p");
            if (item.type === "dp") {
                amountElement.classList.add("text-green-600", "pl-7", "text-2xl");
                amountElement.innerText = "+" + item.ammount + " TK";
            } else {
                amountElement.classList.add("text-red-600", "pl-7", "text-2xl");
                amountElement.innerText = "-" + item.ammount + " TK";
            }

            expenseDiv.appendChild(titleElement);
            expenseDiv.appendChild(amountElement);
            historybox.appendChild(expenseDiv);
        });

        // Add the close button
        const closeButton = document.createElement("button");
        closeButton.classList.add("bg-gray-500", "text-white", "px-4", "py-2", "rounded", "mt-4");
        closeButton.innerText = "Close ";

        // Add event listener to hide the history section
        closeButton.addEventListener("click", function () {
            historydiv.classList.add("hidden");
            historydiv.classList.remove("flex");
        });

        historybox.appendChild(closeButton);
    }
});





