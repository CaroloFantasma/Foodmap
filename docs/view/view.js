//Splash
const screenOne = () => {
  document.getElementById('screenOne').style.display = 'block';
  document.getElementById('screenTwo').style.display = 'none';
}

const screenTwo = () => {
  document.getElementById('screenOne').style.display = 'none';
  document.getElementById('screenTwo').style.display = 'block';
}

window.onload = () => {
  setTimeout(screenTwo, 2000);
};