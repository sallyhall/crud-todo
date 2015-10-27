var todoPage = {

  init: function (argument) {
    todoPage.events();
    todoPage.styling();
  },

  events: function (argument) {
  //on submit, add content of form to both todo array and DOM
  $("form").on("submit",function (event) {
    event.preventDefault();
    var item = {
      itemContent: $("input").val(),
      completed: false
    };
    todoPage.todos.push(item);
    item.id = todoPage.todos.indexOf(item);
    todoPage.loadItems("All");
    $("input").val("");
  });

  //on clicking circle next to item, toggle complete/uncomplete, switch icon
  //and update completed property in array
  $(".todos").on("click","i",function () {
    $(this).toggleClass("fa-check-circle-o");
    $(this).toggleClass("fa-circle-o");
    var item = $(this).closest("div");
    item.toggleClass("completed");
    if(todoPage.todos[item[0].id].completed){
      todoPage.todos[item[0].id].completed=false;
    }else{
      todoPage.todos[item[0].id].completed=true;
    }
    todoPage.updateItemCount();
  });

  //on double-clicking an item, allow them to edit it
  $(".todos").on("dblclick",".item",function () {
    $(this).children(".itemText")[0].contentEditable=true;
  });

  //on hitting enter, turn off editable and save to array
  $(".todos").on("keypress",".item",function (event){
    if(event.charCode===13){
      $(this).children(".itemText")[0].contentEditable=false;
      todoPage.todos[this.id].itemContent= this.textContent;
    }
  });


  //on clicking one of the li's, change view

  $("li").on("click",function () {
    event.preventDefault();
    todoPage.loadItems($(this).text());
    $(".selected").toggleClass("selected");
    $(this).toggleClass("selected");
  });

  //on clicking clear completed, delete completed items from both todo array and DOM
  $("#clear").on("click",function (event) {
    event.preventDefault();
    todoPage.todos = _.filter(todoPage.todos,function (todo) {
      return !todo.completed;
    });
    todoPage.loadItems("All");
  });


  },

  styling: function (argument) {
    // body...
  },

  loadItems: function (view) {
    $(".todos").html("");
    var arrayToLoad=[];
    if(view==="Active"){
      arrayToLoad = _.filter(todoPage.todos,function(item){
        return !item.completed;
      });
    }else if(view==="Completed"){
      arrayToLoad = _.filter(todoPage.todos,function(item){
        return item.completed;
      });
    }else{
      arrayToLoad=todoPage.todos;
    }
    _.each(arrayToLoad,function (item,idx,array) {
      item.id = idx;
      if(item.completed){
        todoPage.loadTemplate($(".todos"),"completedItemTmpl",item);
      }else{
        todoPage.loadTemplate($(".todos"),"itemTmpl",item);
      }
    });

    todoPage.updateItemCount();


  },

  updateItemCount: function () {
    var itemCount =  _.countBy(todoPage.todos, function(item) {
      return !item.completed ;
      }).true;
    if (!Number(itemCount)){
      itemCount=0;
    }
    var itemText="";
    if(itemCount==1){
      itemText = " item left";
    }else{
      itemText = " items left";
    }
    $(".itemCount").text(itemCount + itemText);
  },

  getTemplate: function (name) {
    return _.template(templates[name]);
  },
  loadTemplate: function ($el, name, val) {
    var tmpl = todoPage.getTemplate(name);
    $el.append(tmpl(val));
  },
  todos: [],

};

$(document).ready(function(){
  todoPage.init();
});
