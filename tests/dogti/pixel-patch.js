(function(){
  const ASSETS = window.DOGTI_ASSETS || {};
  const nameToFile = {
    '阿拉斯加':'阿拉斯加.png','比格':'比格.png','比熊':'比熊.png','边牧':'边牧.png','柴犬':'柴犬.png','德牧':'德牧.png','杜宾':'杜宾.png','哈士奇':'哈士奇.png','金毛':'金毛.png','柯基':'柯基.png','拉布拉多':'拉布拉多.png','腊肠':'腊肠.png','马尔济斯':'马尔济斯.png','萨摩耶':'萨摩耶.png','松狮':'松狮.png','泰迪':'泰迪.png'
  };
  const quizDogs = ['柴犬.png','哈士奇.png','边牧.png','金毛.png','比格.png','德牧.png','杜宾.png','拉布拉多.png','阿拉斯加.png','萨摩耶.png','比熊.png','泰迪.png'];
  const style = document.createElement('style');
  style.textContent = `
    .breed{width:92px;height:92px;padding:0;display:flex;align-items:center;justify-content:center;border-radius:18px}
    .breed img{width:64px;height:64px;image-rendering:pixelated;object-fit:contain;display:block}
    .breed b,.breed span{display:none!important}
    .hinticon{font-size:0!important;overflow:hidden}
    .hinticon img{width:36px;height:36px;image-rendering:pixelated;object-fit:contain}
    .avatar{font-size:0!important;overflow:hidden}
    .avatar img{width:88px;height:88px;image-rendering:pixelated;object-fit:contain}
  `;
  document.head.appendChild(style);

  function dogImg(file, size){
    const src = ASSETS[file] || '';
    return `<img src="${src}" alt="${file.replace('.png','')}" style="width:${size}px;height:${size}px;image-rendering:pixelated;object-fit:contain">`;
  }

  function paintHome(){
    document.querySelectorAll('.breed').forEach(card => {
      const name = (card.querySelector('span')?.textContent || '').trim();
      const file = nameToFile[name];
      if (!file || card.querySelector('img')) return;
      card.innerHTML = dogImg(file, 64);
    });
  }

  function patchQuestionIcon(){
    const icon = document.getElementById('hintIcon');
    const count = document.getElementById('count');
    if (!icon || !count) return;
    const idx = Math.max(0, parseInt((count.textContent.split('/')[0] || '1').trim(), 10) - 1);
    icon.innerHTML = dogImg(quizDogs[idx % quizDogs.length], 36);
  }

  function patchResultAvatar(){
    const typeEl = document.getElementById('type');
    const avatar = document.getElementById('avatar');
    if (!typeEl || !avatar || typeof results === 'undefined') return;
    const typeName = typeEl.innerText.replace(/\n/g,'');
    const data = results[typeName];
    const dogMap = {
      doberman:'杜宾.png',bordercollie:'边牧.png',golden:'金毛.png',beagle:'比格.png',germanshepherd:'德牧.png',husky:'哈士奇.png',labrador:'拉布拉多.png',poodle:'泰迪.png',shiba:'柴犬.png',malamute:'阿拉斯加.png',samoyed:'萨摩耶.png',maltese:'马尔济斯.png',corgi:'柯基.png',chowchow:'松狮.png',bichon:'比熊.png',dachshund:'腊肠.png'
    };
    if (data && dogMap[data.dog]) avatar.innerHTML = dogImg(dogMap[data.dog], 88);
  }

  const oldRenderQuestion = window.renderQuestion;
  if (typeof oldRenderQuestion === 'function') {
    window.renderQuestion = function(){
      oldRenderQuestion();
      patchQuestionIcon();
    };
  }

  const oldShowResult = window.showResult;
  if (typeof oldShowResult === 'function') {
    window.showResult = function(){
      oldShowResult();
      patchResultAvatar();
    };
  }

  paintHome();
  patchQuestionIcon();
})();