document.addEventListener('DOMContentLoaded', () => {
  const btnChange = document.querySelector('.btn--change');
  const btnNewGame = document.querySelector('.btn--new');
  const mainDisplay = document.querySelector('.main');
  const waseda = document.querySelector('.waseda');
  const scoreDisplay = document.getElementById('score');
  const mainDivDisplay = document.getElementById('');
  const levelDisplay = document.getElementById('level');
  const body = document.querySelector('body');
  let width = 4;
  let boxes = []; //マスを配列で管理
  let score = 0;
  let imageURL;

  btnChange.addEventListener('click', function () {
    let randomPokemon = Math.floor(Math.random() * 200);
    let url = `https://pokeapi.co/api/v2/pokemon?limit=200&offset=0`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const pokemon = data.results[randomPokemon].name;
        alert('Your lucky poken is ' + pokemon + '!');
      });
  });

  if (true) {
    createBoard();
  } else {
    location.reload();
  }

  //メインボード作成
  function createBoard() {
    for (let i = 0; i < width ** 2; i++) {
      //縦横マス数の二乗マスを生成 flex-wrap: wrapなので折り返しで表示される
      let box = document.createElement('div'); //div生成
      box.innerHTML = 0;
      // box.style.color = "transparent";
      mainDisplay.appendChild(box);
      boxes.push(box); //配列の後ろに追加
    }
    generateNum(level);
    generateNum(level); //最初は数字が二つ必要だから二回
  }

  btnNewGame.addEventListener('click', function () {
    while (mainDisplay.firstChild) {
      mainDisplay.removeChild(mainDisplay.firstChild);
    }
    width = 4;
    boxes = []; //マスを配列で管理
    score = 0;
    scoreDisplay.innerHTML = score;
    createBoard();
  });

  //ランダム生成
  function generateNum(level) {
    let ranNum = Math.floor(Math.random() * boxes.length);

    if (boxes[ranNum].innerHTML == 0) {
      //0を要素なしとして扱う
      switch (level) {
        case '1':
          boxes[ranNum].innerHTML = 2;
          break;
        case '2':
          let n1 = Math.random();
          if (n1 < 0.7) {
            //30%の確率で4が出現
            boxes[ranNum].innerHTML = 2;
          } else {
            boxes[ranNum].innerHTML = 4;
            break;
          }
        case '3':
          let n2 = Math.random();
          if (n2 < 0.5) {
            boxes[ranNum].innerHTML = 2;
          } else if (n2 < 0.9) {
            boxes[ranNum].innerHTML = 4; //30%で4が出現
          } else {
            boxes[ranNum].innerHTML = 8; //10%で8が出現
          }
          break;
        case '4':
          let n3 = Math.random();
          if (n3 < 0.4) {
            boxes[ranNum].innerHTML = 2;
          } else if (n3 < 0.7) {
            boxes[ranNum].innerHTML = 4; //30%で4が出現
          } else {
            boxes[ranNum].innerHTML = 16; //30%で16が出現
          }
          break;
        case '5':
          let n4 = Math.random();
          if (n4 < 0.1) {
            //level:5はめちゃくちゃ
            boxes[ranNum].innerHTML = 2;
          } else if (n4 < 0.2) {
            boxes[ranNum].innerHTML = 4;
          } else if (n4 < 0.3) {
            boxes[ranNum].innerHTML = 8;
          } else if (n4 < 0.4) {
            boxes[ranNum].innerHTML = 16;
          } else if (n4 < 0.5) {
            boxes[ranNum].innerHTML = 32;
          } else if (n4 < 0.6) {
            boxes[ranNum].innerHTML = 64;
          } else if (n4 < 0.7) {
            boxes[ranNum].innerHTML = 2;
          } else if (n4 < 0.8) {
            boxes[ranNum].innerHTML = 8;
          } else if (n4 < 0.9) {
            boxes[ranNum].innerHTML = 4;
          } else {
            boxes[ranNum].innerHTML = 2;
          }
          break;
        default:
          boxes[ranNum].innerHTML = 2;
          break;
      }
      boxes[ranNum].classList.remove('pop-square');
      void boxes[ranNum].offsetWidth;
      boxes[ranNum].classList.add('pop-square');
      GameOver(); //ゲームオーバー判定
    } else {
      generateNum(level); //0じゃなかったらもう一回
    }
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerHTML == 0) {
        boxes[i].style.color = 'transparent';
      } else {
        boxes[i].style.color = 'black';
      }

      if (boxes[i].innerHTML > 99) {
        boxes[i].style.fontSize = '40px';
      } else {
        boxes[i].style.fontSize = '60px';
      }
    }
  }

  // //ランダム整数生成
  // function generateNum() {
  //   let ranNum = Math.floor(Math.random() * boxes.length);
  //   if (boxes[ranNum].innerHTML == 0) { //0を要素なしとして扱う
  //     boxes[ranNum].innerHTML = 2;
  //     GameOver(); //ゲームオーバー判定
  //   } else {
  //     generateNum(); //0じゃなかったらもう一回
  //   };
  // };

  //右に移動
  function moveR() {
    for (let i = 0; i < width ** 2; i++) {
      //全マス順番にチェックし
      if (i % width === 0) {
        //先頭（一番左）のマスから行ごとに配列を作成

        let line = [];
        for (let p = 0; p < width; p++) {
          let box = boxes[i + p].innerHTML;
          line.push(parseInt(box));
        }

        let pickNum = line.filter(num => num); //0以外で存在する数字を取り出す
        let nonPicked = width - pickNum.length; //取り出されなかった、0の数
        let zeros = Array(nonPicked).fill(0); //0の数で0を埋める
        let newLine = zeros.concat(pickNum); //数字を右に持っていくため、0から左詰め

        for (let p = 0; p < width; p++) {
          //新しい配列に入れ替え
          boxes[i + p].innerHTML = newLine[p];
        }
      }
    }
  }

  //左に移動
  function moveL() {
    for (let i = 0; i < width ** 2; i++) {
      //全マス順番にチェックし
      if (i % width === 0) {
        //先頭（一番左）のマスから行ごとに配列を作成

        let line = [];
        for (let p = 0; p < width; p++) {
          let box = boxes[i + p].innerHTML;
          line.push(parseInt(box));
        }

        let pickNum = line.filter(num => num);
        let nonPicked = 4 - pickNum.length;
        let zeros = Array(nonPicked).fill(0);
        let newLine = pickNum.concat(zeros); //数字を左に持っていくため、取り出した数字から左詰め

        for (let p = 0; p < width; p++) {
          //新しい配列に入れ替え
          boxes[i + p].innerHTML = newLine[p];
        }
      }
    }
  }

  function moveU() {
    for (let i = 0; i < width; i++) {
      //一番上の列を先頭とした縦列で取り出して配列に格納、後の処理は左右のと一緒

      let line = [];
      for (let p = 0; p < width; p++) {
        let box = boxes[i + width * p].innerHTML;
        line.push(parseInt(box));
      }

      let pickNum = line.filter(num => num);
      let nonPicked = 4 - pickNum.length;
      let zeros = Array(nonPicked).fill(0);
      let newLine = pickNum.concat(zeros); //数字を上に持っていくため、取り出した数字から上詰め

      for (let p = 0; p < width; p++) {
        //新しい配列に入れ替え
        boxes[i + width * p].innerHTML = newLine[p];
      }
    }
  }

  function moveD() {
    for (let i = 0; i < width; i++) {
      let line = [];
      for (let p = 0; p < width; p++) {
        let box = boxes[i + width * p].innerHTML;
        line.push(parseInt(box));
      }

      let pickNum = line.filter(num => num);
      let nonPicked = width - pickNum.length;
      let zeros = Array(nonPicked).fill(0);
      let newLine = zeros.concat(pickNum); //数字を下に持っていくため、0から上詰め

      for (let p = 0; p < width; p++) {
        //新しい配列に入れ替え
        boxes[i + width * p].innerHTML = newLine[p];
      }
    }
  }

  function combineH() {
    for (let i = 0; i < width ** 2 - 1; i++) {
      //最後のマス+1は存在しないからwidth ** 2 - 1まで
      if (boxes[i].innerHTML === boxes[i + 1].innerHTML) {
        let total =
          parseInt(boxes[i].innerHTML) + parseInt(boxes[i + 1].innerHTML);

        boxes[i].innerHTML = total;

        if (boxes[i].innerHTML !== '0') {
          console.log(`boxes[i].innerHTML(combineH): ${boxes[i].innerHTML}`);
          console.log(`type: ${typeof boxes[i].innerHTML}`);
          boxes[i].classList.remove('pop-square');
          void boxes[i].offsetWidth;
          boxes[i].classList.add('pop-square');
        }

        boxes[i + 1].innerHTML = 0; //次にまたmoveR,Lするからどっちをtotalにしても問題なし
        score += total;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  function combineV() {
    for (let i = 0; i < width ** 2 - width; i++) {
      //一番下の列は下がないからwidth ** 2 - widthまで
      if (boxes[i].innerHTML === boxes[i + width].innerHTML) {
        let total =
          parseInt(boxes[i].innerHTML) + parseInt(boxes[i + width].innerHTML);

        boxes[i].innerHTML = total;

        if (boxes[i].innerHTML !== '0') {
          console.log(`boxes[i].innerHTML:(combineV) ${boxes[i].innerHTML}`);
          console.log(`type: ${typeof boxes[i].innerHTML}`);
          boxes[i].classList.remove('pop-square');
          void boxes[i].offsetWidth;
          boxes[i].classList.add('pop-square');
        }

        boxes[i + width].innerHTML = 0;
        score += total;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  function control(e) {
    //押したキーごとにenter関数に引数を渡す
    if (e.keyCode === 37) {
      let key = 'L';
      enter(key);
    } else if (e.keyCode === 38) {
      let key = 'U';
      enter(key);
    } else if (e.keyCode === 39) {
      let key = 'R';
      enter(key);
    } else if (e.keyCode === 40) {
      let key = 'D';
      enter(key);
    }
  }
  document.addEventListener('keydown', control);

  function enter(key) {
    //受け取った引数ごとに処理
    switch (key) {
      case 'R':
        moveR();
        combineH();
        moveR(); //move関数を二回行うのは、足し合わせた場所に余白が生まれるから、もう一度端に詰める
        generateNum(level); //ランダムな位置に生成
        break;
      case 'L':
        moveL();
        combineH();
        moveL();
        generateNum(level);
        break;
      case 'U':
        moveU();
        combineV();
        moveU();
        generateNum(level);
        break;
      case 'D':
        moveD();
        combineV();
        moveD();
        generateNum(level);
        break;
    }
  }

  function Win() {
    //2048が完成したら終了
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerHTML == 2048) {
        mainDisplay.innerHTML = 'You WIN';
        document.removeEventListener('keydown', control);
        setTimeout(() => clear(), 3000);
      }
    }
  }

  function GameOver() {
    //生成できるマスがなくなったら終了
    let num = 0;
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerHTML == 0) {
        num++;
      }
    }
    if (num === 0) {
      mainDisplay.innerHTML = '';
      let loseMessage = document.createElement('span');
      loseMessage.className = 'GameOver';
      loseMessage.innerHTML = 'You Lose!';
      mainDisplay.appendChild(loseMessage);

      console.log('I lose');
      // document.removeEventListener("keydown", control);
      // setTimeout(() => clear(), 3000);
    }
  }

  function clear() {
    clearInterval(Timer);
  }

  function addColor() {
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerHTML == 0) {
        boxes[i].style.backgroundColor = '#eee4da';
      } else if (boxes[i].innerHTML == 2) {
        boxes[i].style.backgroundColor = '#eee4da';
      } else if (boxes[i].innerHTML == 4)
        boxes[i].style.backgroundColor = '#ede0c8';
      else if (boxes[i].innerHTML == 8)
        boxes[i].style.backgroundColor = '#f2b179';
      else if (boxes[i].innerHTML == 16)
        boxes[i].style.backgroundColor = '#ffcea4';
      else if (boxes[i].innerHTML == 32)
        boxes[i].style.backgroundColor = '#e8c064';
      else if (boxes[i].innerHTML == 64)
        boxes[i].style.backgroundColor = '#ffab6e';
      else if (boxes[i].innerHTML == 128) {
        boxes[i].style.backgroundColor = '#fd9982';
        console.log(boxes[i]);
        // boxes[i].style.font-size = 40px;
      } else if (boxes[i].innerHTML == 256)
        boxes[i].style.backgroundColor = '#ead79c';
      else if (boxes[i].innerHTML == 512)
        boxes[i].style.backgroundColor = '#76daff';
      else if (boxes[i].innerHTML == 1024)
        boxes[i].style.backgroundColor = '#beeaa5';
      else if (boxes[i].innerHTML == 2048)
        boxes[i].style.backgroundColor = '#d7d4f0';
    }
  }

  addColor();
  var Timer = setInterval(addColor, 50); //50msごとに色更新
});
