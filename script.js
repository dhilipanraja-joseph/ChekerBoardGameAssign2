$(() => {
  createBoard();
  $('.board').on('click','.piece',PieceClicked);
  // $('.square').click(dropTo);
  // players();
});
var player1 = true;
var player2 = false;
var $pp,lm=[],legalMove=[],move1,move2;
// var $pickedPiece;
// var player = 1;
// var p = 1;
function togglePlayers(bool){
  return !bool;
}
// function players(){
//   var player = 1;
//   if(player==1){
//     $('.redColor').click(redPieceClicked);
//     // player = 2;
//   }
//   if(player==2){
//     $('.greyColor').click(greyPieceClicked);
//     // players = 2 ;
//   }
// }
function PieceClicked(){
  // console.log('pickedSpot',pickedSpot);
  let $pickedPiece = $(this);
  let pickedPiecePos = $pickedPiece.parent().attr('id');
  let isRedPiece = $pickedPiece.hasClass('redColor');
  console.log('isRedPiece',isRedPiece);
  // chkPlayer($(this));
  let position = pickedPiecePos.split('');
  let x = parseInt(position[0]);
  let y = parseInt(position[1]);
  legalMove = [];
  if(isRedPiece){
    if(player1){
      legalMove.push(`${x-1}${y-1}`);
      legalMove.push(`${x-1}${y+1}`);
      pickUp(legalMove,$pickedPiece);
    }else{
      alert('Player2 turn!');
    }
  }else{
    if(player2){
      legalMove.push(`${x+1}${y+1}`);
      legalMove.push(`${x+1}${y-1}`);
      pickUp(legalMove,$pickedPiece);
    }else{
      alert('Player1 turn!');
    }
  }
  // chkMove();
  // p = 2;
  // let picked = $(this).detach();
  // toDrop(picked);
}
// function greyPieceClicked(pickedSpot){
//   let pickedPiecePos = pickedSpot.parent().attr('id');
//   // chkPlayer($(this));
//   let position = pickedPiecePos.split(',');
//   let x = parseInt(position[0]);
//   let y = parseInt(position[1]);
//   let legalMove = [];
//    legalMove.push(`${x+1},${y+1}`);
//    legalMove.push(`${x+1},${y+1}`);
//   console.log('greylegalMove',legalMove);
//   p = 1;
  // let picked = $(this).detach();
  // toDrop(picked);
// }
//
// function chkPlayer(p){
//
// }

function dropTo(){
  var pos=$(this).attr('id');
  if(isNaN($pp)){
    var chkpos = $(`#${pos}`).hasClass('filled');
    if(!chkpos){
      if(pos == lm[0]||lm[1]){
        $(`#${pos}`).addClass('filled').append($pp);
        console.log("movedPosition",pos);
        console.log("this",$(this));
      }
    }else{
      alert('illegal move');
    }
    $pp = '';
  }
  $('.square').unbind('click',dropTo);
  // console.log('pp',$pp);
}

function pickUp(l,pp){
  lm[0]=`#${l[0]}`;
  lm[1]=`#${l[1]}`;
  console.log('lm1 & lm2',lm[0],lm[1]);
  move1= $(`#${l[0]}`).hasClass('filled');
  move2= $(`#${l[1]}`).hasClass('filled');
  // console.log(lm[0]);
  if(!move1 || !move2){
    pp.parent().removeClass('filled');
    $pp = pp.detach();
    $('.square').bind('click',dropTo);
  }else{
    alert('no possible move');
    player1=togglePlayers(player1);
    player2=togglePlayers(player2);
  // console.log("$pp",$pp);
  }
  player1=togglePlayers(player1);
  player2=togglePlayers(player2);
  console.log('has class Filled',move1,move2,l[0],l[1]);
}

function createBoard() {
  let $rows = [];
  let boardPos = [];
  for(let i = 0; i < 8; i++) {
    let $row = $('<div>').addClass('row');
    for(let j = 0; j < 8; j++) {
      let I = i.toString();
      // console.log('I',I);
      let J = j.toString();
      // console.log('J',J);
      let $square;
      if(i%2==0){
        if(j%2==0){
          $square = $('<div>').addClass('square').attr('id',I+J);
        }else{
          $square = $('<div>').addClass('square blackColor').attr('id',I+J);
        }
      }else{
        if(j%2==0){
          $square = $('<div>').addClass('square blackColor').attr('id',I+J);
        }else{
          $square = $('<div>').addClass('square').attr('id',I+J);
        }
      }
      $row.append($square);
    }
    $rows.push($row);
  }
  $('.board').append($rows);
  let $greyPieces = $('<span>').addClass('piece greyColor');
  let $redPieces = $('<span>').addClass('piece redColor');

  // for (let a=1;a<4;a++){
  //   for (let b=1;b<9;b++){
  //     if(a%2==0){
  //       if(b%2==0){
  //         $('.row:eq('+a+') > .square:eq('+b+')').append($greyPieces);
  //       }
  //     }else{
  //       if(b%2==0){
  //         $('.row:eq('+a+') > .square:eq('+b+')').append($greyPieces);
  //       }
  //     }
  //   }
  // }

  $('.row:eq(0) > .square:not(.blackColor)').addClass('filled').append($('<div>').addClass('piece greyColor'));
  $('.row:eq(2) > .square:not(.blackColor)').append($('<div>').addClass('piece greyColor')).addClass('filled');
  $('.row:eq(1) > .square:not(.blackColor)').append($('<div>').addClass('piece greyColor')).addClass('filled');

  $('.row:eq(5) > .square:not(.blackColor)').append($('<div>').addClass('piece redColor')).addClass('filled');
  $('.row:eq(6) > .square:not(.blackColor)').append($('<div>').addClass('piece redColor')).addClass('filled');
  $('.row:eq(7) > .square:not(.blackColor)').append($('<div>').addClass('piece redColor')).addClass('filled');

  //  $('.row:eq(2)>.square:not(.blackColor)').append($greyPieces);
  // $('.row:eq(7)>.square:odd').append($redPieces);

}
