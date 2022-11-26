'use strict';

// Simply Bank App

// Users
const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

////////////////////////////////////////////////////////////////////////////////////////////
// GENERATE NICKNAMES (ГЕНЕРИРУЕМ НИКНЕЙМЫ)
const userName = 'Oliver Avila'; // nickname = 'oa'
const nickname = userName
  .toLowerCase()
  .split(' ')
  .map(word => word[0])
  .join('');

const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createNicknames(accounts);

// Nicknames list:
// log: ci pass: 1111
// log: as pass: 2222
// log: cm pass: 3333
// log: ks pass: 4444
// log: oa pass: 5555

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//  -------------------------------FUNCTIONS--------------------------------------

//  FUNCTION MAKES A LIST OF TRANSACTIONS (ФУНКЦИЯ ДЕЛАЕТ СПИСОК ТРАНЗАКЦИЙ)
const displayTransactions = function (transactions, sort = false) {
  containerTransactions.innerHTML = '';
  const transacs = sort
    ? transactions.slice().sort((x, y) => x - y)
    : transactions;
  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${index + 1} ${transType}
      </div>
      <div class="transactions__value">${trans}</div>
    </div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

// BALANCE DISPLAY FUNCTION (ФУНКЦИЯ ОТОБРАЖЕНИЕ БАЛАНСА)
const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance}$`;
};

// FUNCTION TO DISPLAY THE SUM OF ALL DEPOSITS, WITHDRAWALS AND PERCENTAGE
// (ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ СУММЫ ВСЕХ ПОЛУЧЕНИЙ, ВЫВОДОВ СРЕДСТВ И ПРОЦЕНТ)
const displayTotal = function (account) {
  const depositTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${depositTotal}$`;

  const withdrawalTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `${withdrawalTotal}$`;

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interestTotal.toFixed(2)}$`;
};

// INTERFACE REFRESH FUNCTION (ФУНКЦИЯ ОБНОВЛЕНИЯ ИНТЕРФЕЙСА)
const updateUi = function (account) {
  // Display transactions
  displayTransactions(account.transactions);

  // Display balance
  displayBalance(account);

  // Display total
  displayTotal(account);
};

///////////////////////////////////////////////////////////////////////////////////////
// ---------------------Event hendlers (слушатели событий)---------------------------

let currentAccount;

//  LOGIN IMPLEMENTATION (ИМПЛЕМЕНТАЦИЯ ЛОГИНА)
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Рады что вы снова с нами, ${
      currentAccount.userName.split(' ')[0]
    }!`;
    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUi(currentAccount);
  }
});

// IMPLEMENTATION OF MONEY TRANSFER (ИМПЛЕМЕНТАЦИЯ ПЕРЕВОДА ДЕНЕЖНЫХ СРЕДСТВ)
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const recipientUser = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickname === recipientUser
  );
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  if (
    transferAmount &&
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    currentAccount.nickname !== recipientAccount?.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    updateUi(currentAccount);
  }
});

// IMPLEMENTATION OF ACCOUNT CLOSURE (ИМПЛЕМЕНТАЦИЯ ЗАКРЫТИЯ СЧЕТА)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.nickname === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт';
  }
  inputClosePin.value = '';
  inputCloseUsername.value = '';
  inputLoginPin.blur();
});

// IMPLEMENTATION OF THE LOAN REQUEST (ИМПЛЕМЕНТАЦИЯ ЗАПРОСА ЗАЙМА)
// loan condition: at least 1 of the deposits must be more than 10% of the requested amount
// (условие займа:  хотя бы 1 из депозитов должен быть больше 10% от запрашиваемой суммы)
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value); // получаем значение из инпута
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    currentAccount.transactions.push(loanAmount);
    updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
});

// SORTING IMPLEMENTATION (ИМПЛЕМЕНТАЦИЯ СОРТИРОВКИ)

let transactionsSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currentAccount.transactions, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});
