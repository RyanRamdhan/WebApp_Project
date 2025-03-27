const setMin = document.getElementById("minInput");
const setMax = document.getElementById("maxInput");
const generate = document.getElementById("generate");

generate.onclick = function(){
    let min = Number(setMin.value);
    let max = Number(setMax.value);
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    document.getElementById("generatedNumber").textContent = randomNum;
}