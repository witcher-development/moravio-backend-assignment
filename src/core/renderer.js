export const render = (state, width = 6, height = 6) => {
  const map = new Array(width * height).fill(false);
  // console.log(map);
  state.forEach(([x, y]) => (map[y * width + x] = true));
  // console.log(map);
  var str = drawField(map, width, height, function (cell) {
    return cell ? ' █ ' : '   ';
  });
  console.clear();
  console.log(str);
  // process.stdout.write('\n');
  // console.log(str);
};

function drawField(map, width, height, render) {
  function verticalRowConnect(left, middle, right, fieldWidth = 3) {
    var parts = [];
    for (var i = 0; i < width; i++) {
      parts.push('─'.repeat(fieldWidth));
    }
    return left + parts.join(middle) + right;
  }

  var fieldWidth = 3;

  var rows = [];
  for (var y = 0; y < height; y++) {
    var row = [];
    for (var x = 0; x < width; x++) {
      var i = y * width + x;
      row.push(render(map[i]));
    }
    row = '│' + row.join('│') + '│';
    rows.push(row);
  }
  rows = rows.join('\n' + verticalRowConnect('├', '┼', '┤', fieldWidth) + '\n');
  rows =
    '\n' +
    verticalRowConnect('┌', '┬', '┐', fieldWidth) +
    '\n' +
    rows +
    ('\n' + verticalRowConnect('└', '┴', '┘', fieldWidth) + '\n');

  return rows;
}
String.prototype.repeat = function (count) {
  var str = '';
  for (var i = 0; i < count; i++) {
    str += this;
  }
  return str;
};
