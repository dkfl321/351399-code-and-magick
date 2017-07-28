/* global canvas */
/* global message */

'use strict';

window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  cloudColor();

  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  cloudColor();

  ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(100, 10, 420, 270);

  blackColor();
  ctx.font="16px PT Mono";
  ctx.fillText('Ура, вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);

  function blackColor(){
    return ctx.fillStyle = "#000";
  }

  function cloudColor(){
    return ctx.fillRect(100, 10, 420, 270);
  }

  const colHeight = 150;
  const colWidth = 50;
  const maxNumber = Math.max.apply(null, times);

  function getPercent(value, max, colHeight){
    return value / max * colHeight;
  }

  names.forEach(paint(times));

  function paint(times) {
    return (name, i) => {
      const posX = i * 105 + 130;
      const nameY = 270;
      const time = Math.floor(times[i]);
      const height = getPercent(times[i], maxNumber, colHeight);

      setTextColor(ctx);
      writeName(ctx, {name, posX, nameY});
      writeTime(ctx, {time, posX, height});

      if (name === 'Вы')
        setRedColumnColor(ctx);
      else
        setRandomColumnColor(ctx);

      paintColumn(ctx, {posX, height, colWidth});
    };

    function setTextColor(ctx) {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    }

    function writeName(ctx, {name, posX, nameY}) {
      ctx.fillText(name, posX, nameY);
    }

    function writeTime(ctx, {time, posX, height}) {
      ctx.fillText(time, posX, 240 - height);
    }

    function setRedColumnColor(ctx) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    function setRandomColumnColor(ctx) {
      const opacity = getRandomInt();
      ctx.fillStyle = `rgba(55, 0, 0, ${opacity})`;
    }

    function paintColumn(ctx, {posX, height, colWidth}) {
      ctx.fillRect(posX, 250 - height, colWidth, height);
    }

    function getRandomInt(){
      return Math.round(Math.random() * 100) / 100;
    }

    function getUniqRandomIntStore(fn) {
      const array = [];

      return function again() {
        const result = fn();

        if (array.includes(result))
          return again();

        array.push(result);
        return result;
      }
    }
  }
};
