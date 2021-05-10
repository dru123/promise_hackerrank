#!/usr/bin/env node
const puppeteer = require('puppeteer');
let browser;
let page;
let code;
let language;

puppeteer
  .launch({
      headless:false,
      defaultViewport:null,
      args:["--start-maximized"],
     // slowMo:50,

   })
  .then(function(b){
      browser=b;//b stroes th instance in global variable browser...
      return browser.pages();// isee jitne bhi pages open hote h unka ek array mill jata h ..intially browser m ek emptyopen open hota h wo bhi blank hoata h
  })
  .then(function(pages){
      page=pages[0];//first page ko global variable m store krw diya
      return page.goto("https://www.hackerrank.com/auth/login");//us page p link dalkr  link pr pauch gye 
  })
 
  .then(function(){
      return page.type("#input-1","sedex53423@tripaco.com");//email id type
  })
  .then(function(){
      return page.type("#input-2","123456789");//passs
  })
 
  .then(function(){
      return waitclick(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
  })
  .then(function(){
     return waitclick('[title="Interview Preparation Kit"]');
})
  
  .then(function(){
    return waitclick("[data-attr1='warmup']");  
    
  })
 
  .then(function(){
      return waitclick(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
      //solvee challanges
  })
 
  .then(function(){
    return page.waitForSelector('[data-attr2="Editorial"]',{visible:true});//editor
})
  .then(function(){
      return page.click('[data-attr2="Editorial"]');
  })

  .then(function(){
      return handlebt();
  })
  .then(function(){
    return page.waitForSelector(".challenge-editorial-block.editorial-setter-code pre");
}).then(function(){
   return page.evaluate(function(){//funtion ruun on browser
       return document.querySelector(".challenge-editorial-block.editorial-setter-code pre").innerText;//browser pe  s selct krega or uska ander k text lakr d dega
   // y text return krega evaluate kko,evalaute promise krga jsiem data hoga (text)});
  });
})

  .then(function(data){
 
code=data;
return page.evaluate(function(){//funtion ruun on browser
    return document.querySelector(".challenge-editorial-block.editorial-setter-code h3").innerText;//browser pe  s selct krega or uska ander k text lakr d dega
// y text return krega evaluate kko,evalaute promise krga jsiem data hoga (text)});
});
  })
  .then(function(title){
      language=title.trim();
      console.log(language);
      return page.click("[data-attr2='Problem']");
  })

  .then(function(){
      return pastecode();
  })
 // .then(function(){
     // return page.waitForSelector("");
  //})
  .catch(function(err){
      console.log(err);
  });
  function handlebt(){// its main aim to hendel th lock button 
    //ek bar lock button kkhul jyga likn ap jb dubara script kholgie toh button nhi milega wo kuki wo unlock ho chuuka toh error ayga
    //resoleve kren k liye handlebt function bnyaa.....
      return new Promise(function(resolve,reject){
           page
           .waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")//wait krega button milna
            .then(function(){  
            return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");//mil gya toh clck kr dega
           }).then(function(){
               resolve();//or resolve krdega..........

           })
           .catch(function(err){
               resolve();//agli br nhi  mila  butttoon  to bhi resoleve krdega
           });
      });
  }
  
  function waitclick(selector) {
    return new Promise(function (resolve, reject) {
      page
        .waitForSelector(selector, { visible: true })
        .then(function () {
          return Promise.all([page.click(selector), page.waitForNavigation()]);
        })
        .then(function () {
          resolve();
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
function pastecode(){
    return new Promise(function(resolve,reject){
    
             page.waitForSelector('[type="checkbox"]')
    
        .then(function(){
            return page.click('[type="checkbox"]');
        }).then(function(){
            return page.waitForSelector('#input-1');
        })
        .then(function(){
            return page.click('#input-1');
      
        })
        .then(function () {
          return page.type("#input-1", code);
        }).then(function(){
            return page.keyboard.down("Control");
            })
        .then(function(){
            return page.keyboard.press("A");
        })
        .then(function(){
         return page.keyboard.press("X");
        })
        .then(function(){
            return page.keyboard.up("Control");
            })
        
        .then(function(){
            return page.click(".css-1hwfws3");
        })
        .then(function(){
            return page.type(".css-1hwfws3",language);
            
        })
        .then(function(){
            return page.keyboard.press("Enter");
        })
        .then(function(){
            return page.keyboard.down("Control");
        })
        .then(function(){
            return page.waitForSelector(".monaco-editor.no-user-select .vs");
        })
        .then(function(){
            return page.click(".monaco-editor.no-user-select .vs");
        })
        .then(function(){
          return page.keyboard.press("A");
        })
        .then(function(){
         
            return page.keyboard.press("V"); 
        })
        .then(function () {
            return page.click(
              ".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled"
            );
          })
          .then(function () {
            resolve();
          })
          .catch(function (err) {
            reject(err);
          });
    });
}
