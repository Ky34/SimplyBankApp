'use strict';

// Simply Bank App

// Users
const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

// FUNCTION FORMATS DATE OF TRANSACTIONS (ФУНКЦИЯ ФОРМАТИРУЕТ ДАТУ ТРАНЗАКЦИЙ)
const formatTransactionDate = function (date, locale) {
  const getPassedBetween2Days = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = getPassedBetween2Days(new Date(), date);
  if (daysPassed === 0) return 'Сегодня';
  if (daysPassed === 1) return 'Вчера';
  if (daysPassed <= 5) return `${daysPassed} дня назад`;
  else return new Intl.DateTimeFormat(locale).format(date);
};

// FUNCTION FORMATS CURRENCY (ФУНКЦИЯ ФОРМАТИРУЕТ ВАЛЮТУ)

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//  FUNCTION MAKES A LIST OF TRANSACTIONS (ФУНКЦИЯ ДЕЛАЕТ СПИСОК ТРАНЗАКЦИЙ)
const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';
  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;
  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);
    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );
    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${index + 1} ${transType}
      </div>
      <div class="transactions__date">${transDate}</div>
      <div class="transactions__value">${formattedTrans}</div>
    </div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

// BALANCE DISPLAY FUNCTION (ФУНКЦИЯ ОТОБРАЖЕНИЕ БАЛАНСА)
const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

// FUNCTION TO DISPLAY THE SUM OF ALL DEPOSITS, WITHDRAWALS AND PERCENTAGE
// (ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ СУММЫ ВСЕХ ПОЛУЧЕНИЙ, ВЫВОДОВ СРЕДСТВ И ПРОЦЕНТ)
const displayTotal = function (account) {
  const depositTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(
    depositTotal,
    account.locale,
    account.currency
  );

  const withdrawalTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawalTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

// INTERFACE REFRESH FUNCTION (ФУНКЦИЯ ОБНОВЛЕНИЯ ИНТЕРФЕЙСА)
const updateUi = function (account) {
  // Display transactions
  displayTransactions(account);

  // Display balance
  displayBalance(account);

  // Display total
  displayTotal(account);
};

//  EXIT TIMER FUNCTION (ФУНКЦИЯ ТАЙМЕРА ВЫХОДА)
const startLogoutTimer = function () {
  const logOutTimerCallBack = () => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${minutes}:${seconds}`;
    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
    time--;
  };
  let time = 300;
  logOutTimerCallBack();
  const logOutTimer = setInterval(logOutTimerCallBack, 1000);
  return logOutTimer;
};

///////////////////////////////////////////////////////////////////////////////////////
// ---------------------Event hendlers (слушатели событий)---------------------------

let currentAccount, currentLogOutTimer;

//  LOGIN IMPLEMENTATION (ИМПЛЕМЕНТАЦИЯ ЛОГИНА)
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Рады что вы снова с нами, ${
      currentAccount.userName.split(' ')[0]
    }!`;
    // DATE IMPLEMENTATION (ИМПЛЕМЕНТАЦИЯ ДАТЫ)
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
    updateUi(currentAccount);
  }
});

// IMPLEMENTATION OF MONEY TRANSFER (ИМПЛЕМЕНТАЦИЯ ПЕРЕВОДА ДЕНЕЖНЫХ СРЕДСТВ)
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
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
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());
    updateUi(currentAccount);
  }
});

// IMPLEMENTATION OF ACCOUNT CLOSURE (ИМПЛЕМЕНТАЦИЯ ЗАКРЫТИЯ СЧЕТА)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.nickname === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
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
  const loanAmount = Math.floor(inputLoanAmount.value); // получаем значение из инпута
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    currentAccount.transactions.push(loanAmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
});

// SORTING IMPLEMENTATION (ИМПЛЕМЕНТАЦИЯ СОРТИРОВКИ)
let transactionsSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});
