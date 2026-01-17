function getRandomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 20) + 20; 
  const l = Math.floor(Math.random() * 15) + 10; 
  
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function setRandomColor() { 
    document.body.style.backgroundColor = getRandomColor();
}

setRandomColor();
