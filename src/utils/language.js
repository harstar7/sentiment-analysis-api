// src/utils/language.js
const franc = require('franc');

const isEnglish = (text) => {
  if (!text || typeof text !== 'string') return false;
  
  // Minimum text length for reliable detection
  if (text.length < 10) return true; 
  
  const lang = franc(text);
  return ['eng', 'sco'].includes(lang); // English or Scots
};

module.exports = { isEnglish };