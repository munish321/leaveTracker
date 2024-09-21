export const toCapital = (n:string)=>{
  let words = n.split(' ')
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ')
}
