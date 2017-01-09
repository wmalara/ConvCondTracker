export default function leftPad(str, len, char) {
  return str.length >= len
  ? str
  : char.repeat(len - str.length) + str;
}
