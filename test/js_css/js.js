//対象のclassを定義
let item = document.getElementById('item');

//アニメーション開始時
item.addEventListener('animationstart', () => {
　　　　item.textContent = `START`;
}, false);

//アニメーション繰り返し開始時
item.addEventListener('animationiteration', () => {
　　　　item.textContent = `ITERATION`;
}, false);

//アニメーション終了時
item.addEventListener('animationend', () => {
　　　　item.textContent = `END`;
}, false);