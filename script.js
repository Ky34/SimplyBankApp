'use strict';

// Simply Bank App

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

// console.log(containerTransactions.innerHTML);

// ГЕНЕРИРУЕМ НИКНЕЙМЫ
const userName = 'Oliver Avila'; // nickname = 'oa'
const nickname = userName
  .toLowerCase() //делаем все буквы маленькими
  .split(' ') // разделяем по пробелу на 2 элемента
  .map(word => word[0]) // берем каждый эелемент и возвращаем 1ую букву
  .join(''); // соеденяем в одну строку, получаем 'oa'

// console.log(nickname);

// BAD PRACTICE
// используем метод forEach так как хотим модифицировать исходный массив, а не создавать новый. C помощью этой функции добавляем в каждый объект новое свойство nikname со значением первая буква имени и фамилии в нижнем регистре
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
// console.log(accounts);

//////////////////////////////////////////////////////////////////////////
// Если нам не нужно изменять исходный массив, используем map()
// передаем в функцию массив из аккаунтов
// const createNicknames = function (accs) {
//   // применяем метод map() к каждому аккаунту
//   return accs.map(account => {
//     // возвращаем из метода map() новый объект
//     return {
//       ...account, // распаковываем в новый объект все свойства и значения из входящего элемента массива(элементы массива - объекты)
//       nickname: account.userName // создаем новое свойство и присваиваем ему значение
//         .toLowerCase()
//         .split(' ')
//         .map(word => word[0])
//         .join(''),
//     };
//   });
// };
// const newAccounts = createNicknames(accounts);
// console.log(newAccounts);
/////////////////////////////////////////////////////////////////////////

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//  -------------------------------ФУНКЦИИ--------------------------------------

// ФУНКЦИЯ ДЕЛАЕТ СПИСОК ТРАНЗАКЦИЙ
const displayTransactions = function (transactions, sort = false) {
  containerTransactions.innerHTML = ''; // с помощью этого свойства очищается контейнер
  // создаем переменную и если сортировка нужна, помещаем в нее копию массива отсортированную по возрастанию, если не нужна помещаем в нее исходный массив
  const transacs = sort
    ? transactions.slice().sort((x, y) => x - y)
    : transactions;

  transacs.forEach(function (trans, index) {
    // Обьявляем переменную тип транзакции депозит или вывод средств
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${index + 1} ${transType}
      </div>
      <div class="transactions__value">${trans}</div>
    </div>`;
    // вставляем наш transactionRow после начала родительского элемента containerTransactions
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow); // указываем 2 параметра, 1 как мы хотим вставить элемент, 2-ой какой элемент вставлять
  });
};

// ФУНКЦИЯ ОТОБРАЖЕНИЕ БАЛАНСА
const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance; // помещаем в объект новое свойство баланс
  labelBalance.textContent = `${balance}$`;
};

// ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ СУММЫ ВСЕХ ПОЛУЧЕНИЙ, ВЫВОДОВ СРЕДСТВ И ПРОЦЕНТ
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

// ФУНКЦИЯ ОБНОВЛЕНИЯ ИНТЕРФЕЙСА
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

let currentAccount; // обьявляем переменную текущего аккаунта

// ИМПЛЕМЕНТАЦИЯ ЛОГИНА
// в формах обработчик события срабатывает при нажатии клавиши enter
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // метод предотвращает отправку формы, и страница не будет перезагружаться
  // находим аккаунт пользователя
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value // ищем по никнейму
  );
  console.log(currentAccount);
  // обращаемся к свойству pin только если аккаун существует
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    containerApp.style.opacity = 100; // показываем UI
    labelWelcome.textContent = `Рады что вы снова с нами, ${
      currentAccount.userName.split(' ')[0]
    }!`;
    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur(); // убираем фокус курсора из поля pin

    updateUi(currentAccount); // обновляем интерфейс
  }
});

// ИМПЛЕМЕНТАЦИЯ ПЕРЕВОДА СРЕДСТВ
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // предотвращаем отправку формы
  const transferAmount = Number(inputTransferAmount.value);
  const recipientUser = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickname === recipientUser // находим счет пользователя-получателя
  );
  inputTransferTo.value = ''; // очищаем поле получателя
  inputTransferAmount.value = ''; // очищаем поле суммы трансфера
  // проверяем перевод
  if (
    transferAmount && // проверяем существует ли аккаунт получателя
    transferAmount > 0 && // сумма должна быть больше 0
    currentAccount.balance >= transferAmount && // баланс отправителя должен быть больше или равен сумме трансфера
    currentAccount.nickname !== recipientAccount?.nickname // при этом условии нельзя отправить самому себе
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    updateUi(currentAccount);
  }
});

// ИМПЛЕМЕНТАЦИЯ ЗАКРЫТИЯ СЧЕТА
btnClose.addEventListener('click', function (e) {
  e.preventDefault(); //  предотвращаем отправку формы
  if (
    currentAccount.nickname === inputCloseUsername.value && //проверяем верный ли логин
    currentAccount.pin === Number(inputClosePin.value) // проверяем верный ли пин
  ) {
    // ищем индекс текущего аккаунта в массиве аккаунтов
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1); // удаляем аккаунт из массива
    containerApp.style.opacity = 0; // скрываем UI
    labelWelcome.textContent = 'Войдите в свой аккаунт'; // меняем надпись в навигации
  }
  inputClosePin.value = ''; // очищаем поля ввода
  inputCloseUsername.value = '';
  inputLoginPin.blur(); // убираем фокус курсора из поля pin
});

// ИМПЛЕМЕНТАЦИЯ ЗАПРОСА ЗАЙМА
// условие займа:  хотя бы 1 из депозитов должен быть больше 10% от запрашиваемой суммы
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value); // получаем значение из инпута
  if (
    loanAmount > 0 && // запрашиваемая сумма больше 0
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100) // проверяем, есть ли в транзакциях пользователя хотя бы 1 депозит больше 10% от запрашиваемой суммы
  ) {
    currentAccount.transactions.push(loanAmount); // добавляем депозит пользователю
    updateUi(currentAccount); // обновляем интерфейс
  }
  inputLoanAmount.value = ''; // очищаем инпут
});

// ИМПЛЕМЕНТАЦИЯ СОРТИРОВКИ

// создаем переменную состояния, которая следит отсортирован ли список
let transactionsSorted = false;

// каждый раз при нажатии на кнопку массив будет менять состояние отсортирован - не отсортирован
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // передаем в функцию парамент тру, так как по нажатию на кнопку нужна сортировка
  displayTransactions(currentAccount.transactions, !transactionsSorted); // так как изначально значение переменной состояния false а нам нужно передать в функцию при клике true то записываем !transactionsSorted - что означает true
  transactionsSorted = !transactionsSorted; // меняем значение переменной на противоположное
});

// Array.from() example

const logoImage = document.querySelector('.logo');
logoImage.addEventListener('click', function () {
  const transactionsUi = document.querySelectorAll('.transactions__value'); // выбираем все элементы на странице
  console.log(transactionsUi);
  // const transactionsUiArray = Array.from(transactionsUi);
  // console.log(transactionsUiArray);
  // console.log(transactionsUiArray.map(elem => Number(elem.textContent)));
  const transactionsUiArray = Array.from(
    transactionsUi, // передаем в функцию длинну масива, она будет равна колличеству элементов в transactionsUi
    elem => Number(elem.textContent) // элементы создаваемого массива будут взяты из textContent
  );
  console.log(transactionsUiArray);
});
