export const toggleItemStatus = function(item){
   item.status = item.status === 'active' ? 'completed' : 'active';
   return item;
}