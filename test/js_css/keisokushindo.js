var img = document.getElementById("map-shihyo");
img.src = "http://www.kmoni.bosai.go.jp/data/map_img/RealTimeImg/jma_s/20210309/20210309142046.jma_s.gif";
img.crossOrigin="anonymous"
const imgElement = document.querySelector('#map-shihyo');
imgElement.crossOrigin = 'anonymous'
let context = null;
imgElement.onload = () => {

  const canvas = document.createElement('canvas');
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;
  context = canvas.getContext('2d');
  context.drawImage(imgElement,0,0, imgElement.width, imgElement.height);
  getColor(85,265);
}

function getColor(x=0,y=0){
  const imgData = context.getImageData(x,y,1,1);
  document.querySelector('#xy-txt').innerText =`(${x},${y})`;
  document.querySelector('#rgba-txt').innerText =`rgba(${imgData.data[0]},${imgData.data[1]},${imgData.data[2]})`;
  if (imgData.data[0],imgData.data[1],imgData.data[2] == 0,0,205)
  {
      alert("aaa");
  }

}