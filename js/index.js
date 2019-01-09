$("document").ready(function(){
  
  var operatorsArr=["*","-","+","/"];
  
  var $output = $("#calc-output"),
      $operations = $("#calc-operations");
  
  var started = false,
      operations="0",
      entry="0",
      lastValue="";
  
      updateScreen();
   
  
  $("button").click(function(){
        
    var value = $(this).attr("value");
    
    if(entry=="0"){
      entry="";
    }
    
    if(value=="ac"){
      started=false;
      operations="0";
      entry="0";
      updateScreen();
    }else if(value=="ce"){
      entry="0";
      operations = operations.substring(0,lastOperatorIndex(operations));
      if(!operations){
        operations="0";
      }
      updateScreen();
    }else if(operatorsArr.indexOf(value)!=-1){
      if(operatorsArr.indexOf(lastValue)==-1&&started){
        if(operations=="0"){
          operations="";
        }
        if(entry.charAt(entry.length-1)=="."){
          entry=entry.substring(0,entry.length-1);
        }
      operations += entry+value;
      entry = value;
      updateScreen();
      entry="";
      }
    }else if(value=="."){
      if(operatorsArr.indexOf(operations.charAt(operations.length-1))==-1){
        operations="0";
      }
      if(entry.indexOf(".")==-1&&lastValue.charAt(lastValue.length-1)!="."){
        if(entry==""){
          entry+="0";
        }
      entry+=".";
      updateScreen();
      }
    }else if(value=="="){
      if(started){
      if(operations=="0"){
        operations="";
      }
      if(operatorsArr.indexOf(entry)==-1){
        operations+=entry;
      }
      if(operatorsArr.indexOf(lastValue)!=-1 ||lastValue.charAt(lastValue.length-1)=="."){
        operations = operations.substring(0,operations.length-1);
      }
      
      entry=parseFloat(eval(operations).toFixed(2));
      operations+="="+entry;
      updateScreen();
      operations=entry.toString();
      entry="";
      }
    }else{
      if(operatorsArr.indexOf(operations.charAt(operations.length-1))==-1){
        operations="0";
      }
      started=true;
      entry+=value;
      updateScreen();
    }
    
    
      checkOverflow();
    
  })
  
  function updateScreen(){
  $operations.text(operations);
  $output.text(entry);
  lastValue = entry.toString();
  }
  
  function checkOverflow(){
    if(entry.length>8||operations.length>18){
    operations="Digit Limit Met";
    entry="0";
    lastValue="";
    updateScreen();
    operations="0";
    }
  }
  
  function lastOperatorIndex(str){
    if(str){
      var index=0;
      for(var i=0;i<str.length;i++){
        if(operatorsArr.indexOf(str.charAt(i))!=-1){
          index=i;
        }
      }
      return index;
    }else return 0;
  }
  
  
});