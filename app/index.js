function docalc() {
  var deck = $('#ndeck').val();
  var copies = $('#ncopies').val();
  var drawn = $('#ndrawn').val();
  var successes = $('#nsuccesses').val();
  var hyperGeoOutput = 'Chance to draw: <br>';

  //Chance to draw x or more cards
  if (successes > 0)
      pral = 1 - hyp(successes - 1, drawn, copies, deck);
  else
      pral = 1;
  if (pral < 1e-6)
      pral = 0;
  pral = (100 * pral).toPrecision(3) + '%'
  hyperGeoOutput += ' ' + successes + ' or more of the wanted card <br>' + pral + '<br>';

  //Chance to draw x cards
  if (successes > 0) {
      pr = hyp(successes, drawn, copies, deck) - hyp(successes - 1, drawn, copies, deck);
  }
  else
      pr = hyp(0, drawn, copies, deck);
  if (pr < 1e-6)
      pr = 0;
  pr = (100 * pr).toPrecision(3) + '%';
  hyperGeoOutput += ' ' + successes + ' of the wanted card <br>' + pr + '<br>';

  //Chance to draw x or less cards
  pram = hyp(successes, drawn, copies, deck);
  if (pram < 1e-6)
      pram = 0;
  pram = (100 * pram).toPrecision(3) + '%';
  hyperGeoOutput += ' ' + successes + ' or less of the wanted card <br>' + pram + '<br>';

  //Chance to draw 0 cards
  zero = hyp(0, drawn, copies, deck);
  if (zero < 1e-6)
      zero = 0;
  zero = (100 * zero).toPrecision(3) + '%';
  hyperGeoOutput += '0 of the wanted card <br>' + zero + '';

  $('#hyperGeoOutput').html(hyperGeoOutput);
}

// value, Sample Size, Subpopulation Size, Population Size
function hyp(x, sz, ss, ps) {
  var nz, mz;
  if (ss < sz) {
      nz = ss;
      mz = sz
  } else {
      nz = sz;
      mz = ss
  }
  var h = 1;
  var s = 1;
  var k = 0;
  var i = 0;
  while (i < x) {
      while (s > 1 && k < nz) {
          h = h * (1 - mz / (ps - k));
          s = s * (1 - mz / (ps - k));
          k = k + 1;
      }
      h = h * (nz - i) * (mz - i) / (i + 1) / (ps - nz - mz + i + 1);
      s = s + h;
      i = i + 1;
  }
  while (k < nz) {
      s = s * (1 - mz / (ps - k));
      k = k + 1;
  }
  return s;
}