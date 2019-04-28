console.log('webpack学习');

import $ from 'jquery';

import './css/index.css';
import './css/index.less';
import './css/index.scss';
import 'bootstrap/dist/css/bootstrap.css';

$(()=>{
  $('li:odd').css('backgroundColor', 'lightblue');
  $('li:even').css('backgroundColor', ()=> '#D97634');
});
