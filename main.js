/**
 * Массив транзакций 
 */ 
const transactions = [ 
  {
    transaction_id: 1,
    transaction_date: "2024-03-15",
    transaction_amount: 150,
    transaction_type: "debit",
    transaction_description: "Продукты",
    merchant_name: "Lidl",
    card_type: "debit"
  },
  {
    transaction_id: 2,
    transaction_date: "2024-03-16",
    transaction_amount: 2000,
    transaction_type: "credit",
    transaction_description: "Зарплата",
    merchant_name: "Company",
    card_type: "credit"
  },
  {
    transaction_id: 3,
    transaction_date: "2024-04-01",
    transaction_amount: 300,
    transaction_type: "debit",
    transaction_description: "Одежда",
    merchant_name: "Zara",
    card_type: "debit"
  }
];
/**
 * Уникальные типы транзакций
 */
function getUniqueTransactionTypes(transactions) { //
  return [...new Set(transactions.map(t => t.transaction_type))];
}
/**
 * Общая сумма транзакций
 */
function calculateTotalAmount(transactions) { 
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}
/**
 * Сумма по дате [extra]
 */
function calculateTotalAmountByDate(transactions, year, month, day) { 
  return transactions 
    .filter(t => { 
      const date = new Date(t.transaction_date); 
      return (!year || date.getFullYear() === year) && 
             (!month || date.getMonth() + 1 === month) && 
             (!day || date.getDate() === day); 
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0); 
} 
/**
 * По типу
 */
function getTransactionByType(transactions, type) { 
  return transactions.filter(t => t.transaction_type === type); 
} 
/**
 * По диапазону дат
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => {
    const date = new Date(t.transaction_date); 
    return date >= new Date(startDate) && date <= new Date(endDate);
  }); //конец фильтрации
} 
/**
 * По магазину
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}
/**
 * Среднее значение
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}
/**
 * По диапазону суммы
 */
function getTransactionsByAmountRange(transactions, min, max) {
  return transactions.filter(t => t.transaction_amount >= min && t.transaction_amount <= max);
}
/**
 * Сумма дебетовых
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}
/**
 * Месяц с наибольшим количеством транзакций
 */
function findMostTransactionsMonth(transactions) {
  const counts = {};

  transactions.forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    counts[month] = (counts[month] || 0) + 1;
  });

  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}
/**
 * Месяц с дебетовыми транзакциями
 */
function findMostDebitTransactionMonth(transactions) {
  const counts = {};

  transactions
    .filter(t => t.transaction_type === "debit")
    .forEach(t => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      counts[month] = (counts[month] || 0) + 1;
    });

  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}
/**
 * Каких транзакций больше
 */
function mostTransactionTypes(transactions) {
  const debit = transactions.filter(t => t.transaction_type === "debit").length;
  const credit = transactions.filter(t => t.transaction_type === "credit").length;

  if (debit > credit) return "debit";
  if (credit > debit) return "credit";
  return "equal";
}
/**
 * До даты
 */
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
}
/**
 * По ID
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}
/**
 * Только описания
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}
// Тестирование функций  
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Сумма за март 2024:", calculateTotalAmountByDate(transactions, 2024, 3));
console.log("Debit:", getTransactionByType(transactions, "debit"));
console.log("Диапазон дат:", getTransactionsInDateRange(transactions, "2024-03-01", "2024-03-31"));
console.log("По магазину Lidl:", getTransactionsByMerchant(transactions, "Lidl"));
console.log("Среднее:", calculateAverageTransactionAmount(transactions));
console.log("Суммы 100-500:", getTransactionsByAmountRange(transactions, 100, 500));
console.log("Сумма debit:", calculateTotalDebitAmount(transactions));
console.log("Самый активный месяц:", findMostTransactionsMonth(transactions));
console.log("Самый debit месяц:", findMostDebitTransactionMonth(transactions));
console.log("Типов больше:", mostTransactionTypes(transactions));
console.log("До даты:", getTransactionsBeforeDate(transactions, "2024-04-01"));
console.log("По ID:", findTransactionById(transactions, 2));
console.log("Описания:", mapTransactionDescriptions(transactions));
// EXTRA проверки 
console.log("Пустой массив:", calculateTotalAmount([])); 
console.log("Один элемент:", calculateTotalAmount([transactions[0]]));