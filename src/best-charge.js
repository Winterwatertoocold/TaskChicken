'use strict'

const allitems = require("./items.js").loadAllItems();
const halfitems = require("./promotions.js").loadPromotions();

function bestCharge(arr) {
  let totalprice = total(arr);
  let saveone = save1(arr); //优惠方式：半价
  let savetwo = save2(totalprice);  //优惠方式：满30减6
  let s;
  if(saveone === 0 && savetwo === 0)
  {
    s = print1(arr,totalprice);   //没有优惠
  }
  else if(saveone >= savetwo)
  {
    s = print2(arr,totalprice,saveone);  //优惠方式：半价
  }
  else {
    s = print3(arr,totalprice,savetwo);   //优惠方式：满30减6
  }
  return s;
}

function total(arr)
{
  let t = 0;
  for(let i=0; i<arr.length; i++)
  {
    for(let j=0; j<allitems.length; j++)
    {
      if(arr[i].substring(0,8) === allitems[j].id)
      {
        t += allitems[j].price * (parseInt(arr[i].charAt(11)));
      }
    }
  }
  return t;
}

function save1(arr)
{
  let save=0;
  for(let i=0; i<arr.length; i++)
  {
    for(let j=0; j<allitems.length; j++)
    {
      if(arr[i].substring(0,8) === allitems[j].id)
      {
        for(let k=0; k<halfitems[1].items.length; k++)
        {
          if(arr[i].substring(0,8) === halfitems[1].items[k])
          {
            save += parseInt(arr[i].charAt(11))*allitems[j].price/2;
          }
        }
      }
    }
  }
  return save;
}

function save2(total)
{
  let save = 0;
  if(total >= 30)
  {
    save = 6;
  }
  return save;
}

function print1(arr, total) {
  let s = list(arr);
  s += '总计：'+total+'元\n';
  s += '===================================';
  console.log(s);
  return s;
}

function print2(arr,total,save)
{
  let s = list(arr);
  let sarr = new Array();    //半价菜品数组
  let m=0;
  for(let i=0; i<arr.length; i++)
  {
    for(let j=0; j<allitems.length; j++)
    {
      if(arr[i].substring(0,8) === allitems[j].id)
      {
        for(let k=0; k<halfitems[1].items.length; k++)
        {
          if(arr[i].substring(0,8) === halfitems[1].items[k])
          {
            sarr[m++] = allitems[j].name;
          }
        }
      }
    }
  }
  s += '使用优惠:\n';
  s += '指定菜品半价(';
  for(let i=0; i<sarr.length-1; i++)
  {
    s += sarr[i] + '，';
  }
  s += sarr[sarr.length-1];
  s += ')，省' + save + '元\n';
  s += '-----------------------------------\n';
  s += '总计：'+(total-save)+'元\n';
  s += '===================================';
  console.log(s);
  return s;
}

function print3(arr,total,save) {
  let s = list(arr);
  s += '使用优惠:\n';
  s += '满30减6元，省'+save+'元\n';
  s += '-----------------------------------\n';
  s += '总计：'+(total-save)+'元\n';
  s += '===================================';
  console.log(s);
  return s;
}

function list(arr)
{
  let s = '============= 订餐明细 =============\n';

  for(let i=0; i<arr.length; i++)
  {
    for(let j=0; j<allitems.length; j++)
    {
      if(arr[i].substring(0,8) === allitems[j].id)
      {
        s += allitems[j].name + arr[i].substring(8,12)+' = '+parseInt(arr[i].charAt(11))*allitems[j].price+'元'+'\n';
      }
    }
  }
  s += '-----------------------------------\n'
  return s;
}

//let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//bestCharge(inputs);

module.exports = {
  bestCharge:bestCharge
};
