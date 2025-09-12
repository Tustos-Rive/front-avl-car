import startMenu from '../../components/menus/start.menu.mjs';

document.addEventListener('DOMContentLoaded', () => {
  runMain();
});

function runMain() {
  const menu1Container = document.querySelector('#menu1');
  const btnShow = document.querySelector('#btn1');
  const btnHide = document.querySelector('#btn2');

  btnShow.addEventListener('click', () => {
    showMenuStart(menu1Container);
  });

  btnHide.addEventListener('click', () => {
    hideMenu('#menu1');
  });
}

function showMenuStart(container) {
  // Simulate that contains a header-buttons component
  const testHtml = `<div id="btn-group-1">
            <button type="button" class="btn btn-primary">Play</button>
            <button type="button" class="btn btn-secondary">Add Obstacle</button>
            <button type="button" class="btn btn-success">Modify Velocity and distance</button>
            <button type="button" class="btn btn-info">About</button>
        </div>`;

  const htmlStartMenu = startMenu('Menu Start', 'Start AVL', testHtml);

  container.innerHTML = htmlStartMenu;
}

function hideMenu(selector) {
  const ctn = document.querySelector(`${selector}`);
  ctn.innerHTML = '';
}
