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

let tk=0; 

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
        card_balance.innerText =Number(tk);

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

        tk -= expense_of_user; 
        card_balance.innerText = tk; 

        title.value = ""; 
        expense.value = "";
    });
}

addmoney.addEventListener("click",function(e){
  e.preventDefault();
  addMoneyModal.classList.remove("hidden");
  addMoneyModal.classList.add("flex");

  submitMoney.addEventListener("click",function(e){
   e.preventDefault()
   tk=Number(tk)+Number(moneyInput.value);
   card_balance.innerText = tk; 
   addMoneyModal.classList.add("hidden");
  addMoneyModal.classList.remove("flex"); 
})

closeModal.addEventListener("click",function(e){
 e.preventDefault()
 addMoneyModal.classList.add("hidden");
  addMoneyModal.classList.remove("flex"); 

})







})




