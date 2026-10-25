// Currency helper for Cambodia (USD & KHR)
export const EXCHANGE_RATE = 4100; // 1 USD = 4,100 KHR

export const formatUSD = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatKHR = (amount) => {
  return new Intl.NumberFormat('km-KH', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount) + ' ៛';
};

export const convertUsdToKhr = (usd) => {
  return Math.round(usd * EXCHANGE_RATE);
};

// Generate standard Bakong KHQR Deep-Link / EMV format string
export const generateBakongKhqrString = ({ merchantName, amount, currency, orderId }) => {
  const cur = currency === 'KHR' ? 'KHR' : 'USD';
  const timestamp = Date.now();
  const mName = merchantName || 'MIRA STORE';
  const nameLen = mName.length.toString().padStart(2, '0');
  return `00020101021229370016bakong.nbc.gov.kh0113${mName}520459995303${cur === 'USD' ? '840' : '116'}540${amount.toString().length}${amount}5802KH59${nameLen}${mName}6010PHNOM PENH62150111${orderId}6304BAKONG`;
};
