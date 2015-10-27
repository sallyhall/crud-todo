var templates = {
  itemTmpl:  ["<div class = 'item' id='<%= id %>'>",
              "<i class='fa fa-circle-o'></i>",
              "<span class='itemText'> <%= itemContent %></span>",
              "</div>"].join(""),
  completedItemTmpl:  ["<div class = 'item completed' id='<%= id %>'>",
              "<i class='fa fa-circle-o'></i>",
              "<span class='itemText'> <%= itemContent %></span>",
              "</div>"].join(""),
};
