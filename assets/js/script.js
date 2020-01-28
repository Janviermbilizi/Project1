$("#search").on('click', function () {
    event.preventDefault();
    console.log("button was clicked");
    var cityInput = $('#search-input').val();

    console.log(cityInput);
});

// TO-DO LIST 
var todos =["Book a hotel","Rent a car","Download a map"];
renderTodos();

// create a check list 
function renderTodos(){
    $("#todo-list").empty();
    for (i=0; i<todos.length; i++){
        var lableDiv = $("<div>").addClass("todoBox");
        var labelList =$("<label>");
        var lableInput =$("<input>").attr("type","checkbox");
        lableInput.addClass("strikethrough");
        var lableSpan =$("<span>").text(todos[i]);
        lableDiv.append(labelList);
        labelList.append(lableInput,lableSpan);
        $("#todo-list").append(lableDiv);
    }
}
// add new element to checklist
$("#todoform").on("submit",function(event){
   event.preventDefault();

   var todoInput = $("#todo-text").val().trim();
   if (todoInput ===""){ return; }

   todos.push(todoInput);
   todoInput = $("#todo-text").val("");

   renderTodos();
})