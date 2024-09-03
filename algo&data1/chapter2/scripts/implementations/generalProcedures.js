export function add_after(plist, value, positions){
  let optional = !(positions.length === 0);
  if(plist.empty && optional){
    console.log("error, illegal position");
  }
  else if(!optional){
    plist.attach_last(value);
  }
  else{
    plist.attach_middle(value, positions[0]);
  }
}



export function add_before(plist, value, positions){
  let optional = !(positions.length === 0);
  if(plist.empty && optional){
    console.log("error, illegal position");
  }
  else if(!optional){
    plist.attach_first(value);
  }
  else{
    plist.attach_middle(value, plist.previous(positions[0]));
  }
}


export function deleteElement(plist, position){
  if(position === plist.first){
    plist.detach_first;
  }
  else if(!plist.has_next(position)){
   plist.detach_last; 
  }
  else{
    plist.detach_middle(position);
  }
}


