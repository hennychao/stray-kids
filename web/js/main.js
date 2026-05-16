//導覽選單
const menuBtn = document.getElementById('menu_button');
const sideMenu = document.getElementById('side_menu');
const menu_overlay = document.getElementById('overlay');
const sideMenuItems = document.querySelectorAll('.side-menu-father-list');

sideMenuItems.forEach(item => {
    const submenu = item.querySelector('.side-menu-son');

    if(!submenu) return;

    item.addEventListener('click', (e) => {
        if(e.target.closest('.side-menu-son')) return;
        const isOpen = item.classList.contains('active');

        if(isOpen){
          item.classList.remove('active');
          submenu.style.maxHeight = null;
        }
        else{
            item.classList.add('active');
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
        }
    });
});

function openMenu(){
    sideMenu.classList.add('active');
    menu_overlay.classList.add('active');
}

function closeMenu(){
    sideMenu.classList.remove('active');
    menu_overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openMenu);
menu_overlay.addEventListener('click', closeMenu);

//選單
const list = document.querySelectorAll("li");

for (let i = 0; i < list.length; i++){
  list[i].addEventListener("mouseover", function (){
    onListShow(i);
  });

  list[i].addEventListener("mouseout", function (){
    onListhide(i);
  });
}

function onListShow(index){
  if (list[index].querySelector("ul")){
    list[index].children[0].style.display = "block";
  }
}

function onListhide(index){
  if (list[index].querySelector("ul")){
    list[index].children[0].style.display = "none";
    }
}

//移動設備搜尋
const trigger = document.querySelector('.search_trigger');
const overlay = document.querySelector('.search_overlay');
const overlayInput = document.querySelector('.overlay_input');
const closeBtn = document.querySelector('.close_search');

trigger.addEventListener('click', () => {
  overlay.dataset.open = "true";
});

closeBtn.addEventListener('click', () => {
  overlay.dataset.open = "false";
});

//輪播圖
const slider = document.getElementById('slider-list');
const items = document.getElementsByClassName('slider-item');
const controls = document.getElementsByClassName('control');

const len = items.length;

let currentIndex = 0;
let autoPlayInterval = null;

function getWidth(){
    return items[0].offsetWidth;
}

// 更新輪播 + 控制器
function updateSlider(index){

    const width = getWidth();

    slider.style.transform = `translateX(-${index * width}px)`;

    const oldActive = document.querySelector('.control.active');
    if(oldActive) oldActive.classList.remove('active');

    controls[index].classList.add('active');

    currentIndex = index;
}

function nextSlide(){
    let next = currentIndex + 1;
    if(next >= len) next = 0;
    updateSlider(next);
}

for(let i = 0; i < controls.length; i++){
    controls[i].addEventListener('click', () => {
        updateSlider(i);
        resetAutoPlay();
    });
}

function startAutoPlay(){
    autoPlayInterval = setInterval(nextSlide, 3750);
}

function resetAutoPlay(){
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// resize 時重新對齊（防 RWD bug）
window.addEventListener('resize', () => {
    updateSlider(currentIndex);
});

// 初始化
updateSlider(0);
startAutoPlay();